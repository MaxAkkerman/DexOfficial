import {Account} from "@tonclient/appkit";
import {signerKeys} from "@tonclient/core";

import {DEXClientContract} from "../extensions/contracts/DEXClient";
import client from "../extensions/sdk_get/get";

export default async function updateLimitOrderPrice(
	{id, newPrice},
	{clientAddress, clientKeyPair},
) {
	const clientAcc = new Account(DEXClientContract, {
		address: clientAddress,
		client,
		signer: signerKeys(clientKeyPair),
	});

	const response = await clientAcc.run("changeLimitOrderPrice", {
		limitOrder: id,
		newPrice,
	});

	return response.decoded.output;
}