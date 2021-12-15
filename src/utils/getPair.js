import find from "lodash/find";

import {NO_CONTEXT} from "@/constants/runtimeErrors";

export default function getPair(pairAddress) {
	if (!this || !this.context || !this.context.reduxStore)
		throw new Error(NO_CONTEXT);

	const state = this.context.reduxStore.getState();

	return find(state.tonData.pairs, {pairAddress});
}
