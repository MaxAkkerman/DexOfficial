import { gql } from '@apollo/client';

export const LimitOrderFieldsFragment = gql`
  fragment LimitOrderFields on LimitOrder {
    addrOrder
    amount
    price
    directionPair
    pair {
      aSymbol
      bSymbol
      aRoot
      bRoot
    }
  }
`;
