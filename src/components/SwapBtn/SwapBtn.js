import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {
	setSwapFromInputValueChange,
	setSwapFromToken,
	setSwapToToken,
} from "../../store/actions/swap";
import {
	setOrdersFromInputValue,
	setOrdersFromToken,
	setOrdersToToken,
} from "../../store/actions/limitOrder";

function SwapBtn(props) {
	const dispatch = useDispatch();
	const toSwapValue = useSelector((state) => state.swapReducer.toInputValue);
	const toOrdersValue = useSelector((state) => state.limitOrders.toInputValue);

	function handleClick() {
		const {fromToken, toToken} = props;

		if (fromToken.symbol && toToken.symbol) {
			if (location.pathname.includes("orders")) {
				dispatch(setOrdersFromInputValue(toOrdersValue));
				dispatch(setOrdersFromToken(toToken));
				dispatch(setOrdersToToken(fromToken));
			}
			if (location.pathname.includes("swap")) {
				dispatch(setSwapFromInputValueChange(toSwapValue));
				dispatch(setSwapFromToken(toToken));
				dispatch(setSwapToToken(fromToken));
			}
		}
	}

	return (
		<button className="swap-btn action-btn" onClick={() => handleClick()}>
			<svg
				width="31"
				height="30"
				viewBox="0 0 31 30"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M25.9472 29.0299L30.474 21.9667C30.7951 21.4531 30.8272 20.7789 30.5383 20.2331C30.2493 19.6873 29.6714 19.3662 29.0614 19.3662L26.3967 19.3662L26.3967 9.86304C26.3967 4.8225 22.2872 0.745117 17.2788 0.745117L15.1598 0.745117C14.1324 0.745116 13.2977 1.57986 13.2977 2.60723C13.2977 3.6346 14.1324 4.46934 15.1598 4.46934L17.2788 4.46934C20.2645 4.46934 22.7046 6.90934 22.7046 9.89514L22.7046 19.3983L19.9756 19.3983C19.3656 19.3983 18.7877 19.7194 18.4988 20.2652C18.3703 20.522 18.3061 20.811 18.3061 21.0678C18.3061 21.3889 18.4024 21.7099 18.563 21.9667L23.0898 29.0299C23.4109 29.5115 23.9246 29.8005 24.5025 29.8005C25.0803 29.8005 25.6261 29.5115 25.9472 29.0299Z"
					fill="#41444E"
				/>
				<path
					d="M17.6963 27.4245C17.6963 26.3972 16.8615 25.5624 15.8342 25.5624L13.7152 25.5624C10.7294 25.5624 8.28942 23.1224 8.28942 20.1366L8.28942 10.6335L10.9863 10.6335C11.5963 10.6335 12.1742 10.3124 12.4631 9.76661C12.7521 9.22082 12.7521 8.57871 12.3989 8.03292L7.87205 0.969747C7.551 0.488166 7.03731 0.199218 6.45942 0.199218C5.88152 0.199218 5.33573 0.488166 5.04678 0.969747L0.51993 8.03292C0.327297 8.32187 0.263086 8.61082 0.263086 8.93187C0.263086 9.22082 0.327295 9.47766 0.455717 9.7345C0.744665 10.2803 1.32256 10.6013 1.93257 10.6013L4.59731 10.6013L4.59731 20.1366C4.59731 25.1772 8.70679 29.2546 13.7152 29.2546L15.8342 29.2546C16.8615 29.2546 17.6963 28.4198 17.6963 27.4245Z"
					fill="#41444E"
				/>
			</svg>
		</button>
	);
}

export default SwapBtn;
