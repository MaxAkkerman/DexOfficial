import { gql } from '@apollo/client';

export const LimitOrderFieldsFragment = gql`
  fragment LimitOrderFields on LimitOrder {
    addrOrder
    amount
    directionPair
    pair {
      aSymbol
      bSymbol
    }
    price
    walletOwnerFrom
    walletOwnerTo
  }
`;
