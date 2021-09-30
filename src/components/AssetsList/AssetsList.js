import React, {useEffect, useState} from "react";
import "./AssetsList.scss";
import TON from "../../images/tonCrystalDefault.svg";
import {
	getDurationFromSeconds,
	getFormattedDate,
} from "../../reactUtils/getDurationFromSeconds";
import {calculateRate} from "../../reactUtils/reactUtils";

import nativeBtn from "../../images/nativeadd.svg";
import settingsBtn from "../../images/Vector.svg";
import calculateTimeLeft from "../../hooks/useTimer";
import CalculateTimeLeft from "../../hooks/useTimer";
import AssetsListOrderItem from "../AssetsListOrderItem/AssetsListOrderItem";
import {Divider} from "@mui/material";
import {useSelector} from "react-redux";

function AssetsList(props) {
	const pairList = useSelector((state) => state.walletReducer.pairsList);

	return (
		<div
			className={
				props.assetWrap ? props.assetWrap + " assets_wrapper" : "assets_wrapper"
			}
			onClick={() => console.log("props", props)}
		>
			{props.TokenAssetsArray.sort(
				(a, b) => (b.balance || 0) - (a.balance || 0),
			).map((item, i) => (
				<div
					className="assets_item_wrapper"
					onClick={() => props.handleClickToken(item)}
					key={i}
				>
					<div style={{width: "100%"}}>
						<div
							style={{
								width: "100%",
								display: "flex",
								justifyContent: "space-between",
							}}
						>
							<div style={{display: "flex"}}>
								<div>
									<img
										className="arrow_icons2"
										src={item.icon}
										alt={"send assetsList"}
									/>
								</div>
								<div style={{marginLeft: "15px"}}>
									<div style={{fontWeight: "bold"}}>{item.symbol}</div>
									<div style={{fontSize: "14px"}}>{item.tokenName}</div>
								</div>
							</div>
							<div>
								{item.balance === 0
									? "0.0000"
									: item.balance < 0.0001
									? parseFloat(item.balance).toFixed(8)
									: parseFloat(item.balance).toFixed(4)}
							</div>
						</div>
						{item.showWrapMenu && props.showItBeShown && (
							<div className="NFT_additional_data">
								<div
									className="NFT_additional_block"
									style={{justifyContent: "end"}}
								>
									{/*    <div>*/}
									{/*        <div className="swap-confirm-wrap">*/}
									{/*            /!*<p className="mainblock-footer-value">{item.details.apyLockStake / 100}%</p>*!/*/}
									{/*            <p className="mainblock-footer-subtitle">APY</p>*/}
									{/*        </div>*/}
									{/*        <div className="swap-confirm-wrap">*/}
									{/*            /!*<p className="mainblock-footer-value">{getDurationFromSeconds(item.details.periodLockStake, "days")} days</p>*!/*/}
									{/*            <p className="mainblock-footer-subtitle">Period</p>*/}
									{/*        </div>*/}
									{/*        <div className="swap-confirm-wrap">*/}
									{/*            /!*<p className="mainblock-footer-value">{getFormattedDate(Number(item.details.timeStartLockStake))}</p>*!/*/}
									{/*            <p className="mainblock-footer-subtitle">Start time</p>*/}
									{/*        </div>*/}

									{/*    </div>*/}
									{/*    <div>*/}
									{/*        <div className="swap-confirm-wrap">*/}
									{/*            /!*<p className="mainblock-footer-value fixFlex"><img style={{marginRight: "5px"}}*!/*/}
									{/*            /!*                                                   src={TON}*!/*/}
									{/*            /!*                                                   alt={"Ton Crystal"}/> {(Number(item.stakeTotal)) / 1000000000}*!/*/}
									{/*            /!*</p>*!/*/}
									{/*            <p className="mainblock-footer-subtitle">Stake</p>*/}
									{/*        </div>*/}
									{/*        <div className="swap-confirm-wrap">*/}
									{/*            /!*<p className="mainblock-footer-value fixFlex"><img style={{marginRight: "5px"}}*!/*/}
									{/*            /!*                                                   src={TON}*!/*/}
									{/*            /!*                                                   alt={"Ton Crystal"}/> {((calculateRate(item.stakeTotal, item.details.apyLockStake / 100, (item.details.periodLockStake / 30 / 60 / 60 / 24)) - Number(item.stakeTotal)) / 1000000000).toFixed(4)}*!/*/}
									{/*            /!*</p>*!/*/}
									{/*            <p className="mainblock-footer-subtitle">Profit</p>*/}
									{/*        </div>*/}
									{/*        <div className="swap-confirm-wrap">*/}
									{/*            /!*<p className="mainblock-footer-value fixFlex">*!/*/}
									{/*            /!*    <img style={{marginRight: "5px"}} src={TON}*!/*/}
									{/*            /!*         alt={"Ton Crystal"}/> {((calculateRate(item.stakeTotal, item.details.apyLockStake / 100, item.details.periodLockStake / 30 / 60 / 60 / 24)) / 1000000000).toFixed(4)}*!/*/}

									{/*            /!*</p>*!/*/}
									{/*            <p className="mainblock-footer-subtitle">Total income</p>*/}
									{/*        </div>*/}
									{/*    </div>*/}

									{/*<div className={"settings_btn_container"}>*/}
									<button
										className="settings_btn"
										style={{
											width: "100px",
											height: "63px",
											color: "white",
											fontSize: "20px",
										}}
										onClick={props.wrapTons ? () => props.wrapTons() : null}
									>
										Wrap
									</button>
									<button
										className="settings_btn"
										style={{
											width: "100px",
											height: "63px",
											color: "white",
											fontSize: "20px",
										}}
										onClick={props.unWrapTons ? () => props.unWrapTons() : null}
									>
										Unwrap
									</button>
									{/*</div>*/}
								</div>
							</div>
						)}
					</div>
				</div>
			))}
			{props.NFTassetsArray &&
				props.NFTassetsArray.map((item) => (
					<div
						className="assets_item_wrapper"
						onClick={() => props.handleClickNFT(item)}
						key={item._safeLockStake}
					>
						<div className="NFT_item">
							<div className="NFT_item_header">
								<div style={{display: "flex", alignItems: "flex-start"}}>
									<div className="assetList_item_icon">
										<img
											className="arrow_icons2"
											src={item.icon}
											alt={"send assetsList"}
										/>
									</div>
									<div style={{marginLeft: "15px"}}>
										<div style={{fontWeight: "bold"}}>DePool stake</div>
										<div style={{fontSize: "14px"}}>NFT Lock stake</div>
									</div>
								</div>
								<div>{Number(item.stakeTotal / 1e9).toFixed(4)}</div>
							</div>
							{item.showNftData && (
								<div className="NFT_additional_data">
									<div
										className="NFT_additional_block"
										style={{marginLeft: "50px"}}
									>
										<div>
											<div className="swap-confirm-wrap">
												<p className="mainblock-footer-value">
													{item.details.apyLockStake / 100}%
												</p>
												<p className="mainblock-footer-subtitle">APY</p>
											</div>
											<div className="swap-confirm-wrap">
												<p className="mainblock-footer-value">
													{getDurationFromSeconds(
														item.details.periodLockStake,
														"days",
													)}{" "}
													days
												</p>
												<p className="mainblock-footer-subtitle">Period</p>
											</div>
											<div className="swap-confirm-wrap">
												<p className="mainblock-footer-value">
													{getFormattedDate(
														Number(item.details.timeStartLockStake),
													)}
												</p>
												<p className="mainblock-footer-subtitle">Start time</p>
											</div>
											<div className="swap-confirm-wrap">
												<p className="mainblock-footer-value">
													{getFormattedDate(
														Number(item.details.timeStartLockStake) +
															Number(item.details.periodLockStake),
													)}
												</p>
												<p className="mainblock-footer-subtitle">End Time</p>
											</div>
										</div>
										<div>
											<div className="swap-confirm-wrap">
												<p className="mainblock-footer-value fixFlex">
													<img
														style={{marginRight: "5px"}}
														src={TON}
														alt={"Ton Crystal"}
													/>{" "}
													{Number(item.stakeTotal) / 1000000000}
												</p>
												<p className="mainblock-footer-subtitle">Stake</p>
											</div>
											<div className="swap-confirm-wrap">
												<p className="mainblock-footer-value fixFlex">
													<img
														style={{marginRight: "5px"}}
														src={TON}
														alt={"Ton Crystal"}
													/>{" "}
													{(
														(calculateRate(
															item.stakeTotal,
															item.details.apyLockStake / 100,
															item.details.periodLockStake / 30 / 60 / 60 / 24,
														) -
															Number(item.stakeTotal)) /
														1000000000
													).toFixed(4)}
												</p>
												<p className="mainblock-footer-subtitle">Profit</p>
											</div>
											<div className="swap-confirm-wrap">
												<p className="mainblock-footer-value fixFlex">
													<img
														style={{marginRight: "5px"}}
														src={TON}
														alt={"Ton Crystal"}
													/>{" "}
													{(
														calculateRate(
															item.stakeTotal,
															item.details.apyLockStake / 100,
															item.details.periodLockStake / 30 / 60 / 60 / 24,
														) / 1000000000
													).toFixed(4)}
												</p>
												<p className="mainblock-footer-subtitle">
													Total income
												</p>
											</div>
											<div className="swap-confirm-wrap">
												<p
													className="mainblock-footer-value"
													style={{width: "200px"}}
												>
													{
														<CalculateTimeLeft
															date={
																new Date(
																	(Number(item.details.timeStartLockStake) +
																		Number(item.details.periodLockStake)) *
																		1000,
																)
															}
														/>
													}
												</p>
												<p className="mainblock-footer-subtitle">Estimate</p>
											</div>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				))}

			{props.orderAssetsArray &&
				props.orderAssetsArray.length >= 1 &&
				pairList.length >= 1 &&
				orderList.map((orderAsset, idx) => (
					<AssetsListOrderItem key={idx} orderAsset={orderAsset} />
				))}
		</div>
	);
}

export default AssetsList;
