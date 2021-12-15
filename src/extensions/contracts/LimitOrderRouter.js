module.exports = {
	LimitOrderRouterContract: {
		abi: {
			"ABI version": 2,
			header: ["pubkey", "time", "expire"],
			functions: [
				{
					name: "constructor",
					inputs: [{name: "rootArr", type: "address[]"}],
					outputs: [],
				},
				{
					name: "deployEmptyWalletFor",
					inputs: [{name: "root", type: "address"}],
					outputs: [],
				},
				{
					name: "getDetailsCallback",
					inputs: [
						{
							components: [
								{name: "name", type: "bytes"},
								{
									name: "symbol",
									type: "bytes",
								},
								{name: "decimals", type: "uint8"},
								{
									name: "root_public_key",
									type: "uint256",
								},
								{name: "root_owner_address", type: "address"},
								{name: "total_supply", type: "uint128"},
							],
							name: "rootTokenDetails",
							type: "tuple",
						},
					],
					outputs: [],
				},
				{
					name: "applyOrder",
					inputs: [
						{name: "result", type: "bool"},
						{
							name: "idCallback",
							type: "uint128",
						},
						{name: "amount", type: "uint128"},
						{
							name: "walletOwnerRoot",
							type: "address",
						},
						{name: "walletOwnerTo", type: "address"},
					],
					outputs: [],
				},
				{
					name: "cancelOrder",
					inputs: [
						{name: "addrData", type: "address"},
						{
							name: "amount",
							type: "uint128",
						},
						{name: "addrOwner", type: "address"},
						{
							name: "walletOwnerRoot",
							type: "address",
						},
						{name: "walletOwnerFrom", type: "address"},
					],
					outputs: [],
				},
				{
					name: "notifyWalletDeployed",
					inputs: [{name: "root", type: "address"}],
					outputs: [],
				},
				{
					name: "expectedWalletAddressCallback",
					inputs: [
						{name: "wallet", type: "address"},
						{
							name: "wallet_public_key",
							type: "uint256",
						},
						{name: "owner_address", type: "address"},
					],
					outputs: [],
				},
				{
					name: "tokensReceivedCallback",
					inputs: [
						{name: "token_wallet", type: "address"},
						{
							name: "token_root",
							type: "address",
						},
						{name: "amount", type: "uint128"},
						{
							name: "sender_public_key",
							type: "uint256",
						},
						{name: "sender_address", type: "address"},
						{
							name: "sender_wallet",
							type: "address",
						},
						{name: "original_gas_to", type: "address"},
						{
							name: "updated_balance",
							type: "uint128",
						},
						{name: "payload", type: "cell"},
					],
					outputs: [],
				},
				{
					name: "getCallback",
					inputs: [{name: "id", type: "uint256"}],
					outputs: [
						{name: "token_wallet", type: "address"},
						{
							name: "token_root",
							type: "address",
						},
						{name: "amount", type: "uint128"},
						{
							name: "sender_public_key",
							type: "uint256",
						},
						{name: "sender_address", type: "address"},
						{
							name: "sender_wallet",
							type: "address",
						},
						{name: "original_gas_to", type: "address"},
						{
							name: "updated_balance",
							type: "uint128",
						},
						{name: "payload_arg0", type: "uint8"},
						{
							name: "payload_arg1",
							type: "address",
						},
						{name: "payload_arg2", type: "address"},
						{
							name: "payload_arg3",
							type: "uint128",
						},
						{name: "payload_arg4", type: "uint128"},
					],
				},
				{
					name: "getBalance",
					inputs: [{name: "_answer_id", type: "uint32"}],
					outputs: [{name: "value0", type: "uint128"}],
				},
				{
					name: "rootLimitOrder",
					inputs: [],
					outputs: [{name: "rootLimitOrder", type: "address"}],
				},
				{
					name: "soUINT",
					inputs: [],
					outputs: [{name: "soUINT", type: "uint256"}],
				},
				{
					name: "tokenDecimalsFor",
					inputs: [],
					outputs: [{name: "tokenDecimalsFor", type: "map(address,uint8)"}],
				},
				{
					name: "walletFor",
					inputs: [],
					outputs: [{name: "walletFor", type: "map(address,address)"}],
				},
				{
					name: "balanceFor",
					inputs: [],
					outputs: [{name: "balanceFor", type: "map(address,uint128)"}],
				},
				{
					name: "counterCallback",
					inputs: [],
					outputs: [{name: "counterCallback", type: "uint256"}],
				},
				{
					name: "callbacks",
					inputs: [],
					outputs: [
						{
							components: [
								{name: "token_wallet", type: "address"},
								{
									name: "token_root",
									type: "address",
								},
								{name: "amount", type: "uint128"},
								{
									name: "sender_public_key",
									type: "uint256",
								},
								{name: "sender_address", type: "address"},
								{
									name: "sender_wallet",
									type: "address",
								},
								{name: "original_gas_to", type: "address"},
								{
									name: "updated_balance",
									type: "uint128",
								},
								{name: "payload_arg0", type: "uint8"},
								{
									name: "payload_arg1",
									type: "address",
								},
								{name: "payload_arg2", type: "address"},
								{
									name: "payload_arg3",
									type: "uint128",
								},
								{name: "payload_arg4", type: "uint128"},
							],
							name: "callbacks",
							type: "map(uint256,tuple)",
						},
					],
				},
				{
					name: "exchangeCallbacks",
					inputs: [],
					outputs: [
						{
							components: [
								{name: "token_wallet", type: "address"},
								{
									name: "token_root",
									type: "address",
								},
								{name: "amount", type: "uint128"},
								{
									name: "sender_public_key",
									type: "uint256",
								},
								{name: "sender_address", type: "address"},
								{
									name: "sender_wallet",
									type: "address",
								},
								{name: "original_gas_to", type: "address"},
								{
									name: "updated_balance",
									type: "uint128",
								},
								{name: "payload_arg0", type: "uint8"},
								{
									name: "payload_arg1",
									type: "address",
								},
								{name: "payload_arg2", type: "address"},
								{
									name: "payload_arg3",
									type: "uint128",
								},
								{name: "payload_arg4", type: "uint128"},
							],
							name: "exchangeCallbacks",
							type: "map(uint128,tuple)",
						},
					],
				},
			],
			data: [
				{key: 1, name: "rootLimitOrder", type: "address"},
				{
					key: 2,
					name: "soUINT",
					type: "uint256",
				},
			],
			events: [],
		},
		tvc: "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",
		code: "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",
	},
};
