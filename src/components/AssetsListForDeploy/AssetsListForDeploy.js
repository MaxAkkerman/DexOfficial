import React, {useState} from "react";
import MainBlock from "../../components/MainBlock/MainBlock";
import AssetsList from "../../components/AssetsList/AssetsList";
import {useSelector} from "react-redux";
import {getClientKeys} from "../../extensions/webhook/script";
import DeployAssetConfirmPopup from "../DeployAssetConfirmPopup/DeployAssetConfirmPopup";
import {connectToPairStep2DeployWallets} from "../../extensions/sdk/run";
import {decrypt} from "../../extensions/seedPhrase";
import "./AssetsListForDeploy.scss";
import SearchInput from "../SearchInput/SearchInput";
import WaitingPopup from "../WaitingPopup/WaitingPopup";
import includesTextInToken from "../../utils/includesTextInToken";
import arrowBack from "../../images/arrowBack.png";
import {useHistory} from "react-router-dom";

function AssetsListForDeploy() {
	const history = useHistory();

	const encryptedSeedPhrase = useSelector(
		(state) => state.enterSeedPhrase.encryptedSeedPhrase,
	);
	const seedPhrasePassword = useSelector(
		(state) => state.enterSeedPhrase.seedPhrasePassword,
	);
	const clientData = useSelector((state) => state.walletReducer.clientData);
	const assetsFromGraphQL = useSelector(
		(state) => state.walletReducer.assetsFromGraphQL,
	);

	// const [assetsList,setAssetsList] = useState([])
	const [curAssetForDeploy, setcurAssetForDeploy] = useState({});
	const [showAssetDepPopup, showConfirmAssetDeployPopup] = useState(false);
	const [loadingRoots, setLoadingRoots] = useState(false);
	// useEffect(async () => {
	//     setAssetsList(assetsFromGraphQL)
	// }, [assetsFromGraphQL])

	function handleSetAssetForDeploy(item) {
		showConfirmAssetDeployPopup(true);
		setcurAssetForDeploy(item);
	}

	function hideConfirm() {
		showConfirmAssetDeployPopup(false);
	}
	const [deployWalletIsWaiting, setdeployWalletIsWaiting] = useState(false);

	async function handleDeployAsset() {
		console.log("curAssetForDeploy", curAssetForDeploy);
		if (clientData.balance < 4) return;
		showConfirmAssetDeployPopup(false);
		setdeployWalletIsWaiting(true);
		let decrypted = await decrypt(encryptedSeedPhrase, seedPhrasePassword);
		const keys = await getClientKeys(decrypted.phrase);
		const curPair = {rootA: curAssetForDeploy.rootAddress};

		const deployData = {
			curPair,
			clientAdr: clientData.address,
			clientRoots: "",
		};
		const deployRes = await connectToPairStep2DeployWallets(deployData, keys);
		console.log("deployRes", deployRes);
		setdeployWalletIsWaiting(true);
		showConfirmAssetDeployPopup(false);
	}
	function handleClose() {
		setdeployWalletIsWaiting(false);
	}
	function handleBack() {
		history.push("/wallet");
	}
	return (
		<>
			{showAssetDepPopup && (
				<DeployAssetConfirmPopup
					handleDeployAsset={() => handleDeployAsset()}
					currentAsset={curAssetForDeploy}
					hideConfirmPopup={() => hideConfirm()}
				/>
			)}
			<div className="container">
				{deployWalletIsWaiting && (
					<WaitingPopup
						text={`Deploying ${curAssetForDeploy.tokenName}`}
						handleClose={() => handleClose()}
					/>
				)}
				{!deployWalletIsWaiting ? (
					<MainBlock
						class={"heightfixmainBlock"}
						smallTitle={false}
						// title={'Assets'}
						content={
							<div>
								<div className="head_wrapper" style={{marginBottom: "40px"}}>
									<button className="arrow_back" onClick={() => handleBack()}>
										<img src={arrowBack} alt={"arrow"} />
									</button>
									<div className="left_block boldFont">Assets Inspector</div>
								</div>

								<SearchInput func={() => console.log("func")} />
								{assetsFromGraphQL.length ? (
									<AssetsList
										assetWrap="heightfixWrap assetsList_off_padding"
										TokenAssetsArray={assetsFromGraphQL}
										NFTassetsArray={null}
										isAssetsInspector={true}
										handleClickNFT={() => console.log("token item")}
										// showNFTdata={showNFTdata}
										handleClickToken={(item) => handleSetAssetForDeploy(item)}
									/>
								) : null}
							</div>
						}
					/>
				) : null}
			</div>
		</>
	);
}

export default AssetsListForDeploy;
