import React from "react";
import "./ReceiveAssets.scss";
import arrowBack from "../../images/arrowBack.png";
import copybtn from "../../images/copybtn.svg";
import {useHistory} from "react-router-dom";
import BlockItem from "../AmountBlock/AmountBlock";
import {useSelector} from "react-redux";
import TokenChanger from "../TokenChanger/TokenChanger";
import ShowBalance from "../AmountBlock/ShowBalance";
import MainBlock from "../MainBlock/MainBlock";
import QRCode from "qrcode.react";
import {copyToClipboard} from "../../reactUtils/reactUtils";

function ReceiveAssets() {
	const currentTokenForReceive = useSelector(
		(state) => state.walletSeedReducer.currentTokenForReceive,
	);

	const tokenForReceiveSetted = useSelector(
		(state) => state.walletSeedReducer.tokenForReceiveSetted,
	);

	function handleCutAddress(address) {
		//todo add validation
		let spliced = address.slice(0, 7);
		let splicedpart2 = address.slice(59);
		let view = spliced + "..." + splicedpart2;
		console.log("addressTo", address);
		return view;
	}

	const history = useHistory();

	function handleBack() {
		history.push("/wallet");
	}

	async function handleCopy() {
		copyToClipboard(currentTokenForReceive.owner_address)
			.then(() => console.log("text copied !"))
			.catch(() => console.log("error"));
		// await navigator.clipboard.writeText(currentTokenForReceive.walletAddress ? currentTokenForReceive.walletAddress : "")
	}

	return (
		<div className="container">
			<MainBlock
				smallTitle={false}
				content={
					<div>
						<div className="head_wrapper">
							{/*//TODO*/}
							<button className="arrow_back" onClick={() => handleBack()}>
								<img src={arrowBack} alt={"arrow"} />
							</button>
							<div className="left_block">Receive asset</div>
						</div>
						<BlockItem
							leftTitle={(tokenForReceiveSetted && "Balance:") || ""}
							currentToken={currentTokenForReceive}
							rightTopBlock={<div className="send_balance asset">Asset:</div>}
							rightBottomBlock={
								<TokenChanger
									enableMax={<div className={"additionalWidth"} />}
								/>
							}
							leftBlockBottom={
								<div className="receive_balance_block">
									<ShowBalance
										classWrapper={"receive_balance2"}
										balance={currentTokenForReceive.balance}
										showBal={tokenForReceiveSetted}
									/>
								</div>
							}
						/>

						<BlockItem
							leftTitle={"Your address for this asset"}
							currentToken={currentTokenForReceive}
							rightTopBlock={null}
							rightBottomBlock={
								<>
									<div className={"send_copy_address"}>
										<button
											style={{fontSize: "20px", width: "100%"}}
											onClick={() =>
												copyToClipboard(
													currentTokenForReceive.owner_address || "",
												)
											}
											className="btn wallet-btn"
										>
											Copy address
										</button>
									</div>
								</>
							}
							leftBlockBottom={
								<div className="receive_balance_block">
									<div className="receive_balance">
										{tokenForReceiveSetted
											? handleCutAddress(currentTokenForReceive.owner_address)
											: "0:..."}
										<div
											className="copybtn_wrapper hidden"
											style={{marginLeft: "5px"}}
										>
											<button
												className="arrow_back copybtn"
												onClick={() => handleCopy()}
											>
												<img
													className={"textOnHover"}
													src={copybtn}
													alt={"arrow"}
												/>
											</button>
										</div>
									</div>
								</div>
							}
						/>

						{tokenForReceiveSetted && (
							<>
								<div
									style={{
										marginTop: "40px",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<div
										style={{
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											flexDirection: "column",
										}}
									>
										<div>Give this QR-code to Sender</div>
										<QRCode
											style={{marginTop: "20px"}}
											size={200}
											value={currentTokenForReceive.owner_address || "0"}
										/>
									</div>
								</div>
							</>
						)}
					</div>
				}
			/>
		</div>
	);
}

export default ReceiveAssets;
