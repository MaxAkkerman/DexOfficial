import React from "react";

import "./EnterSeedPhrase.scss";

import {Alert, AlertTitle, Box} from "@material-ui/core";

function Alerter(props) {
	console.log("Alerter rerendered blyat");

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				marginTop: "24px",
			}}
		>
			<Alert
				severity={props.validSeedPhrase.onError ? "error" : "success"}
				sx={{width: "100%"}}
			>
				<AlertTitle>
					{props.validSeedPhrase.onError
						? "Seed phrase invalid"
						: "Seed phrase valid"}
				</AlertTitle>
				{props.validSeedPhrase.msg}
			</Alert>
		</Box>
	);
}

export default React.memo(Alerter);
