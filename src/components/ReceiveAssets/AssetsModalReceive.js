import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import arrowBack from "../../images/arrowBack.png";
import AssetsList from "../AssetsList/AssetsList";
import {useHistory} from "react-router-dom";
import {
	setReceiveToken,
	setTokenForReceiveSetted,
} from "../../store/actions/walletSeed";
import SearchInput from "../SearchInput/SearchInput";
import useAssetList from "../../hooks/useAssetList";
import includesTextInToken from "../../utils/includesTextInToken";
import salary from "../../images/salary.svg";

const pureNFT = [
	{
		walletAddress:
			"0:e0b0495751895edc29c5e453f122f25fffebd2bf21c0a0c3d8e98a8ae7b87e3a",
		balance: 0,
		stakeTotal: 0,
		icon: salary,
		symbol: "DP",
		owner_address: "default",
	},
];

function AssetsModalReceive() {
	const history = useHistory();
	const dispatch = useDispatch();
	const assetstestArray = useSelector(
		(state) => state.walletSeedReducer.assetstestArray,
	);
	const tokenList = useSelector((state) => state.walletReducer.tokenList);
	const clientData = useSelector((state) => state.walletReducer.clientData);
	const liquidityList = useSelector(
		(state) => state.walletReducer.liquidityList,
	);

	const NFTassets = useSelector((state) => state.walletSeedReducer.NFTassets);

	// const [defaultNFT, setDefaultNFT] = useState(pureNFT)
	// useEffect(()=>{
	//     const nftDef = JSON.parse(JSON.stringify(pureNFT))
	//
	//
	//     nftDef[0].walletAddress = clientData.address
	//     console.log("nftDef",nftDef)
	//     dispatch(setReceiveToken(nftDef))
	//
	// },[])
	const [defNFT, setDefNFT] = useState([]);
	useEffect(() => {
		const nftDef = JSON.parse(JSON.stringify(pureNFT));

		nftDef[0].walletAddress = clientData.address;
		nftDef[0].owner_address = clientData.address;
		console.log("nftDef", nftDef);
		setDefNFT(nftDef);
		// dispatch(setReceiveToken(nftDef))
	}, []);
	function handleClear() {
		dispatch(setTokenForReceiveSetted(false));
		history.push("/wallet/receive");
	}

	function handleSetToken(item) {
		dispatch(setReceiveToken(item));
		history.push("/wallet/receive");
	}

	const {assetList} = useAssetList();

	const [filter, setFilter] = useState("");

	return (
		<>
			{/*{showAssetsForSend &&*/}
			<div className="select-wrapper">
				<div className="mainblock">
					<div className="head_wrapper">
						<button className="arrow_back" onClick={() => handleClear()}>
							<img src={arrowBack} alt={"arrow"} />
						</button>
					</div>
					<SearchInput func={setFilter} />
					<AssetsList
						handleClickToken={(item) => handleSetToken(item)}
						showItBeShown={false}
						handleClickNFT={(item) => handleSetToken(item)}
						TokenAssetsArray={[...assetList, ...liquidityList]
							.sort((a, b) => b.balance - a.balance)
							.filter((t) => includesTextInToken(t, filter))}
						NFTassetsArray={defNFT}
						showNFTdata={false}
					/>
				</div>
			</div>
			{/*}*/}
		</>
	);
}

export default AssetsModalReceive;
