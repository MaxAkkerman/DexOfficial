import React, {useEffect, useState} from "react";
import arrowBack from "../../images/arrowBack.png";
import copybtn from "../../images/copybtn.svg";
import {useHistory} from "react-router-dom";
import BlockItem from "../AmountBlock/AmountBlock";
import {useSelector} from "react-redux";
import MainBlock from "../MainBlock/MainBlock";
import {decrypt} from "../../extensions/seedPhrase";
import {getClientKeys} from "../../extensions/webhook/script";
import {copyToClipboard} from "../../reactUtils/reactUtils";

function KeysBlock() {
	const encryptedSeedPhrase = useSelector(
		(state) => state.enterSeedPhrase.encryptedSeedPhrase,
	);
	const seedPhrasePassword = useSelector(
		(state) => state.enterSeedPhrase.seedPhrasePassword,
	);

	const [keys, setKeys] = useState({});
	useEffect(async () => {
		let decrypted = await decrypt(encryptedSeedPhrase, seedPhrasePassword);
		const keys = await getClientKeys(decrypted.phrase);

		setKeys(keys);
	}, []);

	function handleCutAddress(address) {
		//todo add validation
		let spliced = address.slice(0, 7);
		let splicedpart2 = address.slice(59);
		return spliced + "..." + splicedpart2;
	}

	const history = useHistory();

	function handleBack() {
		history.push("/wallet/settings");
	}

	async function handleCopy(copy) {
		await copyToClipboard(copy);
		// navigator.clipboard.writeText(copy)
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
							<div className="left_block boldFont">Keys</div>
						</div>

						<BlockItem
							leftTitle={"Public key"}
							rightTopBlock={null}
							rightBottomBlock={
								<>
									<div className={"send_copy_address"}>
										<button
											style={{fontSize: "20px", width: "100%"}}
											onClick={() => copyToClipboard(keys.public)}
											className="btn wallet-btn"
										>
											Copy Public Key
										</button>
									</div>
									<div className="copybtn_wrapper hidden">
										<button
											className="arrow_back"
											onClick={() => copyToClipboard(keys.public)}
										>
											<img src={copybtn} alt={"arrow"} />
										</button>
									</div>
								</>
							}
							leftBlockBottom={
								<div className="receive_balance_block">
									<div className="receive_balance">
										{handleCutAddress(keys.public ? keys.public : "")}
									</div>
								</div>
							}
						/>
						<BlockItem
							leftTitle={"Private key"}
							rightTopBlock={null}
							rightBottomBlock={
								<>
									<div className={"send_copy_address"}>
										<button
											style={{fontSize: "20px", width: "100%"}}
											onClick={() => copyToClipboard(keys.secret)}
											className="btn wallet-btn"
										>
											Copy Private Key
										</button>
									</div>
									<div className="copybtn_wrapper hidden">
										<button
											className="arrow_back"
											onClick={() => copyToClipboard(keys.secret)}
										>
											<img src={copybtn} alt={"arrow"} />
										</button>
									</div>
								</>
							}
							leftBlockBottom={
								<div className="receive_balance_block">
									<div className="receive_balance">
										{handleCutAddress(keys.secret ? keys.secret : "")}
									</div>
								</div>
							}
						/>
					</div>
				}
			/>
		</div>
	);
}

export default KeysBlock;
