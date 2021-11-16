import {gql} from "@apollo/client";

export const LIMIT_ORDER_FIELDS = gql`
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
