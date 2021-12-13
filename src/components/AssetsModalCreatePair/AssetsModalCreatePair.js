import React, {useState} from "react";
import AssetsList from "../AssetsList/AssetsList";
import SearchInput from "../SearchInput/SearchInput";
import CloseBtn from "../CloseBtn/CloseBtn";
import MainBlock from "../MainBlock/MainBlock";
import {hideSwapFromSelect, hideSwapToSelect} from "../../store/actions/swap";
import {hidePoolFromSelect, hidePoolToSelect} from "../../store/actions/pool";
import {
	hideOrdersFromSelect,
	hideOrdersToSelect,
} from "../../store/actions/limitOrders";

function AssetsModalCreatePair(props) {
	const [filter, setFilter] = useState("");

	function handleSetToken(item) {
		props.handleSet(item, props.type);
	}

	function handleSearch(text) {
		setFilter(text);
	}
	// function handleClose() {
	// 	props.handleCloseAssetsListPopup();
	// }
	function handleClose(e) {
		console.log("searchBtn swapPopup", e.target.id);
		if (
			e.target.id === "swapPopup" ||
			e.target.id === "searchBtn" ||
			e.target.id === "searchBtnInp" ||
			e.target.id === "mainBlock" ||
			e.target.id === "mainBlockTitle"
		)
			return;

		props.handleCloseAssetsListPopup();
	}
	return (
		<>
			<div className="select-wrapper" onClick={(e) => handleClose(e)}>
				<MainBlock
					title={"Select asset"}
					class={"fixPositionCreatePairModal"}
					button={<CloseBtn func={() => handleClose()} />}
					content={
						<>
							<SearchInput func={(e) => handleSearch(e)} />

							<AssetsList
								handleClickNFT={null}
								handleClickToken={(item) => handleSetToken(item)}
								TokenAssetsArray={props.assetsList.filter((i) =>
									i.symbol.includes(filter.toUpperCase()),
								)}
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
