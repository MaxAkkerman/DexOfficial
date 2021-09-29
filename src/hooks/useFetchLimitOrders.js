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
	const isLoading = useSelector(
		(state) => state.limitOrders.isOrderListLoading,
	);
	const isFetched = useSelector(
		(state) => state.limitOrders.isOrderListFetched,
	);

	useEffect(async () => {
		if (!clientData.address || isFetched) return;

		dispatch(setOrderListLoading(true));

		const allOrders = await fetchLimitOrders();
		const myOrders = allOrders.filter(
			(order) => order.addrOwner === clientData.address,
		);

		dispatch(setOrderList(myOrders));
		dispatch(setOrderListLoading(false));
		dispatch(setOrderListFetched(true));
	}, [clientData]);

	return {
		isLoading,
		isFetched,
		orderList,
	};
}
