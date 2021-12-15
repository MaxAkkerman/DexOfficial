import {Box, Grid} from "@material-ui/core";
import React from "react";

export function NextBtn(props) {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				marginTop: "40px",
				marginBottom: props.marginBottom ? props.marginBottom : "",
				width: "100%",
			}}
		>
			<Grid container className={props.btnsClass} spacing={2}>
				<button
					// style={...props.curBtnStyles}

					onClick={() => props.handleClickNext()}
					className={
						props.errColor
							? `btn-error btn wallet-btn ${props.curBtnStyles}`
							: `btn wallet-btn ${props.curBtnStyles}`
					}
				>
					{props.btnText}
				</button>
			</Grid>
		</Box>
	);
}
