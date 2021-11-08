import {NO_TOKEN} from "../constants/runtimeErrors";

const TOKEN_ROUTER_MAP = {
	USDT: process.env.LIMIT_ROUTER_USDT_ADDRESS,
	WBTC: process.env.LIMIT_ROUTER_WBTC_ADDRESS,
	WTON: process.env.LIMIT_ROUTER_WTON_ADDRESS,
	WETH: process.env.LIMIT_ROUTER_WETH_ADDRESS,
};

/**
 * Returns token's router (limit order router) address
 * @param {"USDT"|"WBTC"|"WTON"|"WETH"} tokenSymbol
 * @returns {string}
 */
export default function getTokenRouter(tokenSymbol) {
	if (!Object.keys(TOKEN_ROUTER_MAP).includes(tokenSymbol))
		throw new Error(NO_TOKEN);

	return TOKEN_ROUTER_MAP[tokenSymbol];
}
