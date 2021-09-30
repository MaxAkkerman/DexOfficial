import React from "react";
import Loader from "../Loader/Loader";
import MainBlock from "../MainBlock/MainBlock";
import "./WaitingPopup.scss";

function WaitingPopup(props) {
	return (
		<MainBlock
			content={
				<div className="popup-content">
					<Loader />
					<p className="popup-loading-text">
						{props.title ? props.title : "Sending message to blockchain"}
					</p>
					{props.text && (
						<p className="popup-loading-text popup-loading-descr">
							{props.text}
						</p>
					)}
					{!props.hide && (
						<button
							className="btn popup-btn"
							onClick={() => props.handleClose()}
						>
							Hide
						</button>
					)}
				</div>
			}
		/>
	);
}

export default WaitingPopup;
