import React, {useState} from "react";
import ReactDOM from "react-dom";
import {useDispatch, useSelector} from "react-redux";
import CloseBtn from "../CloseBtn/CloseBtn";
import Loader from "../Loader/Loader";
import MainBlock from "../MainBlock/MainBlock";
import SearchInput from "../SearchInput/SearchInput";
import PoolExplorerItem from "../PoolExplorerItem/PoolExplorerItem";
import "./PoolExplorer.scss";
import {useHistory} from "react-router-dom";
import {showTip} from "../../store/actions/app";

function PoolExplorer(props) {
	const dispatch = useDispatch();
	const [filter, setFilter] = useState("");
	const history = useHistory();
	const pairsList = useSelector((state) => state.walletReducer.pairsList);

	// const [st,setST] = useState(pairsList)

	// function arrPairs(tokenList2, LPTokenList2){
	//     let toArr = [];
	//     tokenList2.map((i) => {
	//         toArr.push({
	//             symbol: i.symbol,
	//             balance: i.balance,
	//             walletAddress: i.walletAddress,
	//             lp: false
	//         })
	//     })
	//     LPTokenList2.map((i) => {
	//         toArr.push({
	//             symbol: i.symbol,
	//             balance: i.balance,
	//             walletAddress: i.walletAddress,
	//             lp: true
	//         })
	//     })
	//     return toArr
	// }
	// const [chekCurDaata, setchekCurDaata] = useState(true)
	// useEffect(async()=>{
	//     setchekCurDaata(true)
	// },[])

	// useEffect(async()=>{
	//
	//     // if(chekCurDaata){
	//         setInterval(async() => {
	//             console.log("1122")
	//             setST(await getAllPairsWoithoutProvider())
	//
	//         }, 2000)
	//
	//     // }
	//
	//
	// },[])

	//todo dispatch error is here

	function handleClose() {
		// setchekCurDaata(false)
		// clearTimeout = () => {
		//     // use clearTimeout on the stored timeout in the class property "timeout"
		//     window.clearInterval();
		// }
		history.push("/swap");
		// return dispatch(hidePoolExplorer())
	}

	return (
		// <div className="select-wrapper">
		<div className="container" onClick={() => console.log("pool")}>
			<MainBlock
				// title={'Pool explorer'}
				// classTitle={{justifyContent: "center !important"}}
				// button={<CloseBtn func={handleClose}/>}
				content={
					<>
						<div className="head_wrapper">
							<div className="left_block boldFont">Pool Explorer</div>
						</div>
						{!pairsList.length ? (
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
									{pairsList
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
		// document.querySelector('body')
	);
}

export default PoolExplorer;
