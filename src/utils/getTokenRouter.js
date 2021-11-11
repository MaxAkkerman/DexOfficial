import {Account} from "@tonclient/appkit";
import {memoize} from "lodash";

import {FUNC_FAIL} from "../constants/runtimeErrors";
import {LimitOrderRootContract} from "../extensions/contracts/LimitOrderRoot";
import {LimitOrderRouterContract} from "../extensions/contracts/LimitOrderRouter";
import Radiance from "../extensions/Radiance.json";
import client from "../extensions/sdk_get/get";

const getAllRouters = memoize(async () => {
	const rootAcc = new Account(LimitOrderRootContract, {
		address: Radiance.networks[2].limitRootAddress,
		client,
	});

	let res = await rootAcc.runLocal("_deployedRouter", {});
	if (!res.decoded) throw new Error(FUNC_FAIL);
	const {_deployedRouter} = res.decoded.output;
	console.log("LimitOrderRoot->router_address", _deployedRouter);

	const routerAcc = new Account(LimitOrderRouterContract, {
		address: _deployedRouter,
		client,
	});

	res = await routerAcc.runLocal("walletFor", {});
	if (!res.decoded) throw new Error(FUNC_FAIL);
	const {walletFor} = res.decoded.output;
	console.log("LimitOrderRouter->root_router_map", walletFor);

	return walletFor;
});

/**
 * Returns token's router (limit order router) address
 * @param {string} rootAddress
 * @returns {Promise<string>} routerAddress
 */
export default async function getTokenRouter(rootAddress) {
	const allRouters = await getAllRouters();
	return allRouters[rootAddress];
}
