import {Account} from "@tonclient/appkit";
import {signerKeys} from "@tonclient/core";

import {NO_CONTEXT} from "@/constants/runtimeErrors";
import {AB_DIRECTION} from "@/constants/runtimeVariables";
import {DEXClientContract} from "@/extensions/contracts/DEXClientMainNet";

export default async function swap({
	directionPair,
	pairAddr,
	qtyFrom,
	qtyTo,
	slippage,
}) {
	if (
		!this.context ||
		!this.context.dexClientAddress ||
		!this.context.dexClientKeyPair ||
		!this.context.tonClient ||
		!this.helperFunctions ||
		!this.helperFunctions.getPair ||
		!this.helperFunctions.getTokenInfo
	)
		throw new Error(NO_CONTEXT);

	const clientAcc = new Account(DEXClientContract, {
		address: this.context.dexClientAddress,
		client: this.context.tonClient,
		signer: signerKeys(this.context.dexClientKeyPair),
	});

	const pair = await this.helperFunctions.getPair(pairAddr);
	const tokenA = await this.helperFunctions.getTokenInfo(pair.rootA);
	const tokenB = await this.helperFunctions.getTokenInfo(pair.rootB);

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
