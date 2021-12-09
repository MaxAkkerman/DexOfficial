import {Account} from "@tonclient/appkit";
import {signerKeys} from "@tonclient/core";

import {AB_DIRECTION} from "../constants/runtimeVariables";
import {DEXClientContract} from "../extensions/contracts/DEXClientMainNet";

export default async function takeLimitOrder(
	{directionPair, orderAddr, pairAddr, price, qty},
	{getClientAddress, getClientKeyPair, getPair, getTokenRouter, getTonClient},
) {
	const clientAddress = getClientAddress();
	const clientKeyPair = getClientKeyPair();
	const tonClient = getTonClient();

	console.log(
		"takeLimitOrder->params",
		`${pairAddr},${orderAddr},${directionPair},${qty},${price}`,
	);

	const clientAcc = new Account(DEXClientContract, {
		address: clientAddress,
		client: tonClient,
		signer: signerKeys(clientKeyPair),
	});

	const pair = await getPair(pairAddr);
	try {
		if (directionPair === AB_DIRECTION) {
			const routerAddr = await getTokenRouter(pair.rootB);
			console.log("Router_address->B", routerAddr);
			const res = await clientAcc.run("takeLimitOrderA", {
				limitOrderA: orderAddr,
				pairAddr,
				priceB: price,
				qtyB: qty,
				routerWalletB: routerAddr,
			});
			console.log("takeLimitOrderA->response", res.decoded);
			res.decoded;
		} else {
			const routerAddr = await getTokenRouter(pair.rootA);
			console.log("Router_address->A", routerAddr);
			const res = await clientAcc.run("takeLimitOrderB", {
				limitOrderB: orderAddr,
				pairAddr,
				priceA: price,
				qtyA: qty,
				routerWalletA: routerAddr,
			});
			console.log("takeLimitOrderB->response", res.decoded);
			return res.decoded;
		}

		return true;
	} catch (err) {
		console.log("takeLimitOrder->error", err);
		throw err;
	}
}
