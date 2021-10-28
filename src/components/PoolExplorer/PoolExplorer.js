import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import Loader from "../Loader/Loader";
import MainBlock from "../MainBlock/MainBlock";
import SearchInput from "../SearchInput/SearchInput";
import PoolExplorerItem from "../PoolExplorerItem/PoolExplorerItem";
import "./PoolExplorer.scss";

function PoolExplorer() {
	const [filter, setFilter] = useState("");
	const pairsList = useSelector((state) => state.walletReducer.pairsList);

	const [pairsArr,setPairsArray] = useState([])
	useEffect(()=>{
		setPairsArray(pairsList)
	},[pairsList])

	return (
		<div className="container" onClick={() => console.log("pool")}>
			<MainBlock
				content={
					<>
						<div className="head_wrapper">
							<div className="left_block boldFont">Pool Explorer</div>
						</div>
						{!pairsArr.length ? (
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<Loader />
							</div>
						) : (
							<>
								<div style={{marginTop: "20px"}}>
									<SearchInput func={setFilter.bind(this)} />
								</div>
								<div className="select-list-pool">
									{pairsArr
										.sort(
											(a, b) =>
												b.reserveA - a.reserveA - (b.reservetB - a.reservetB),
										)
										.filter(
											(item) =>
												item.symbolA
													.toLowerCase()
													.includes(filter.toLowerCase()) ||
												item.symbolB
													.toLowerCase()
													.includes(filter.toLowerCase()),
										)
										.map((item) => (
											<PoolExplorerItem
												pair={item}
												key={item.symbolA + " " + item.symbolB}
											/>
										))}
								</div>
							</>
						)}
					</>
				}
			/>
		</div>
	);
}

export default PoolExplorer;
