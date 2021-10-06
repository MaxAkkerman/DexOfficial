import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
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

function AssetsModalCreatePair(props) {

	function handleSetToken(item) {
		props.handleSet(item,props.type)
	}

	const [filter, setFilter] = useState("");
	function handleSearch(text) {
		setFilter(text);
	}
	function handleClose() {
		props.handleCloseAssetsListPopup()
	}

	return (
		<>
			<div className="select-wrapper">
				<MainBlock
					title={"Select a token"}
					button={<CloseBtn func={() => handleClose()} />}
					content={
						<>
							<SearchInput func={(e) => handleSearch(e)} />

							<AssetsList
								handleClickNFT={null}
								handleClickToken={(item) => handleSetToken(item)}
								TokenAssetsArray={props.assetsList.filter((i) => i.symbol.includes(filter.toUpperCase()))}
								NFTassetsArray={null}
								orderAssetsArray={null}
								showItBeShown={false}
								filter={filter}
							/>
						</>
					}
				/>
			</div>
		</>
	);
}

export default AssetsModalCreatePair;
