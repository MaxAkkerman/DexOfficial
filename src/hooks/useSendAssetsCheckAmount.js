import {useSelector} from "react-redux";
import {useEffect} from "react";
import useCheckAmount from "./useCheckAmount";

/**
 * Special case hook for "/assets/send" modal window for amount check
 *
 * @returns {HookReturn}
 *
 * @typedef {object} HookReturn
 * @property {boolean} invalid
 * @property {string} validationMsg
 */
export default function useSendAssetsCheckAmount() {
	const amountToSend = useSelector(
		(state) => state.walletSeedReducer.amountToSend,
	);
	const currentTokenForSend = useSelector(
		(state) => state.walletSeedReducer.currentTokenForSend,
	);

	const amountToSendNum = Number(amountToSend);

	const {invalid, validationMsg, validate} = useCheckAmount(amountToSendNum);

	useEffect(() => {
		if (currentTokenForSend.symbol === "DP") {
			validate(0);
		} else if (currentTokenForSend.type === "PureToken") {
			validate(Number(amountToSendNum), currentTokenForSend.type);
		} else {
			validate(Number(amountToSendNum));
		}
	}, [amountToSend]);

	return {
		invalid,
		validationMsg,
	};
}
