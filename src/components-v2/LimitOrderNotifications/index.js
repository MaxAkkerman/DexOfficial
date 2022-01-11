import { useLazyQuery } from '@apollo/client';
import { useSnackbar } from 'notistack';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { AB_DIRECTION } from '@/constants/runtimeVariables';
import {
  CANCEL_ORDER,
  CHANGE_NEWOWNER,
  CHANGE_OWNER,
  CHANGE_PRICE,
  DEPLOY_ORDER,
  TO_MAKER_APPLY_FULL_ORDER,
  TO_MAKER_APPLY_PART_ORDER,
  TO_MAKER_ORDER_FAILED,
  TO_TAKER_APPLY_FULL_ORDER,
  TO_TAKER_APPLY_PART_ORDER,
  TO_TAKER_ORDER_FAILED,
} from '@/constants/runtimeVariables';
import { LimitOrdersForOwnerQuery } from '@/graphql/queries';
import { LimitOrderUpdateSubscription } from '@/graphql/subscriptions';

export default function LimitOrderNotifications() {
  const { enqueueSnackbar } = useSnackbar();

  const clientData = useSelector((state) => state.walletReducer.clientData);

  const [getLimitOrders, { called, subscribeToMore }] = useLazyQuery(
    LimitOrdersForOwnerQuery,
  );

  const clientAddress = useMemo(() => {
    return clientData && clientData.address ? clientData.address : null;
  }, [clientData]);

  useEffect(() => {
    if (called || !clientAddress) return;

    getLimitOrders({
      variables: { addrOwner: clientAddress },
    });
  }, [clientAddress, called]);

  useEffect(() => {
    if (!subscribeToMore || !called || !clientAddress) return;

    const unsubscribe = subscribeToMore({
      document: LimitOrderUpdateSubscription,
      updateQuery(prev, { subscriptionData }) {
        console.log(
          'subscribe_limit_orders->prev,subscriptionData',
          JSON.stringify(prev, null, 2),
          JSON.stringify(subscriptionData, null, 2),
        );

        if (!subscriptionData.data) return prev;

        const { limitOrder, status } = subscriptionData.data.updateLimitOrder;

        const { aSymbol, bSymbol } = limitOrder.pair;
        const [fromSymbol, toSymbol] =
          limitOrder.directionPair === AB_DIRECTION
            ? [aSymbol, bSymbol]
            : [bSymbol, aSymbol];

        switch (status) {
          case DEPLOY_ORDER:
            enqueueSnackbar({
              message: `Created limit order ${fromSymbol} - ${toSymbol}`,
              type: 'success',
            });
            return {
              limitOrders: prev.limitOrders.concat(limitOrder),
            };
          case CANCEL_ORDER:
            enqueueSnackbar({
              message: `Canceled limit order ${fromSymbol} - ${toSymbol}`,
              type: 'success',
            });
            return {
              limitOrders: prev.limitOrders.filter(
                (lo) => lo.addrOrder !== limitOrder.addrOrder,
              ),
            };
          case CHANGE_PRICE:
            enqueueSnackbar({
              message: `Updated price of limit order ${fromSymbol} - ${toSymbol}`,
              type: 'success',
            });
            return {
              limitOrders: prev.limitOrders.map((lo) =>
                lo.addrOrder === limitOrder.addrOrder ? limitOrder : lo,
              ),
            };
          case CHANGE_OWNER:
            enqueueSnackbar({
              message: `Transferred limit order ${fromSymbol} - ${toSymbol}`,
              type: 'success',
            });
            return {
              limitOrders: prev.limitOrders.filter(
                (lo) => lo.addrOrder !== limitOrder.addrOrder,
              ),
            };
          case CHANGE_NEWOWNER:
            enqueueSnackbar({
              message: `Received limit order ${fromSymbol} - ${toSymbol}`,
              type: 'success',
            });
            return {
              limitOrders: prev.limitOrders.concat(limitOrder),
            };
          case TO_MAKER_APPLY_FULL_ORDER:
            enqueueSnackbar({
              message: `Closed limit order ${fromSymbol} - ${toSymbol}`,
              type: 'success',
            });
            return {
              limitOrders: prev.limitOrders.filter(
                (lo) => lo.addrOrder !== limitOrder.addrOrder,
              ),
            };
          case TO_TAKER_APPLY_FULL_ORDER:
            enqueueSnackbar({
              message: `Taken limit order ${fromSymbol} - ${toSymbol}`,
              type: 'success',
            });
            return prev;
          case TO_MAKER_APPLY_PART_ORDER:
            enqueueSnackbar({
              message: `Closed limit order ${fromSymbol} - ${toSymbol} (partially)`,
              type: 'success',
            });
            return {
              limitOrders: prev.limitOrders.map((lo) =>
                lo.addrOrder === limitOrder.addrOrder ? limitOrder : lo,
              ),
            };
          case TO_TAKER_APPLY_PART_ORDER:
            enqueueSnackbar({
              message: `Taken limit order ${fromSymbol} - ${toSymbol} (partially)`,
              type: 'success',
            });
            return prev;
          case TO_MAKER_ORDER_FAILED:
            return prev;
          case TO_TAKER_ORDER_FAILED:
            enqueueSnackbar({
              message: `Failed limit order application process ${fromSymbol} - ${toSymbol}`,
              type: 'error',
            });
            return prev;
          default:
            console.warn("Received the status that doesn't have handler");
        }
      },
      variables: { addrOwner: clientAddress },
    });

    return unsubscribe;
  }, [subscribeToMore, clientAddress, called]);

  return null;
}
