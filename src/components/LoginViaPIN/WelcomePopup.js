import React, {memo, useEffect, useState} from "react";
import MainBlock from "../MainBlock/MainBlock";
// import "./PinPopup.scss"
import "./LoginViaPin.scss";
import {Box, Grid} from "@material-ui/core";
import {numPadArr, pincodeArray} from "../../constants/defaultData";
import PinKeyboard from "./PinKeyboard";
import {NextBtn} from "./NextBtn";
import Steppers from "./Steppers";
import CloseBtn from "../CloseBtn/CloseBtn";
import arrowBack from "../../images/arrowBack.png";
import {Link} from "react-router-dom";
// margin-top: 40px;
// margin-right: 40px;


function WelcomePopup(props) {
	function href(path) {
		if (path === "gogle") window.open("https://google.com");
	}

	return (
		<div className="select-wrapper">
			<MainBlock
				title={props.title ? props.title : ""}
				button={
					props.showCloseBtn ? (
						<CloseBtn func={() => props.handleClose()} width="20" height="20" />
					) : null
				}
				classHeader={props.showCloseBtn ? "fixPaddings" : ""}
				classNameContainer={"removePad"}

				classTitle={"fixFontSize"}
				content={
					<>
						{!props.showCloseBtn ? (
							<>
								<div className="head_wrapper specForSuccess">
									<button
										className="arrow_back"
										onClick={() => props.handleGetBack(props.prevStep)}
									>
										<img className="arrowImg" src={arrowBack} alt={"arrow"} />
									</button>
									<div className="left_block boldFont">Success!</div>
								</div>
								<Grid
									className="welcomeTextWrapper"
									style={{height: "59px", margin: "10px auto auto auto"}}
								>
									You are registered in DefiSpace
								</Grid>
							</>
						) : (
							<>
								<Grid className="welcomeWrapper">Welcome to DefiSpace!</Grid>
								<Grid
									className="welcomeTextWrapper"
									style={{margin: "10px auto auto auto"}}
								>
									Just read the user's agreement and set pin for registration
								</Grid>
							</>
						)}

						<Grid className="welcomeAgreementContainer">
							{props.showCloseBtn ? (
								<>
									<input
										className="agreementCheckBox"
										type="checkbox"
										onClick={() =>
											props.handleSignAgreement(!props.agreementSigned)
										}
									/>
									<Grid className="welcomeTextWrapper agreementText">
										I accept the terms in the&nbsp;
										<a className="linkedText" onClick={() => href("gogle")}>
											User's agreement
										</a>
									</Grid>
								</>
							) : (
								<Grid className="welcomeTextWrapper" style={{width: "55"}}>
									Don't forget to save the seed-phrase from your&nbsp;
									<a className="linkedText" onClick={() => href("gogle")}>
										account recovery settings
									</a>
								</Grid>
							)}
						</Grid>
						<Steppers step={props.step} />
						<NextBtn
							marginBottom={"50px"}
							btnText={props.btnText}
							handleClickNext={() => props.handleClickNext(props.nextStep)}
						/>
					</>
				}
			/>
		</div>
	);
}

export default WelcomePopup;
