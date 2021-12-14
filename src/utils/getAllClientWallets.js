import {Account} from "@tonclient/appkit";

import {NO_CONTEXT} from "@/constants/runtimeErrors";
import {DEXClientContract} from "@/extensions/contracts/DEXClient";
import {RootTokenContract} from "@/extensions/contracts/RootTokenContract";
import {TONTokenWalletContract} from "@/extensions/contracts/TONTokenWallet";
import {iconGenerator} from "@/iconGenerator";
import {getDecimals, getFullName, hex2a} from "@/reactUtils/reactUtils";

export default async function getAllClientWallets() {
	if (
		!this ||
		!this.context ||
		!this.context.dexClientAddress ||
		!this.context.tonClient
	)
		throw new Error(NO_CONTEXT);

	const acc = new Account(DEXClientContract, {
		address: this.context.dexClientAddress,
		client: this.context.tonClient,
	});
	const response = await acc.runLocal("rootWallet", {});
	console.log(
		"response.decoded.output.rootWallet",
		response.decoded.output.rootWallet,
	);
	let normalizeWallets = [];
	try {
		for (const item of Object.entries(response.decoded.output.rootWallet)) {
			const curWalletContract = new Account(TONTokenWalletContract, {
				address: item[1],
				client: this.context.tonClient,
			});
			const curRootContract = new Account(RootTokenContract, {
				address: item[0],
				client: this.context.tonClient,
			});
			console.log("item[1]", item[1], "item[0]", item[0]);

			let curWalletData = await curWalletContract.runLocal("getDetails", {
				_answer_id: 0,
			});
			let curRootData = await curRootContract.runLocal("getDetails", {
				_answer_id: 0,
			});
			let itemData = {};

			// console.log("hereii", curWalletData)
			itemData.walletAddress = item[1];
			itemData.symbol = hex2a(curRootData.decoded.output.value0.symbol);
			itemData.tokenName = getFullName(itemData.symbol);
			itemData.type = "PureToken";
			itemData.owner_address =
				curWalletData.decoded.output.value0.owner_address;
			itemData.decimals = curRootData.decoded.output.value0.decimals;
			itemData.icon = iconGenerator(itemData.symbol);
			itemData.rootAddress = curWalletData.decoded.output.value0.root_address;
			itemData.balance =
				+curWalletData.decoded.output.value0.balance /
				getDecimals(curRootData.decoded.output.value0.decimals);

			if (
				itemData.walletAddress !==
				"0:eac2a309de0d777b820bd5b5fbfcb07733be5c068234333bd83ad35f610fe82d"
			) {
				normalizeWallets.push(itemData);
			}
		}
		console.log("normalizeWallets", normalizeWallets);
		return normalizeWallets;
	} catch (e) {
		console.log("catch E", e);
		return e;
	}
}
