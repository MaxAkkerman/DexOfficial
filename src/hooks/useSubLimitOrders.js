import {useSnackbar} from "notistack";
import {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";

import {LIMIT_ORDER_AMOUNT as LIMIT_ORDER_AMOUNT_DENOMINATOR} from "../constants/denominators";
import {
	INVALID_ORDER_DIRECTION as INVALID_ORDER_DIRECTION_ERROR,
	INVALID_ORDER_STATUS as INVALID_ORDER_STATUS_ERROR,
} from "../constants/runtimeErrorMessages";
import {
	A_B_DIRECTION as A_B_DIRECTION_VARIABLE,
	B_A_DIRECTION as B_A_DIRECTION_VARIABLE,
	STATUS_CANCEL_ORDER as STATUS_CANCEL_ORDER_VARIABLE,
	STATUS_DEPLOY_ORDER as STATUS_DEPLOY_ORDER_VARIABLE,
	STATUS_UPDATE_PRICE_ORDER as STATUS_UPDATE_PRICE_ORDER_VARIABLE,
} from "../constants/runtimeVariables";
import {DEXClientContract} from "../extensions/contracts/DEXClient";
import client, {decode} from "../extensions/webhook/script";
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

				if (directionPair === A_B_DIRECTION_VARIABLE) {
					fromSymbol = pair.symbolA;
					toSymbol = pair.symbolB;
				} else if (directionPair === B_A_DIRECTION_VARIABLE) {
					fromSymbol = pair.symbolB;
					toSymbol = pair.symbolA;
				} else {
					throw new Error(INVALID_ORDER_DIRECTION_ERROR);
				}

				amount = Number(amount) / LIMIT_ORDER_AMOUNT_DENOMINATOR;
				price = Number(price);

				if (status === STATUS_DEPLOY_ORDER_VARIABLE)
					dispatch(
						addToOrderList({
							...decoded.value,
							id: params.result.src,
							price,
							amount,
						}),
					);
				else if (status === STATUS_CANCEL_ORDER_VARIABLE)
					dispatch(removeFromOrderList(params.result.src));
				else if (status === STATUS_UPDATE_PRICE_ORDER_VARIABLE)
					dispatch(
						updatePriceFromOrderList({id: params.result.src, newPrice: price}),
					);
				else throw new Error(INVALID_ORDER_STATUS_ERROR);

				if (status === STATUS_DEPLOY_ORDER_VARIABLE)
					enqueueSnackbar({
						type: "success",
						message: `Created limit order ${fromSymbol} - ${toSymbol}`,
					});
				else if (status === STATUS_CANCEL_ORDER_VARIABLE)
					enqueueSnackbar({
						type: "success",
						message: `Canceled limit order ${fromSymbol} - ${toSymbol}`,
					});
				else if (status === STATUS_UPDATE_PRICE_ORDER_VARIABLE)
					enqueueSnackbar({
						type: "success",
						message: `Updated price of limit order ${fromSymbol} - ${toSymbol}`,
					});
				else throw new Error(INVALID_ORDER_STATUS_ERROR);
			},
		);

		return () => client.net.unsubscribe(res);
	}, [clientData, pairList]);
}
