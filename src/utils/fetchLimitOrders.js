import {Account} from "@tonclient/appkit";

import {LIMIT_ORDER_AMOUNT} from "../constants/denominators";
import {LimitOrderContract} from "../extensions/contracts/LimitOrder";
import {LimitOrderRootContract} from "../extensions/contracts/LimitOrderRoot";
import client from "../extensions/sdk_get/get";

export default async function fetchLimitOrders({clientAddress}) {
	const rootAcc = new Account(LimitOrderRootContract, {
		address: process.env.LIMIT_ROOT_ADDRESS,
		client,
	});

	const response = await rootAcc.runLocal("resolveCodeHash", {});

	let hash = response.decoded.output.codeHash;
	hash = hash.substring(2, hash.length);
	console.log("hash", hash);

	const data = (
		await client.net.query_collection({
			collection: "accounts",
			filter: {
				code_hash: {eq: hash},
			},
			result: "id",
		})
	).result;

	const orders = [];

	for (const {id} of data) {
		const orderAcc = new Account(LimitOrderContract, {
			address: id,
			client,
		});

		const res = await orderAcc.runLocal("getInfo", {});

		if (clientAddress === res.decoded.output.addrOwner)
			orders.push({
				...res.decoded.output,
				id,
				price: Number(res.decoded.output.price),
				amount: Number(res.decoded.output.amount) / LIMIT_ORDER_AMOUNT,
			});
	}
	console.log("orders", orders);
	return orders;
}
