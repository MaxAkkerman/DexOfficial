import {Account} from "@tonclient/appkit";
import {signerKeys} from "@tonclient/core";

import {DEXClientContract} from "../extensions/contracts/DEXClient";
import client from "../extensions/webhook/script";

export default async function cancelLimitOrder(
	limitOrderId,
	{clientAddress, clientKeyPair},
) {
	const acc = new Account(DEXClientContract, {
		address: clientAddress,
		signer: signerKeys(clientKeyPair),
		client,
	});

	const response = await acc.run("cancelLimitOrder", {
		limitOrder: limitOrderId,
	});

	return response.decoded.output;
}
