import {Account} from "@tonclient/appkit";
import {signerKeys} from "@tonclient/core";

import {FUNC_FAIL} from "../constants/runtimeErrors";
import {DEXClientContract} from "../extensions/contracts/DEXClient";
import client from "../extensions/sdk_get/get";

export default async function transferLimitOrder(
	{addrOrder, fromRootAddr, toRootAddr, newOwnerAddress},
	{clientAddress, clientKeyPair},
) {
	const clientAcc = new Account(DEXClientContract, {
		address: clientAddress,
		client,
		signer: signerKeys(clientKeyPair),
	});

	const res = await clientAcc.runLocal("rootWallet", {});
	if (!res.decoded) throw new Error(FUNC_FAIL);
	const {rootWallet} = res.decoded.output;

	const response = await clientAcc.run("transferLimitOrder", {
		limitOrder: addrOrder,
		addrNewOwner: newOwnerAddress,
		walletNewOwnerFrom: rootWallet[fromRootAddr],
		walletNewOwnerTo: rootWallet[toRootAddr],
	});

	return response.decoded.output;
}
