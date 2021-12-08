import "./index.scss";

import React from "react";
import {useDispatch, useSelector} from "react-redux";

import Loader from "@/components-v2/Loader";
import MainBlock from "@/components-v2/MainBlock";
import {hideWaitingPopup} from "@/store/actions/app";

export default function WaitingPopup() {
	const dispatch = useDispatch();
	const popup = useSelector((s) => s.appReducer.waitingPopup);

	function onClose() {
		dispatch(hideWaitingPopup());
	}

	const {hidable, text, title} = popup;

	return (
		<div className="popup-wrapper">
			<MainBlock
				content={
					<div className="popup-content">
						<Loader />
						<p className="popup-loading-text">
							{title || "Sending message to blockchain"}
						</p>
						{text && (
							<p className="popup-loading-text popup-loading-descr">{text}</p>
						)}
						{hidable && (
							<button className="btn popup-btn" onClick={onClose}>
								Hide
							</button>
						)}
					</div>
				}
			/>
		</div>
	);
}
