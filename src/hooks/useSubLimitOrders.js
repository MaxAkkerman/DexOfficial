import {useSnackbar} from "notistack";
import {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";

import {LIMIT_ORDER_AMOUNT as LIMIT_ORDER_AMOUNT_DENOMINATOR} from "../constants/denominators";
import {
	INVALID_ORDER_DIRECTION,
	INVALID_ORDER_STATUS,
} from "../constants/runtimeErrorMessages";
import {
	AB_DIRECTION,
	BA_DIRECTION,
	STATUS_ORDER_CANCEL,
	STATUS_ORDER_CHANGE_OWNER,
	STATUS_ORDER_DEPLOY,
	STATUS_ORDER_UPDATE_PRICE,
} from "../constants/runtimeVariables";
import {DEXClientContract} from "../extensions/contracts/DEXClientMainNet";
import client from "../extensions/sdk_get/get";
import {decode} from "../extensions/tonUtils";
import {
	addToOrderList,
	removeFromOrderList,
	updatePriceFromOrderList,
} from "../store/actions/limitOrders";

export default async function useSubLimitOrders() {
	const ref = useRef(0);

	const dispatch = useDispatch();

	const clientData = useSelector((state) => state.walletReducer.clientData);
	const pairList = useSelector((state) => state.walletReducer.pairsList);

	const {enqueueSnackbar} = useSnackbar();

	useEffect(async () => {
		if (
			!clientData ||
			!clientData.address ||
			!pairList ||
			!pairList.length ||
			ref.current !== 0
		)
			return;

		ref.current++;

		const res = await client.net.subscribe_collection(
			{
				collection: "messages",
				filter: {
					dst: {eq: clientData.address},
				},
				result: "boc src",
			},
			async (params) => {
				if (!params.result) return;

				const decoded = await decode.message(
					DEXClientContract.abi,
					params.result.boc,
				);

				if (
					typeof decoded === "number" ||
					decoded.name !== "limitOrderCallback"
				)
					return;

				let {addrPair, amount, price, directionPair, status} = decoded.value;

				const pair = pairList.find((p) => p.pairAddress === addrPair);

				let fromSymbol = null;
				let toSymbol = null;

				if (directionPair === AB_DIRECTION) {
					fromSymbol = pair.symbolA;
					toSymbol = pair.symbolB;
				} else if (directionPair === BA_DIRECTION) {
					fromSymbol = pair.symbolB;
					toSymbol = pair.symbolA;
				} else {
					throw new Error(INVALID_ORDER_DIRECTION);
				}

				amount = Number(amount) / LIMIT_ORDER_AMOUNT_DENOMINATOR;
				price = Number(price);

				if (status === STATUS_ORDER_DEPLOY) {
					dispatch(
						addToOrderList({
							...decoded.value,
							id: params.result.src,
							price,
							amount,
						}),
					);
					enqueueSnackbar({
						type: "success",
						message: `Created limit order ${fromSymbol} - ${toSymbol}`,
					});
				} else if (status === STATUS_ORDER_CANCEL) {
					dispatch(removeFromOrderList(params.result.src));
					enqueueSnackbar({
						type: "success",
						message: `Canceled limit order ${fromSymbol} - ${toSymbol}`,
					});
				} else if (status === STATUS_ORDER_UPDATE_PRICE) {
					dispatch(
						updatePriceFromOrderList({id: params.result.src, newPrice: price}),
					);
					enqueueSnackbar({
						type: "success",
						message: `Updated price of limit order ${fromSymbol} - ${toSymbol}`,
					});
				} else if (status === STATUS_ORDER_CHANGE_OWNER) {
					dispatch(removeFromOrderList(params.result.src));
					enqueueSnackbar({
						type: "success",
						message: `Updated owner of limit order ${fromSymbol} - ${toSymbol}`,
					});
				} else {
					throw new Error(INVALID_ORDER_STATUS);
				}
			},
		);

		return () => client.net.unsubscribe(res);
	}, [clientData, pairList]);
}
