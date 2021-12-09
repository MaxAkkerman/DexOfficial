import {Account} from "@tonclient/appkit";
import {signerKeys} from "@tonclient/core";

import {AB_DIRECTION} from "../constants/runtimeVariables";
import {DEXClientContract} from "../extensions/contracts/DEXClientMainNet";

export default async function swap(
	{directionPair, pairAddr, qtyFrom, qtyTo, slippage},
	{getClientAddress, getClientKeyPair, getPair, getTokenInfo, getTonClient},
) {
	const clientAddress = await getClientAddress();
	const clientKeyPair = await getClientKeyPair();
	const tonClient = await getTonClient();

	const clientAcc = new Account(DEXClientContract, {
		address: clientAddress,
		client: tonClient,
		signer: signerKeys(clientKeyPair),
	});

	const pair = await getPair(pairAddr);
	const tokenA = await getTokenInfo(pair.rootA);
	const tokenB = await getTokenInfo(pair.rootB);

	const minTo = qtyTo - qtyTo * slippage;
	const maxTo = qtyTo + qtyTo * slippage;

	try {
		let res = null;
		if (directionPair === AB_DIRECTION)
			res = await clientAcc.run("processSwapA", {
				maxQtyB: maxTo * 10 ** tokenB.decimals,
				minQtyB: minTo * 10 ** tokenB.decimals,
				pairAddr: pairAddr,
				qtyA: qtyFrom * 10 ** tokenA.decimals,
			});
		else
			res = await clientAcc.run("processSwapB", {
				maxQtyA: maxTo * 10 ** tokenA.decimals,
				minQtyA: minTo * 10 ** tokenA.decimals,
				pairAddr: pairAddr,
				qtyB: qtyFrom * 10 ** tokenB.decimals,
			});

		return res.decoded.output;
	} catch (e) {
		console.log("eee", e);
		return e;
	}
}
