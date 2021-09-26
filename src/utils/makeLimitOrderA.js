import { Account } from "@tonclient/appkit";
import { signerKeys } from "@tonclient/core";
import { DEXClientContract } from "../extensions/contracts/DEXClient";
import client from "../extensions/webhook/script";

const LIMIT_ORDER_ROUTER_ADDR = "0:6c6200dee36a37bbcdffcf5e738a4ea9839bc4dc1f9690c142a81d1f81b879e4";

export default async function makeLimitOrderA({
	pairAddr,
	qtyA,
	priceA,
}, { clientAddr, keyPair }) {
	const clientAcc = new Account(DEXClientContract, {
		address: clientAddr,
		client,
	});

	const response = await clientAcc.run("makeLimitOrderA", {
		routerWalletA: LIMIT_ORDER_ROUTER_ADDR,
		pairAddr,
		qtyA,
		priceA,
	}, {
		signer: signerKeys(keyPair),
	});

	return response.decoded.output;
}