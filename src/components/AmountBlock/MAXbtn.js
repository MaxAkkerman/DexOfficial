import React from "react";
import {setAmountForSend} from "../../store/actions/walletSeed";
import {useDispatch, useSelector} from "react-redux";

function MaxBtn() {
	const currentTokenForSend = useSelector(
		(state) => state.walletSeedReducer.currentTokenForSend,
	);
	const dispatch = useDispatch();

	function handleSetMax() {
		dispatch(setAmountForSend(currentTokenForSend.balance));
	}

	return (
		<div onClick={() => handleSetMax()} className="send_max_btn">
			MAX
		</div>
	);
}

export default MaxBtn;
