import "./index.scss";

import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {HttpLink, split} from "@apollo/client";
import {WebSocketLink} from "@apollo/client/link/ws";
import {getMainDefinition} from "@apollo/client/utilities";
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

const httpLink = new HttpLink({
	uri: Radiance.networks[2].graphqlUrl,
});

const wsLink = new WebSocketLink({
	uri: Radiance.networks[2].graphqlUrlWs,
	options: {
		reconnect: true,
	},
});

const splitLink = split(
	({query}) => {
		const definition = getMainDefinition(query);
		return (
			definition.kind === "OperationDefinition" &&
			definition.operation === "subscription"
		);
	},
	wsLink,
	httpLink,
);

export const store = createStore(rootReducer, composeWithDevTools());
export const client = new ApolloClient({
	link: splitLink,
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
