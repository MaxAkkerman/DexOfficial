import {Account} from "@tonclient/appkit";
import {signerKeys} from "@tonclient/core";

import {DEXClientContract} from "../extensions/contracts/DEXClientMainNet";
import client from "../extensions/sdk_get/get";
import getPair from "./getPair";
import getTokenRouter from "./getTokenRouter";

export default async function takeLimitOrder(
	{pairAddr, orderAddr, directionPair, qty, price},
	{clientAddr, clientKeyPair},
) {
	console.log(
		"takeLimitOrder->params",
		`${pairAddr},${orderAddr},${directionPair},${qty},${price}`,
	);

	const clientAcc = new Account(DEXClientContract, {
		address: clientAddr,
		client,
		signer: signerKeys(clientKeyPair),
	});

	const pair = await getPair(pairAddr);

	try {
		if (directionPair === "4") {
			const routerAddr = await getTokenRouter(pair.rootB);
			console.log("Router address->B", routerAddr);
			const res = await clientAcc.run("takeLimitOrderA", {
				pairAddr,
				limitOrderA: orderAddr,
				routerWalletB: routerAddr,
				qtyB: qty,
				priceB: price,
			});
			console.log("takeLimitOrderA->response", res.decoded);
		} else {
			const routerAddr = await getTokenRouter(pair.rootA);
			console.log("Router address->B", routerAddr);
			const res = await clientAcc.run("takeLimitOrderB", {
				pairAddr,
				limitOrderB: orderAddr,
				routerWalletA: routerAddr,
				qtyA: qty,
				priceA: price,
			});
			console.log("takeLimitOrderB->response", res.decoded);
		}

		return true;
	} catch (err) {
		console.log("takeLimitOrder->error", err);
		return false;
	}
}
