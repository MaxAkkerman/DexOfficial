import "./index.scss";

import {ApolloProvider} from "@apollo/client";
import {StyledEngineProvider} from "@mui/material/styles";
import {SnackbarProvider} from "notistack";
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

import App from "./App";
import Alert from "./components/Alert/Alert";
import {apolloClient} from "./lib/apollo";
import {reduxStore} from "./lib/redux";

ReactDOM.render(
	<Provider store={reduxStore}>
		<ApolloProvider client={apolloClient}>
			<BrowserRouter>
				<StyledEngineProvider injectFirst>
					<SnackbarProvider
						maxSnack={3}
						autoHideDuration={10000}
						anchorOrigin={{
							horizontal: "right",
							vertical: "bottom",
						}}
						content={(key, {message, type}) => (
							<Alert id={key} message={message} type={type} />
						)}
					>
						{/* <React.StrictMode> */}
						<App />
						{/* </React.StrictMode> */}
					</SnackbarProvider>
				</StyledEngineProvider>
			</BrowserRouter>
		</ApolloProvider>
	</Provider>,
	document.getElementById("root"),
);
