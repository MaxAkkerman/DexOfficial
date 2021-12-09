import {
	setFunctionsContext,
	setPairs,
	setPairsError,
	setPairsLoading,
	setTokens,
	setTokensError,
	setTokensLoading,
} from "../store/actions/app";
import {
	FETCH_PAIRS,
	FETCH_TOKENS,
	FUNCTIONS_CONTEXT_INIT,
} from "../store/actions/types";

export function createTonMiddleware(context) {
	return (store) => (next) => (action) => {
		switch (action.type) {
			case FETCH_PAIRS:
				store.dispatch(setPairsLoading());

				context
					.getPairs()
					.then((p) => store.dispatch(setPairs(p)))
					.catch((e) => store.dispatch(setPairsError(e)));
				break;
			case FETCH_TOKENS:
				store.dispatch(setTokensLoading());

				context
					.getTokens()
					.then((t) => store.dispatch(setTokens(t)))
					.catch((e) => store.dispatch(setTokensError(e)));
				break;
			case FUNCTIONS_CONTEXT_INIT: {
				store.dispatch(setFunctionsContext(context));
				break;
			}
			default:
				next(action);
		}
	};
}
