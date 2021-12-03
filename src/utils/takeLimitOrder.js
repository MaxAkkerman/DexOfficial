import { Account } from '@tonclient/appkit';
import { signerKeys } from '@tonclient/core';

import { AB_DIRECTION } from '../constants/runtimeVariables';
import { DEXClientContract } from '../extensions/contracts/DEXClientMainNet';
import client from '../extensions/sdk_get/get';
import getPair from './getPair';
import getTokenRouter from './getTokenRouter';

export default async function takeLimitOrder(
  { directionPair, orderAddr, pairAddr, price, qty },
  { clientAddress, clientKeyPair },
) {
  console.log(
    'takeLimitOrder->params',
    `${pairAddr},${orderAddr},${directionPair},${qty},${price}`,
  );

  const clientAcc = new Account(DEXClientContract, {
    address: clientAddress,
    client,
    signer: signerKeys(clientKeyPair),
  });

  const pair = await getPair(pairAddr);
  try {
    if (directionPair === AB_DIRECTION) {
      const routerAddr = await getTokenRouter(pair.rootB);
      console.log('Router_address->B', routerAddr);
      const res = await clientAcc.run('takeLimitOrderA', {
        pairAddr,
        limitOrderA: orderAddr,
        routerWalletB: routerAddr,
        qtyB: qty,
        priceB: price,
      });
      console.log('takeLimitOrderA->response', res.decoded);
      res.decoded;
    } else {
      const routerAddr = await getTokenRouter(pair.rootA);
      console.log('Router_address->A', routerAddr);
      const res = await clientAcc.run('takeLimitOrderB', {
        pairAddr,
        limitOrderB: orderAddr,
        routerWalletA: routerAddr,
        qtyA: qty,
        priceA: price,
      });
      console.log('takeLimitOrderB->response', res.decoded);
      return res.decoded;
    }

    return true;
  } catch (err) {
    console.log('takeLimitOrder->error', err);
    throw err;
  }
}
