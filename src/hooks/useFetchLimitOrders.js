import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {
	setOrderList,
	setOrderListFetched,
	setOrderListLoading,
} from "../store/actions/limitOrders";
import fetchLimitOrders from "../utils/fetchLimitOrders";

export default function useFetchLimitOrders() {
	const dispatch = useDispatch();

	const clientData = useSelector((state) => state.walletReducer.clientData);

	const orderList = useSelector((state) => state.limitOrders.orderList);
	const loading = useSelector((state) => state.limitOrders.orderListLoading);
	const fetched = useSelector((state) => state.limitOrders.orderListFetched);

	useEffect(async () => {
		if (!clientData.address || fetched) return;

		dispatch(setOrderListLoading(true));

		const orders = await fetchLimitOrders({clientAddress: clientData.address});

		dispatch(setOrderList(orders));
		dispatch(setOrderListLoading(false));
		dispatch(setOrderListFetched(true));
	}, [clientData, fetched]);

	return {
		loading,
		fetched,
		orderList,
	};
}
