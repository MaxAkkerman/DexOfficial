import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrderList } from "../store/actions/limitOrders";
import fetchLimitOrders from "../utils/fetchLimitOrders";

/**
 * TODO: move all initial state logic into this hook 
 *
 */
export default function useFetchAppState() {
	const dispatch = useDispatch();

	const clientData = useSelector(state => state.walletReducer.clientData);

	const [loading, setLoading] = useState(false);

    useEffect(async () => {
		setLoading(true);

		if (!clientData.address) return;

        const allOrders = await fetchLimitOrders();
		const myOrders = allOrders.filter(order => order.addrOwner === clientData.address);

        dispatch(setOrderList(myOrders));

		setLoading(false);
    }, [clientData]);

	return {
		loading,
	};
}