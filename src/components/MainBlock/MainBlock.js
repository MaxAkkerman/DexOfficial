import "./MainBlock.scss";
import React from "react";
import {hideSwapFromSelect, hideSwapToSelect} from "../../store/actions/swap";
import {hidePoolFromSelect, hidePoolToSelect} from "../../store/actions/pool";
import {
	hideOrdersFromSelect,
	hideOrdersToSelect,
} from "../../store/actions/limitOrder";

function MainBlock({
	smallTitle,
	normalTitle,
	class: className,
	title,
	button,
	classHeader,
	classTitle,
	content,
	classNameContainer,
	footer,
	...rest
}) {
	function classGenerator() {
		let str = "mainblock-title";

		if (smallTitle) {
			str += " mainblock-title--small";
		}
		if (normalTitle) {
			str += " mainblock-title--normal";
		}

		return str;
	}
	// function handleCloseCurPopup(e) {
	// 	console.log("searchBtn swapPopup",e.target.id)
	// 	if(e.target.id === "swapPopup" || e.target.id === "searchBtn" || e.target.id === "searchBtnInp" || e.target.id === "mainBlock" || e.target.id === "mainBlockTitle") {
	// 		return
	// 	}else{
	//
	// 	}
	//
	// }
	return (
		<div
			id="mainBlock"
			className={
				classNameContainer ? `mainblock ${classNameContainer}` : "mainblock"
			}
			// onClick={(e)=>handleCloseCurPopup(e)}
		>
			{(title || button) && (
				<div
					id={"swapPopup"}
					className={
						classHeader ? classHeader + " mainblock-header" : "mainblock-header"
					}
				>
					<h2
						id="mainBlockTitle"
						className={
							classTitle
								? `${classTitle} ` + classGenerator()
								: classGenerator()
						}
					>
						{title}
					</h2>
					{button && button}
				</div>
			)}
			{content}
			{footer && footer}
		</div>
	);
}

export default MainBlock;
