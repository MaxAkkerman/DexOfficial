import {Box} from "@material-ui/core";
import React, {memo} from "react";

function Steppers(props) {
	console.log("propspropsprops",typeof props.step);
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				color: `var(--mainblock-title-color)`,
				marginTop:
					`${
					props.step === "1" ? "12vh" : (props.step === "4" ? "14.85vh" : "10vh")
				}`,
			}}
		>
			Step {props.step}/4
		</Box>
	);
}
export default memo(Steppers);
