import React from "react";

import "./EnterSeedPhrase.scss";

import {Alert, AlertTitle, Box} from "@material-ui/core";

function HintItem(props) {
	return (
		<>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					marginTop: "24px",
				}}
			>
				<Alert severity="info">
					<AlertTitle>Hint</AlertTitle>
					You can paste seed phrase into page (Ctrl + V), and the fields will be
					automatically filled
				</Alert>
			</Box>

			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					marginTop: "24px",
				}}
			>
				<Alert severity="warning">
					<AlertTitle>Security policy</AlertTitle>
					Your password is the key to decrypting the seed phrase! Please make
					sure that this password is only used for this service. DefiSpace does
					not store your password and seed phrase on the remote server. The
					encrypted string with the seed phrase is stored in your computer's
					browser storage. DefiSpace service <strong>cannot decrypt</strong> it
					without knowing the password.
				</Alert>
			</Box>
		</>
	);
}

export default React.memo(HintItem);
