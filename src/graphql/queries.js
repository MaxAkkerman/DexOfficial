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
    $amountIn: Float!
  ) {
    limitOrdersForSwap(
      addrPair: $addrPair
      directionPair: $directionPair
      amountIn: $amountIn
    ) {
      leftoverSwap
      limitOrders {
        addrOrder
        amount
        priceRaw
        oppositeAmount
        oppositeAmountRaw
      }
    }
  }
`;
