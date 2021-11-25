import React from "react";
import {useDispatch, useSelector} from "react-redux";
import MainBlock from "../../components/MainBlock/MainBlock";
import "./WalletSettings.scss";
import arrowBack from "../../images/arrowBack.png";
import {useHistory} from "react-router-dom";
import {showRevealSeedPhrase} from "../../store/actions/enterSeedPhrase";
import {decrypt} from "../../extensions/tonUtils";

function WalletSettings() {
	const history = useHistory();
	const dispatch = useDispatch();
	const seedPhrasePassword = useSelector((state) => state.enterSeedPhrase.seedPhrasePassword);

	function handleBack() {
		history.push("/wallet");
	}

	function handlePushToKeys() {
		history.push("/wallet/settings/keys");
	}

	async function openRevealSeedPhrase() {
		let esp = localStorage.getItem("esp");
		let decrypted = await decrypt(esp, seedPhrasePassword);
		dispatch(showRevealSeedPhrase(decrypted.phrase));
	}

	return (
		<div className="container">
			<MainBlock
				smallTitle={false}
				content={
					<div>
						<div className="head_wrapper">
							{/*//TODO*/}
							<button className="arrow_back" onClick={() => handleBack(false)}>
								<img src={arrowBack} alt={"arrow"} />
							</button>
							<div className="left_block boldFont">Settings</div>
						</div>
						<div className="bottomBtnsWrapper">
							<div className="btn_wrapper full_width">
								<button
									className="btn wallet-btn full-width"
									onClick={() => openRevealSeedPhrase()}
									style={{boxShadow: "0px 14px 44px rgba(69, 88, 255, 0.23)"}}
								>
									Reveal Seed Phrase
								</button>
							</div>
							<div className="btn_wrapper full_width">
								<button
									className="btn wallet-btn full-width"
									onClick={() => handlePushToKeys()}
									style={{boxShadow: "0px 14px 44px rgba(69, 88, 255, 0.23)"}}
								>
									Public & Private Keys
								</button>
							</div>
						</div>
					</div>
				}
			/>
		</div>
	);
}

export default WalletSettings;
