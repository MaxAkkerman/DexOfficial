import wETH from "../images/tokens/wETH.svg";
import TON from "../images/tokens/TON.svg";
import wBTC from "../images/tokens/wBTC.svg";

export const marks = [
	{
		value: 6,
		label: "6m",
		rate: 8,
	},
	{
		value: 9,
		// label: '9m',
		rate: 9.29,
	},
	{
		value: 12,
		label: "12m",
		rate: 10.57,
	},
	{
		value: 15,
		// label: '15m',
		rate: 11.86,
	},
	{
		value: 18,
		label: "18m",
		rate: 13.14,
	},
	{
		value: 21,
		// label: '21m',
		rate: 14.43,
	},
	{
		value: 24,
		label: "24m",
		rate: 15.71,
	},
	{
		value: 27,
		// label: '27m',
		rate: 17,
	},
	{
		value: 30,
		label: "30m",
		rate: 18.29,
	},
	{
		value: 33,
		// label: '33m',
		rate: 19.57,
	},
	{
		value: 36,
		label: "36m",
		rate: 20.86,
	},
	{
		value: 39,
		// label: '39m',
		rate: 22.14,
	},
	{
		value: 42,
		label: "42m",
		rate: 23.43,
	},
	{
		value: 45,
		// label: '45m',
		rate: 24.71,
	},
	{
		value: 48,
		label: "48m",
		rate: 26,
	},
];

export const programs = [
	{
		name: "On demand",
		period: 1 / 30,
		apy: 6,
		id: 0,
		info: "Daily",
		disabledBtn: false,
		status: "Calculate",
	},
	{
		name: "Medium term",
		period: 12,
		apy: 10.57,
		id: 1,
		info: "12 months",
		disabledBtn: true,
		status: "Coming soon",
	},
	{
		name: "Long term",
		period: 48,
		apy: 26,
		id: 2,
		info: "48 months",
		disabledBtn: true,
		status: "Coming soon",
	},
];

export const assetstestArray = [
	{
		tokenName: "Ethereum",
		balance: "1002",
		tokenSymbol: "ETH",
		icon: wETH,
		address:
			"0:4594ac781bdcdee350c9c8c25dfaf08d067b1214fa86c687f4deca048a76551f",
	},
	{
		tokenName: "TON Crystal",
		balance: "1052",
		tokenSymbol: "TON",
		icon: TON,
		address:
			"0:4594ac781bdcdee350c9c8c25dfaf08d067b1214fa86c687f4deca048a76551f",
	},
	{
		tokenName: "Bitcoin",
		balance: "102",
		tokenSymbol: "BTC",
		icon: wBTC,
		address:
			"0:4594ac781bdcdee350c9c8c25dfaf08d067b1214fa86c687f4deca048a76551f",
	},
];

export const pincodeArray = [
	{
		id: 0,
		focused: true,
		value: "",
		error: false,
	},
	{
		id: 1,
		focused: false,
		value: "",
		error: false,
	},
	{
		id: 2,
		focused: false,
		value: "",
		error: false,
	},
	{
		id: 3,
		focused: false,
		value: "",
		error: false,
	},
];
export const numPadArr = [
	{
		value: 1,
	},
	{
		value: 2,
	},
	{
		value: 3,
	},
	{
		value: 4,
	},
	{
		value: 5,
	},
	{
		value: 6,
	},
	{
		value: 7,
	},
	{
		value: 8,
	},
	{
		value: 9,
	},
	{
		value: 10,
		disabled: true,
	},
	{
		value: 0,
	},
	{
		value: 12,
		disabled: true,
	},
];
export const InitialSeedState = [
	{id: 0, label: "Word 1", seed: "", onSeedError: true},
	{id: 1, label: "Word 2", seed: "", onSeedError: true},
	{id: 2, label: "Word 3", seed: "", onSeedError: true},
	{id: 3, label: "Word 4", seed: "", onSeedError: true},
	{id: 4, label: "Word 5", seed: "", onSeedError: true},
	{id: 5, label: "Word 6", seed: "", onSeedError: true},
	{id: 6, label: "Word 7", seed: "", onSeedError: true},
	{id: 7, label: "Word 8", seed: "", onSeedError: true},
	{id: 8, label: "Word 9", seed: "", onSeedError: true},
	{id: 9, label: "Word 10", seed: "", onSeedError: true},
	{id: 10, label: "Word 11", seed: "", onSeedError: true},
	{id: 11, label: "Word 12", seed: "", onSeedError: true},
];

export const onlyNums = /^[0-9\b]+$/;
