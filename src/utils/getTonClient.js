import {TonClient} from "@tonclient/core";
import {libWeb} from "@tonclient/lib-web";
import memoize from "lodash/memoize";

import Radiance from "@/extensions/Radiance.json";

TonClient.useBinaryLibrary(libWeb);

// It's made "async", cause all other context functions are "async"
async function getTonClient() {
	const client = new TonClient({
		network: {endpoints: [Radiance.networks["2"].DappServer]},
	});
	return client;
}

export default memoize(getTonClient);
