import {Account} from "@tonclient/appkit";
import {signerKeys} from "@tonclient/core";

import {DEXClientContract} from "../extensions/contracts/DEXClientMainNet";
import client from "../extensions/sdk_get/get";
import getTokenRouter from "./getTokenRouter";

export default async function takeLimitOrder(
	{pairAddr, orderAddr, directionPair, toTokenSymbol, qty, price},
	{clientAddr, clientKeyPair},
) {
	console.log(
		"takeLimitOrder->params",
		`${pairAddr},${orderAddr},${toTokenSymbol},${qty},${price}`,
	);

	const clientAcc = new Account(DEXClientContract, {
		address: clientAddr,
		client,
		signer: signerKeys(clientKeyPair),
	});

	const routerAddr = getTokenRouter(toTokenSymbol);

	try {
		if (directionPair === "4") {
			const res = await clientAcc.run("takeLimitOrderA", {
				pairAddr,
				limitOrderA: orderAddr,
				routerWalletB: routerAddr,
				qtyB: qty,
				priceB: price,
			});
			console.log("takeLimitOrderA->response", res.decoded);
		} else {
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
