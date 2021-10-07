import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {iconGenerator} from "../../iconGenerator";
import {
	setManageBalance,
	setManageFromToken,
	setManagePairId,
	setManageRateAB,
	setManageRateBA,
	setManageToToken,
} from "../../store/actions/manage";
import "./LiquidityItem.scss";

function LiquidityItem({symbol, balance}) {
	const history = useHistory();
	const dispatch = useDispatch();
	const symbols = symbol.split("/");
	// let res1 = symbol.substring(0,15)
	// let res2 = symbol.substring(16)

	// let symbols = [res1,res2]
	const pairsList = useSelector((state) => state.walletReducer.pairsList);
// console.log("res1",res1,"res2",res2)
	const handleClick = () => {
		const fromToken = symbols[0].replaceAll("DS-W", "");
		dispatch(setManageBalance(balance));
		console.log("pairsList",pairsList,"fromToken",fromToken,"symbols",symbols,"symbol",symbol)


		pairsList.forEach((i) => {
			if (i.symbolA.includes(fromToken) && i.symbolB.includes(symbols[1])) {

				// console.log("pairsList",pairsList)

				dispatch(setManageFromToken({symbol: fromToken, reserve: i.reserveA}));
				dispatch(setManageToToken({symbol: symbols[1], reserve: i.reservetB}));
				dispatch(setManagePairId(i.pairAddress));
				dispatch(setManageRateAB(i.rateAB));
				dispatch(setManageRateBA(i.rateBA));
			} else if (
				i.symbolB.includes(fromToken) &&
				i.symbolA.includes(symbols[1])
			) {
				dispatch(setManageFromToken({symbol: fromToken, reserve: i.reservetB}));
				dispatch(setManageToToken({symbol: symbols[1], reserve: i.reserveA}));
				dispatch(setManagePairId(i.pairAddress));
				dispatch(setManageRateAB(i.rateAB));
				dispatch(setManageRateBA(i.rateBA));
			}
		});
		history.push("/manage");
	};

	return (
		<div className="liquidity-item">
			<div>
				<img src={iconGenerator(symbols[0])} alt={symbols[0]} />
				<img src={iconGenerator(symbols[1])} alt={symbols[1]} />
				<span className="liquidity-item-text">
					{symbols[0]}/{symbols[1]} LP Tokens
				</span>
			</div>
			<button onClick={handleClick} className="liquidity-item-btn">
				Manage
			</button>
		</div>
	);
}

export default LiquidityItem;
