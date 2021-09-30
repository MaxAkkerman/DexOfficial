import {useSelector} from "react-redux";
import {useState} from "react";

const VALIDATION_MSG = "Not enough tokens in your account";

/**
 * Check of provided amount against wallet's balance
 *
 * @param {number} amount
 * @returns {HookReturn}
 *
 * @typedef {object} HookReturn
 * @property {boolean} isInvalid
 * @property {string} validationMsg
 * @property {ValidateFn} validate
 *
 * @callback ValidateFn
 * @param {number} amount
 * @returns {void}
 */
export default function useCheckAmount(amount) {
	const clientData = useSelector((state) => state.walletReducer.clientData);
	const currentTokenForSend = useSelector(
		(state) => state.walletSeedReducer.currentTokenForSend,
	);

	const [isInvalid, setIsInvalid] = useState(checkIfAmountExceeds(amount));

	function checkIfAmountExceeds(amount) {
		return amount > clientData.balance;
	}
	function checkIfTokenAmountExceeds(amount) {
		return amount > currentTokenForSend.balance;
	}
	function validate(amount, type) {
		if (type === "PureToken") {
			checkIfTokenAmountExceeds(amount)
				? setIsInvalid(true)
				: setIsInvalid(false);
			return;
		}
		if (checkIfAmountExceeds(amount)) setIsInvalid(true);
		else setIsInvalid(false);
	}

	return {
		isInvalid,
		validationMsg: VALIDATION_MSG,
		validate,
	};
}
