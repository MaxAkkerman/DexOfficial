import {Account} from "@tonclient/appkit";
import {signerKeys} from "@tonclient/core";

import {LIMIT_ORDER_PRICE_DENOMINATOR} from "../constants/runtimeVariables";
import {DEXClientContract} from "../extensions/contracts/DEXClient";
import client from "../extensions/sdk_get/get";

export default async function updateLimitOrderPrice(
	{addrOrder, newPrice},
	{clientAddress, clientKeyPair},
) {
	const clientAcc = new Account(DEXClientContract, {
		address: clientAddress,
		client,
		signer: signerKeys(clientKeyPair),
	});

	const response = await clientAcc.run("changeLimitOrderPrice", {
		limitOrder: addrOrder,
		newPrice: newPrice * LIMIT_ORDER_PRICE_DENOMINATOR,
	});

	return response.decoded.output;
}
