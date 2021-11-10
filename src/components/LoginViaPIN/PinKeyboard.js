import React, {useMemo} from "react";
import "./PinPopup.scss";
import Button from "@material-ui/core/Button";
import {Grid} from "@material-ui/core";

function PinKeyboard(props) {
	return (
		<Grid className="gridContainer" sx={{justifyContent: "center"}}>
			{props.numPadArr.map((item, i) => {
				return (
					<div key={item.value} style={{margin: "auto", marginTop: "20px"}}>
						<Button
							className="gridItem"
							variant="outlined"
							style={{display: item.disabled ? "none" : null}}
							disabled={item.disabled ? item.disabled : null}
							value={item.value}
							onClick={(e) => props.handleClickNumKeyboard(e, i)}
						>
							{item.value}
						</Button>
					</div>
				);
			})}
		</Grid>
	);
}

export default React.memo(PinKeyboard);