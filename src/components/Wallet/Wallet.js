import React from "react";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import "./Wallet.scss";
import {iconGenerator} from "../../iconGenerator";

function Wallet() {
	const history = useHistory();

	const clientData = useSelector((state) => state.walletReducer.clientData);
	const updatedWallet = useSelector((state) => state.walletReducer.updatedWallet);

	return (
		<div className="wallet">
			{/*{walletIsConnected &&*/}
			<div className="wallet-wrap" onClick={() => history.push("/account")}>
				<span className="wallet-ballance">
					Gas:{" "}
					{updatedWallet === null
						? clientData.balance.toFixed(4)
						: updatedWallet.toFixed(4)}{" "}
					<img width={15} src={iconGenerator("STACKING")} />
				</span>
				<span className="wallet-key">
					{clientData.address.slice(0, 5)}...{clientData.address.slice(-4)}
				</span>
			</div>
			{/*}*/}
		</div>
	);
}

export default Wallet;
