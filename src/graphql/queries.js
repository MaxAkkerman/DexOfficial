import { gql } from '@apollo/client';

import { LimitOrderFieldsFragment } from './fragments';

export const LimitOrdersForOwnerQuery = gql`
  ${LimitOrderFieldsFragment}
  query LimitOrdersForOwner($addrOwner: String!) {
    limitOrders: limitOrdersForOwner(addrOwner: $addrOwner) {
      ...LimitOrderFields
    }
  }
`;

export const LimitOrdersForSwapQuery = gql`
  query LimitOrdersForSwap(
    $addrPair: String!
    $directionPair: DirectionPair!
    $amount: Float!
    $slippage: Float!
  ) {
    limitOrdersForSwap(
      addrPair: $addrPair
      directionPair: $directionPair
      amount: $amount
      slippage: $slippage
    ) {
      leftoverSwap
      limitOrders {
        addrOrder
        amount
        price
        priceRaw
        amountRaw
      }
    }
  }
`;
