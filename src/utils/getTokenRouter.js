import {Account} from "@tonclient/appkit";

import {FUNC_FAIL, NO_CONTEXT} from "@/constants/runtimeErrors";
import {LimitOrderRootContract} from "@/extensions/contracts/LimitOrderRoot";
import {LimitOrderRouterContract} from "@/extensions/contracts/LimitOrderRouter";

/**
 * @param {string} rootAddress
 * @returns {Promise<string>} routerAddress
 */
export default async function getTokenRouter(rootAddress) {
	if (
		!this ||
		!this.context ||
		!this.context.limitRootAddress ||
		!this.context.tonClient
	)
		throw new Error(NO_CONTEXT);

	const rootAcc = new Account(LimitOrderRootContract, {
		address: this.context.limitRootAddress,
		client: this.context.tonClient,
	});

	let res = await rootAcc.runLocal("_deployedRouter", {});
	if (!res.decoded) throw new Error(FUNC_FAIL);
	const {_deployedRouter} = res.decoded.output;
	console.log("LimitOrderRoot->deployed_router_address", _deployedRouter);

	const routerAcc = new Account(LimitOrderRouterContract, {
		address: _deployedRouter,
		client: this.context.tonClient,
	});

	res = await routerAcc.runLocal("walletFor", {});
	if (!res.decoded) throw new Error(FUNC_FAIL);
	const {walletFor} = res.decoded.output;

	return walletFor[rootAddress];
}
