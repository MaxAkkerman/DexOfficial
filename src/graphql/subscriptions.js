import {gql} from "@apollo/client";

import {LimitOrderFieldsFragment} from "./fragments";

export const LimitOrderUpdateSubscription = gql`
	${LimitOrderFieldsFragment}
	subscription LimitOrderUpdate($addrOwner: String!) {
		updateLimitOrder(addrOwner: $addrOwner) {
			status
			limitOrder {
				...LimitOrderFields
			}
		}
	}
`;
