import {Account} from "@tonclient/appkit";
import {signerKeys} from "@tonclient/core";

import {
	AB_DIRECTION,
	LIMIT_ORDER_PRICE_DENOMINATOR,
} from "../constants/runtimeVariables";
import {DEXClientContract} from "../extensions/contracts/DEXClientMainNet";
import client, {getShardLimit} from "../extensions/sdk_get/get";
import getPair from "./getPair";
import getTokenInfo from "./getTokenInfo";
import getTokenRouter from "./getTokenRouter";

export default async function makeLimitOrder(
	{pairAddr, directionPair, qty, price},
	{clientAddress, clientKeyPair},
) {
	const clientAcc = new Account(DEXClientContract, {
		address: clientAddress,
		client,
		signer: signerKeys(clientKeyPair),
	});

	const sounitV = await getShardLimit();
	console.log("sounitV", sounitV);
	const pair = await getPair(pairAddr);
	let response = null;
	try {
		if (directionPair === AB_DIRECTION) {
			const router = await getTokenRouter(pair.rootA);
			const token = await getTokenInfo(pair.rootA);
			response = await clientAcc.run("makeLimitOrderA", {
				routerWalletA: router,
				pairAddr,
				qtyA: qty * 10 ** token.decimals,
				priceA: price * LIMIT_ORDER_PRICE_DENOMINATOR,
				souint: sounitV,
			});
		} else {
			const router = await getTokenRouter(pair.rootB);
			const token = await getTokenInfo(pair.rootB);
			response = await clientAcc.run("makeLimitOrderB", {
				routerWalletB: router,
				pairAddr,
				qtyB: qty * 10 ** token.decimals,
				priceB: price * LIMIT_ORDER_PRICE_DENOMINATOR,
				souint: souint,
			});
		}

		return response.decoded.output;
	} catch (e) {
		console.log("eee", e);
		return e;
	}
}
