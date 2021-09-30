import React from "react";
import {useHistory} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {connectWallet} from "../../store/actions/app";
import "./NativeLogin.scss";

function NativeLogin() {
	const history = useHistory();
	const dispatch = useDispatch();
	const walletIsConnected = useSelector(
		(state) => state.appReducer.walletIsConnected,
	);

	const handleClick = async () => {
		dispatch(connectWallet());

		// const extensionsList = await checkExtensions();
		// let checkExt = extensionsList.filter(item=> {
		//   return item.available
		// })
		// if(checkExt.length){    //   dispatch(setExtensionsList(extensionsList));
		// }

		history.push("/account");
	};

	return (
		<div className="container">
			<div className="mainblock">
				<div className="mainblock-title">Login</div>
				{/*{(!walletIsConnected && wallet) ?*/}
				<button className="btn wallet-btn" onClick={handleClick}>
					Login using Seed phrase
				</button>
				<button className="btn wallet-btn" onClick={handleClick}>
					Create a new Seed Phrase and Wallet
				</button>
				{/*    :*/}
				{/*  <div className="wallet-wrap" onClick={() => history.push('/account')}>*/}
				{/*    <span className="wallet-ballance">Gas: {wallet.balance.toFixed(4)} TON</span>*/}
				{/*    <span className="wallet-key">{wallet.id.slice(0, 5)}...{wallet.id.slice(-4)}</span>*/}
			</div>
			{/*}*/}
		</div>
	);
}

export default NativeLogin;
