import React from "react";
import {useDispatch, useSelector} from "react-redux";
import SetTokenBlock from "./SetTokenBlock";
import SelectTokenMenu from "./SelectTokenMenu";
import {useHistory} from "react-router-dom";

function RightBlockBottom(props) {
	const history = useHistory();
	const tokenSetted = useSelector((state) => state.walletSeedReducer.tokenSetted);
	const currentTokenForSend = useSelector((state) => state.walletSeedReducer.currentTokenForSend);
	const inputNFTdisabled = useSelector((state) => state.walletSeedReducer.inputNFTdisabled);

	function handleTouchTokenModal() {
		history.push("/wallet/send/send-modal");
	}

	function handleTouchTokenModal2() {
		history.push("/wallet/send/send-modal");
	}

	return (
		<>
			{(props.tokenSetted ? props.tokenSetted : tokenSetted) ? (
				<>
					<div className="send_set_token_wrap column">
						{inputNFTdisabled === "disabled" ? (
							<div style={{width: "52px"}} />
						) : (
							props.enableMax
						)}
						<SetTokenBlock
							handleTouchTokenModal={props.showAssetsList ? ()=>props.showAssetsList() : () => handleTouchTokenModal()}
							// img={TON}
							currentToken={props.curAsset ? props.curAsset : currentTokenForSend}
						/>
					</div>
				</>
			) : (
				<div className="send_select_wrap">
					<SelectTokenMenu
						handleTouchTokenModal2={props.showAssetsList ? ()=>props.showAssetsList() : () => handleTouchTokenModal2()}
					/>
				</div>
			)}
		</>
	);
}

export default RightBlockBottom;
