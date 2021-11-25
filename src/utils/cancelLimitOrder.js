import {Account} from "@tonclient/appkit";
import {signerKeys} from "@tonclient/core";

import {DEXClientContract} from "../extensions/contracts/DEXClient";
import client from "../extensions/sdk_get/get";

export default async function cancelLimitOrder(
	addrOrder,
	{clientAddress, clientKeyPair},
) {
	const acc = new Account(DEXClientContract, {
		address: clientAddress,
		signer: signerKeys(clientKeyPair),
		client,
	});

	const response = await acc.run("cancelLimitOrder", {
		limitOrder: addrOrder,
	});

	return response.decoded.output;
}
