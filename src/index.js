import "./index.scss";

import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {StyledEngineProvider} from "@mui/material/styles";
import {SnackbarProvider} from "notistack";
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";

import App from "./App";
import Alert from "./components/Alert/Alert";
import Radiance from "./extensions/Radiance.json";
import rootReducer from "./store/reducers";

export const store = createStore(rootReducer, composeWithDevTools());
export const client = new ApolloClient({
	uri: Radiance.networks[2].limitOrderGraphqlUrl,
	cache: new InMemoryCache(),
});

ReactDOM.render(
	<Provider store={store}>
		<ApolloProvider client={client}>
			<BrowserRouter>
				<StyledEngineProvider injectFirst>
					<SnackbarProvider
						maxSnack={3}
						autoHideDuration={10000}
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "right",
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
