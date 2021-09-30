import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import "./SendAssets.scss";
import arrowBack from "../../images/arrowBack.png";
import AssetsList from "../AssetsList/AssetsList";
import {useHistory} from "react-router-dom";
import {
	setAmountForSend,
	setCurrentTokenForSend,
	setInputNFTDisabled,
	setTokenSetted,
} from "../../store/actions/walletSeed";
import SearchInput from "../SearchInput/SearchInput";
import useAssetList from "../../hooks/useAssetList";

import CloseBtn from "../CloseBtn/CloseBtn";
import MainBlock from "../MainBlock/MainBlock";
import {useMediatedState} from "react-use";

function AssetsModal() {
	const history = useHistory();
	const dispatch = useDispatch();
	const NFTassets = useSelector((state) => state.walletSeedReducer.NFTassets);

	const liquidityList = useSelector(
		(state) => state.walletReducer.liquidityList,
	);

	// <<<<<<< HEAD
	//     const [tokensWithNativeTons, settokensWithNativeTons] = useState([])
	//     useEffect(() => {
	//         const TONdata = {
	//             walletAddress: clientData.address,
	//             symbol: "TON Crystal",
	//             tokenName: "TON Crystal",
	//             type: "TON Crystal",
	//             icon: TONicon,
	//             rootAddress: "none",
	//             balance: clientData.balance,
	//         }
	//         const withNative = JSON.parse(JSON.stringify(tokenList))
	//         withNative.push(TONdata)
	//         settokensWithNativeTons(withNative)
	//
	//
	//     }, [])
	//     useEffect(() => {
	//         console.log("i was here")
	//         const TONdata = {
	//             walletAddress: clientData.address,
	//             symbol: "TON Crystal",
	//             tokenName: "TON Crystal",
	//             type: "TON Crystal",
	//             icon: TONicon,
	//             rootAddress: "none",
	//             balance: clientData.balance,
	//         }
	//         const withNative = JSON.parse(JSON.stringify(tokenList))
	//         withNative.push(TONdata)
	//         settokensWithNativeTons(withNative)
	//
	// =======
	const {assetList} = useAssetList();

	// >>>>>>> origin/liketurbo

	// }, [clientData, tokenList])
	// const [assetsArr,setAssetsArr] = useState([])
	// useEffect(()=>{
	//     const arr = [...tokenList, ...liquidityList,...NFTassets]
	//     setAssetsArr(arr)
	//
	// },[])
	function handleClear() {
		dispatch(setInputNFTDisabled(null));
		// dispatch(setAmountForSend(0))
		history.push("/wallet/send");
	}

	function handleSetNFT(item) {
		dispatch(setAmountForSend(""));
		console.log("i am on vft");
		dispatch(setInputNFTDisabled("disabled"));
		dispatch(setAmountForSend(item.stakeTotal));
		dispatch(setCurrentTokenForSend(item));

		dispatch(setTokenSetted(true));
		history.push("/wallet/send");
	}

	function handleSetToken(item) {
		console.log("mey otiem", item);
		dispatch(setAmountForSend(""));
		dispatch(setInputNFTDisabled(null));
		dispatch(setCurrentTokenForSend(item));
		dispatch(setTokenSetted(true));

		history.push("/wallet/send");
	}

	// const [showNFTdata, setShowNFTdata] = useState(false)
	//
	// function handleShowNFTData() {
	//     setShowNFTdata(!showNFTdata)
	//
	// }
	const [filter, setFilter] = useState("");
	function handleSearch(text) {
		setFilter(text);
		// const assetsArrCopy = JSON.parse(JSON.stringify(assetsArr))
		// const arr = assetsArrCopy.filter(item=>text===item.name)
		//
		// setAssetsArr(arr)
	}
	function handleClose() {
		dispatch(setInputNFTDisabled(null));
		history.push("/wallet/send");
	}

	return (
		<>
			{/*{showAssetsForSend &&*/}

			<div className="select-wrapper">
				<MainBlock
					title={"Select a token"}
					button={<CloseBtn func={() => handleClose()} />}
					content={
						<>
							{/*<div className="head_wrapper">*/}
							{/*    <button className="arrow_back" onClick={() => handleClear()}>*/}
							{/*        <img src={arrowBack} alt={"arrow"}/>*/}
							{/*    </button>*/}
							{/*</div>*/}
							<SearchInput func={(e) => handleSearch(e)} />

							<AssetsList
								handleClickNFT={(item) => handleSetNFT(item)}
								handleClickToken={(item) => handleSetToken(item)}
								TokenAssetsArray={[...assetList, ...liquidityList]}
								NFTassetsArray={NFTassets}
								orderAssetsArray={null}
								showItBeShown={false}
								filter={filter}
								// showNFTdata={false}
							/>
						</>
					}
				/>
			</div>
		</>
	);
}

export default AssetsModal;
