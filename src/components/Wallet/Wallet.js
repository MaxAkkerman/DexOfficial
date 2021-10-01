import React from "react";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {connectWallet} from "../../store/actions/app";
import "./Wallet.scss";
import {iconGenerator} from "../../iconGenerator";

function Wallet() {
	const history = useHistory();
	const dispatch = useDispatch();
	const walletIsConnected = useSelector(
		(state) => state.appReducer.walletIsConnected,
	);
	const clientData = useSelector((state) => state.walletReducer.clientData);
	const updatedWallet = useSelector(
		(state) => state.walletReducer.updatedWallet,
	);
	console.log("gdsgdg", clientData);
	const handleClick = async () => {
		dispatch(connectWallet());

		//     useEffect(()=>{
		// console.log("is it jonny")
		//       subscribeClientBalance(clientData.address)
		//     },[walletIsConnected])
		// const extensionsList = await checkExtensions();
		// let checkExt = extensionsList.filter(item=> {
		//   return item.available
		// })
		// if(checkExt.length){    //   dispatch(setExtensionsList(extensionsList));
		// }

		history.push("/account");
	};

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
