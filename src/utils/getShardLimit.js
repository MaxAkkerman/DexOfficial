import {Account} from "@tonclient/appkit";

import {NO_CONTEXT} from "@/constants/runtimeErrors";
import {LimitOrderRootContract} from "@/extensions/contracts/LimitOrderRoot";
import {LimitOrderRouterContract} from "@/extensions/contracts/LimitOrderRouter";
import {getShardThis} from "@/extensions/tonUtils";

export default async function getShardLimit() {
	if (
		!this ||
		!this.context ||
		!this.context.dexRootAddress ||
		!this.context.limitRootAddress ||
		!this.context.tonClient ||
		!this.helperFunctions ||
		!this.helperFunctions.getRouterAddress
	)
		throw new Error(NO_CONTEXT);

	let response;
	let targetShard = getShardThis(this.context.dexRootAddress);
	const rootAcc = new Account(LimitOrderRootContract, {
		address: this.context.limitRootAddress,
		client: this.context.tonClient,
	});

	const routerAddress = await this.helperFunctions.getRouterAddress();
	const rootRouterAcc = new Account(LimitOrderRouterContract, {
		address: routerAddress,
		client: this.context.tonClient,
	});
	console.log("rootRouterAcc", rootRouterAcc);

	const souintInitial = await rootRouterAcc.runLocal("soUINT", {});
	console.log("souintInitial", souintInitial);

	let souint = Number(souintInitial);
	console.log("souint", souint);

	// let souint = 0;
	let curShard = null;

	while (curShard !== targetShard) {
		response = await rootAcc.runLocal("resolveOrder", {id: souint});
		console.log("shards", targetShard, curShard);

		curShard = response.decoded.output.addrOrder[2];
		console.log("shards", targetShard, curShard);
		souint++;
	}
	return souint;
}
