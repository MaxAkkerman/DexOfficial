import {useSnackbar} from "notistack";
import {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {LIMIT_ORDER_AMOUNT as LIMIT_ORDER_AMOUNT_DENOMINATOR} from "../constants/denominators";
import {INVALID_PAIR_DIRECTION as INVALID_PAIR_DIRECTION_ERROR} from "../constants/runtimeErrorMessages";
import {
	A_B_DIRECTION as A_B_DIRECTION_VARIABLE,
	B_A_DIRECTION as B_A_DIRECTION_VARIABLE,
} from "../constants/runtimeVariables";
import {DEXClientContract} from "../extensions/contracts/DEXClient";
import client, {decode} from "../extensions/webhook/script";
import {addToOrderList} from "../store/actions/limitOrders";

export default async function useSubLimitOrders() {
	const ref = useRef(0);

	const dispatch = useDispatch();

	const clientData = useSelector((state) => state.walletReducer.clientData);
	const pairsList = useSelector((state) => state.walletReducer.pairsList);

	const {enqueueSnackbar} = useSnackbar();

	useEffect(async () => {
		if (
			!clientData ||
			!clientData.address ||
			!pairsList ||
			!pairsList.length ||
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
				result: "boc id created_lt",
			},
			async (params) => {
				const decoded = await decode.message(
					DEXClientContract.abi,
					params.result.boc,
				);

				if (typeof decoded === "number") return;

				if (
					decoded.name === "makeLimitOrderA" ||
					decoded.name === "makeLimitOrderB"
				) {
					const {pairAddr} = decoded.value;

					const pair = pairsList.find((p) => p.pairAddress === pairAddr);

					let fromSymbol = null;
					let toSymbol = null;
					let fromValue = null;
					let toValue = null;

					if (decoded.name === "makeLimitOrderA") {
						fromSymbol = pair.symbolA;
						toSymbol = pair.symbolB;
						fromValue = Number(decoded.value.qtyA) / 1e9;
						toValue = fromValue * Number(decoded.value.priceA);
					} else {
						fromSymbol = pair.symbolB;
						toSymbol = pair.symbolA;
						fromValue = Number(decoded.value.qtyB) / 1e9;
						toValue = fromValue * Number(decoded.value.priceB);
					}

					enqueueSnackbar({
						type: "info",
						message: `Creating limit order with ${fromValue} ${fromSymbol} for ${toValue} ${toSymbol}`,
					});
				} else if (decoded.name === "limitOrderCallback") {
					let {addrPair, amount, price, directionPair} = decoded.value;

					const pair = pairsList.find((p) => p.pairAddress === addrPair);

					let fromSymbol = null;
					let toSymbol = null;

					if (directionPair === A_B_DIRECTION_VARIABLE) {
						fromSymbol = pair.symbolA;
						toSymbol = pair.symbolB;
					} else if (directionPair === B_A_DIRECTION_VARIABLE) {
						fromSymbol = pair.symbolB;
						toSymbol = pair.symbolA;
					} else {
						throw new Error(INVALID_PAIR_DIRECTION_ERROR);
					}

					amount = Number(amount) / LIMIT_ORDER_AMOUNT_DENOMINATOR;
					price = Number(price);

					dispatch(
						addToOrderList({
							...decoded.value,
							id: params.result.id,
							last_trans_lt: Number(params.result.last_trans_lt),
							price,
							amount,
						}),
					);

					const fromValue = amount;
					const toValue = fromValue * price;

					enqueueSnackbar({
						type: "success",
						message: `Created limit order with ${fromValue} ${fromSymbol} for ${toValue} ${toSymbol}`,
					});
				}
			},
		);

		return () => client.net.unsubscribe(res);
	}, [clientData, pairsList]);
}
