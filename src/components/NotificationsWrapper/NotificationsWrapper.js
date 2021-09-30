import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {setSubscribeReceiveTokens} from "../../store/actions/wallet";
import OurAlert from "../Alert/Alert";
import * as ReactDOM from "react-dom";
import {hideTip} from "../../store/actions/app";

export default function NotificationsWrapper() {
	const dispatch = useDispatch();
	const tips = useSelector((state) => state.appReducer.tips);
	const transListReceiveTokens = useSelector(
		(state) => state.walletReducer.transListReceiveTokens,
	);

	const [tipsArray, settipsArray] = useState([]);
	useEffect(async () => {
		if (!tips || tips.length) return;
		const newArrTips = await JSON.parse(JSON.stringify(tipsArray));
		const newTransList = await JSON.parse(
			JSON.stringify(transListReceiveTokens),
		);

		const tipForAlert = {
			message: tips.message,
			type: tips.type,
		};

		newArrTips.push(tipForAlert);
		let spliceForThree = [];
		if (newArrTips.length > 3) {
			spliceForThree = newArrTips.slice(
				newArrTips.length - 3,
				newArrTips.length,
			);
			console.log("spliceForThree", spliceForThree);
			settipsArray(spliceForThree);
			return;
		}
		settipsArray(newArrTips);

		newTransList.push(tips);
		dispatch(setSubscribeReceiveTokens(newTransList));

		console.log("tips", tips, "tipsArray", newArrTips);
		// localStorage.setItem("tipsArray", JSON.stringify(newArrTips))
	}, [tips]);
	function onTipClosed() {
		dispatch(hideTip());
	}

	return ReactDOM.createPortal(
		<>
			{tipsArray.length ? (
				<div
					className="tipContainer"
					onClick={() => console.log("tipsArray", tipsArray)}
				>
					{tipsArray.map((item, i) => (
						<OurAlert
							key={i}
							message={item.message}
							type={item.type}
							onClose={onTipClosed}
							sx={{width: "100%"}}
						/>
					))}
				</div>
			) : null}
		</>,
		document.querySelector("body"),
	);
}
