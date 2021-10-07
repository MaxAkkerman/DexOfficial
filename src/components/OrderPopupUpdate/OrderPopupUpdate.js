import "./OrderPopupUpdate.scss";

import cls from "classnames";
import {useSnackbar} from "notistack";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import useKeyPair from "../../hooks/useKeyPair";
import {iconGenerator} from "../../iconGenerator";
import miniSwap from "../../images/icons/mini-swap.png";
import {
	closeOrderUpdatePopup,
	closeOrderWaitPopup,
	openOrderWaitPopup,
} from "../../store/actions/limitOrders";
import getTruncatedNum from "../../utils/getTruncatedNum";
import updateLimitOrderPrice from "../../utils/updateLimitOrderPrice";
import IconCross from "../IconCross/IconCross";
import MainBlock from "../MainBlock/MainBlock";
import classes from "./OrderPopupUpdate.module.scss";

export default function OrderPopupUpdate({order, close}) {
	const {fromSymbol, toSymbol, fromValue, toValue, price, id} = order;

	const dispatch = useDispatch();

	const appTheme = useSelector((state) => state.appReducer.appTheme);

	const clientData = useSelector((state) => state.walletReducer.clientData);
	const {keyPair} = useKeyPair();

	const [newPrice, setNewPrice] = useState(order.price);

	const {enqueueSnackbar} = useSnackbar();

	async function handleConfirm() {
		dispatch(closeOrderUpdatePopup());
		dispatch(
			openOrderWaitPopup({
				text: `Sending message to update price of limit order ${fromSymbol} - ${toSymbol}`,
			}),
		);

		const {changePriceStatus} = await updateLimitOrderPrice(
			{
				id,
				newPrice,
			},
			{
				clientKeyPair: keyPair,
				clientAddress: clientData.address,
			},
		);

		if (changePriceStatus)
			enqueueSnackbar({
				type: "info",
				message: `Updating price of limit order ${fromSymbol} - ${toSymbol} ⏳`,
			});
		else
			enqueueSnackbar({
				type: "error",
				message: `Failed price update of limit order ${fromSymbol} - ${toSymbol}`,
			});

		dispatch(closeOrderWaitPopup());
	}

	return (
		<div className="popup-wrapper">
			<MainBlock
				button={
					<button onClick={close} className={classes.btn}>
						<IconCross
							fill="none"
							className={cls("close", classes.btn__icon)}
						/>
					</button>
				}
				title="Update Limit Order"
				content={
					<>
						<div className="confirm-block swap-confirm-block">
							<span className="confirm-token">
								<img
									className="confirm-icon"
									src={iconGenerator(fromSymbol)}
									alt={fromSymbol}
								/>
								{fromValue}
							</span>
							{appTheme === "light" ? (
								<svg
									width="68"
									height="19"
									viewBox="0 0 68 19"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										opacity="0.4"
										d="M0.897098 10.5H64.9499L58.8496 17.3C58.4908 17.7 58.4908 18.3 58.8496 18.7C59.029 18.9 59.2982 19 59.4776 19C59.657 19 59.9261 18.9 60.1055 18.7L67.7309 10.2C68.0897 9.8 68.0897 9.2 67.7309 8.8L60.1055 0.3C59.7467 -0.1 59.2084 -0.1 58.8496 0.3C58.4908 0.7 58.4908 1.3 58.8496 1.7L64.9499 8.5H0.897098C0.358839 8.5 0 8.9 0 9.5C0 10.1 0.358839 10.5 0.897098 10.5Z"
										fill="url(#paint0_linear)"
									/>
									<defs>
										<linearGradient
											id="paint0_linear"
											x1="68.0035"
											y1="9.49999"
											x2="-13.031"
											y2="-17.3695"
											gradientUnits="userSpaceOnUse"
										>
											<stop stopColor="#41444E" />
											<stop offset="1" stopOpacity="0" />
										</linearGradient>
									</defs>
								</svg>
							) : (
								<svg
									className="swap-confirm-arrow"
									width="68"
									height="20"
									viewBox="0 0 68 20"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										opacity="0.4"
										d="M0.897098 11H64.9499L58.8496 17.8C58.4908 18.2 58.4908 18.8 58.8496 19.2C59.029 19.4 59.2982 19.5 59.4776 19.5C59.657 19.5 59.9261 19.4 60.1055 19.2L67.7309 10.7C68.0897 10.3 68.0897 9.7 67.7309 9.3L60.1055 0.8C59.7467 0.4 59.2084 0.4 58.8496 0.8C58.4908 1.2 58.4908 1.8 58.8496 2.2L64.9499 9H0.897098C0.358839 9 0 9.4 0 10C0 10.6 0.358839 11 0.897098 11Z"
										fill="url(#paint0_linear)"
									/>
									<defs>
										<linearGradient
											id="paint0_linear"
											x1="68.0035"
											y1="9.99999"
											x2="-13.031"
											y2="-16.8695"
											gradientUnits="userSpaceOnUse"
										>
											<stop stopColor="white" />
											<stop offset="1" stopColor="white" stopOpacity="0" />
										</linearGradient>
									</defs>
								</svg>
							)}
							<span className="confirm-token">
								<img
									className="confirm-icon"
									src={iconGenerator(toSymbol)}
									alt={toSymbol}
								/>
								{getTruncatedNum(toValue)}
							</span>
						</div>

						<div
							className="recipient_wrapper"
							style={{height: 100, padding: 15, marginTop: 25}}
						>
							<div className="send_text_headers">New price</div>
							<div className="send_inputs">
								<input
									onChange={(e) => setNewPrice(e.target.value)}
									value={newPrice}
									className="recipient_input"
									placeholder="0"
									style={{marginTop: 0}}
									type="number"
								/>
							</div>
						</div>
						<button className="btn popup-btn" onClick={handleConfirm}>
							Update Order
						</button>
					</>
				}
				footer={
					<div className="mainblock-footer">
						<div className="mainblock-footer-wrap">
							{/*<div>*/}
							<div className="swap-confirm-wrap">
								<p className="mainblock-footer-value">
									<img src={miniSwap} alt="" /> {getTruncatedNum(price)}{" "}
									{fromSymbol}/{toSymbol}
								</p>
								<p className="mainblock-footer-subtitle">Price</p>
							</div>
							<div className="swap-confirm-wrap">
								<p className="mainblock-footer-value">
									{getTruncatedNum((fromValue * 0.3) / 100)} {fromSymbol}
								</p>
								<p className="mainblock-footer-subtitle">Fee</p>
							</div>
						</div>
					</div>
				}
			/>
		</div>
	);
}
