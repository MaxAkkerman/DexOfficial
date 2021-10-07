import "./index.scss";

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
import rootReducer from "./store/reducers";

export const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
	<Provider store={store}>
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
	</Provider>,
	document.getElementById("root"),
);
