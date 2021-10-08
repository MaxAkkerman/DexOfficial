import {Account} from "@tonclient/appkit";
import {signerKeys} from "@tonclient/core";

import {DEXClientContract} from "../extensions/contracts/DEXClient";
import client from "../extensions/webhook/script";

const TOKEN_ROOT_MAP = {
	USDT: process.env.ROOT_TOKEN_USDT_ADDRESS,
	WTON: process.env.ROOT_TOKEN_WTON_ADDRESS,
};

export default async function transferLimitOrder(
	{id, fromSymbol, toSymbol, newOwnerAddress},
	{clientAddress, clientKeyPair},
) {
	const clientAcc = new Account(DEXClientContract, {
		address: clientAddress,
		client,
		signer: signerKeys(clientKeyPair),
	});

	const {
		decoded: {
			output: {rootWallet},
		},
	} = await clientAcc.runLocal("rootWallet", {});

	const response = clientAcc.run("transferLimitOrder", {
		limitOrder: id,
		addrNewOwner: newOwnerAddress,
		walletNewOwnerFrom: rootWallet[TOKEN_ROOT_MAP[fromSymbol]],
		walletNewOwnerTo: rootWallet[TOKEN_ROOT_MAP[toSymbol]],
	});

	return response.decoded.output;
}
