import "./OrderPopupUpdate.scss";

import {FormHelperText} from "@mui/material";
import cls from "classnames";
import {useFormik} from "formik";
import {useSnackbar} from "notistack";
import React from "react";
import {useDispatch, useSelector} from "react-redux";

import {
	ADDRESS_INCORRECT_LENGTH,
	NOT_POSITIVE,
	NOT_TOUCHED,
} from "../../constants/validationMessages";
import useKeyPair from "../../hooks/useKeyPair";
import {iconGenerator} from "../../iconGenerator";
import miniSwap from "../../images/icons/mini-swap.png";
import {
	closeOrderUpdatePopup,
	closeOrderWaitPopup,
	openOrderWaitPopup,
} from "../../store/actions/limitOrders";
import transferLimitOrder from "../../utils/transferLimitOrder";
import truncateNum from "../../utils/truncateNum";
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

	const {
		values,
		handleChange,
		handleBlur,
		isValid: valid,
		dirty,
		errors,
	} = useFormik({
		initialValues: {
			newPrice: price,
			newAddress: clientData.address,
		},
		validate({newAddress, newPrice}) {
			const errors = {};

			if (newPrice <= 0) errors.newPrice = NOT_POSITIVE;
			else if (newAddress.length !== 66)
				errors.newAddress = ADDRESS_INCORRECT_LENGTH;

			return errors;
		},
	});

	const {enqueueSnackbar} = useSnackbar();

	async function handleConfirm() {
		if (!valid || !dirty) return;

		dispatch(closeOrderUpdatePopup());
		dispatch(
			openOrderWaitPopup({
				text: `Sending message to update limit order ${fromSymbol} - ${toSymbol}`,
			}),
		);

		const status = [];

		if (values.newPrice !== price) {
			const {changePriceStatus} = await updateLimitOrderPrice(
				{
					id,
					newPrice: values.price,
				},
				{
					clientKeyPair: keyPair,
					clientAddress: clientData.address,
				},
			);

			status.push(changePriceStatus);
		}

		if (values.newAddress !== clientData.address) {
			const {transferLimitOrderStatus} = await transferLimitOrder(
				{
					id,
					fromSymbol,
					toSymbol,
					newOwnerAddress: values.newAddress,
				},
				{
					clientKeyPair: keyPair,
					clientAddress: clientData.address,
				},
			);

			status.push(transferLimitOrderStatus);
		}

		if (status.every((s) => s))
			enqueueSnackbar({
				type: "info",
				message: `Updating limit order ${fromSymbol} - ${toSymbol} ⏳`,
			});
		else
			enqueueSnackbar({
				type: "error",
				message: `Failed to update limit order ${fromSymbol} - ${toSymbol}`,
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
								{truncateNum(toValue)}
							</span>
						</div>
						<div
							className={cls(
								"recipient_wrapper",
								errors.newPrice && "amount_wrapper_error",
							)}
							style={{height: 100, padding: 15, marginTop: 25}}
						>
							<div className="send_text_headers">New price</div>
							<div className="send_inputs">
								<input
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.newPrice}
									name="newPrice"
									className="recipient_input"
									placeholder="0"
									style={{marginTop: 0}}
									type="number"
								/>
							</div>
						</div>
						{errors.newPrice && (
							<FormHelperText error>{errors.newPrice}</FormHelperText>
						)}
						<div
							className={cls(
								"recipient_wrapper",
								errors.newAddress && "amount_wrapper_error",
							)}
							style={{height: 100, padding: 15, marginTop: 25}}
						>
							<div className="send_text_headers">New owner</div>
							<div className="send_inputs">
								<input
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.newAddress}
									name="newAddress"
									className="recipient_input"
									placeholder="0:..."
									style={{marginTop: 0}}
								/>
							</div>
						</div>
						{errors.newAddress && (
							<FormHelperText error>{errors.newAddress}</FormHelperText>
						)}
						<button
							className={cls(
								"btn popup-btn",
								(!dirty || !valid) && "btn--disabled",
							)}
							onClick={handleConfirm}
						>
							Update Order
						</button>
						{!dirty && <FormHelperText>{NOT_TOUCHED}</FormHelperText>}
					</>
				}
				footer={
					<div className="mainblock-footer">
						<div className="mainblock-footer-wrap">
							{/*<div>*/}
							<div className="swap-confirm-wrap">
								<p className="mainblock-footer-value">
									<img src={miniSwap} alt="" /> {truncateNum(price)}{" "}
									{fromSymbol}/{toSymbol}
								</p>
								<p className="mainblock-footer-subtitle">Price</p>
							</div>
							<div className="swap-confirm-wrap">
								<p className="mainblock-footer-value">
									{truncateNum((fromValue * 0.3) / 100)} {fromSymbol}
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
