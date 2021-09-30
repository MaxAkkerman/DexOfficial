import React from "react";
import cls from "classnames";

function BlockItem(props) {
	return (
		<div className={cls("amount_wrapper", props.className)}>
			<div className="amount_left_block">
				<div className="send_text_headers">{props.leftTitle}</div>
				{props.leftBlockBottom}
			</div>
			<div className="amount_right_block">
				{props.rightTopBlock}
				{props.rightBottomBlock}
			</div>
		</div>
	);
}

export default BlockItem;
