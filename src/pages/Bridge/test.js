import React, {useState, useEffect} from "react";
import {ethers} from "ethers";
// import VConsole from 'vconsole'
import {BigNumber} from "bignumber.js";
import {initOnboard, initNotify} from "./services";
// import { version, dependencies } from '../package.json'
import avatarPlaceholder from "./avatar-placeholder.png";
import networkEnum from "./networkEnum";

import "./BridgeAssets.css";

// const staging = process.env.REACT_APP_STAGING

// if (window.innerWidth < 700) {
//     new VConsole()
// }

let provider;

const internalTransferABI = [
	{
		inputs: [
			{
				internalType: "address payable",
				name: "to",
				type: "address",
			},
		],
		name: "internalTransfer",
		outputs: [],
		stateMutability: "payable",
		type: "function",
	},
];

const daiABI = [
	{
		anonymous: false,
		inputs: [
			{indexed: true, internalType: "address", name: "owner", type: "address"},
			{
				indexed: true,
				internalType: "address",
				name: "spender",
				type: "address",
			},
			{indexed: false, internalType: "uint256", name: "value", type: "uint256"},
		],
		name: "Approval",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "previousOwner",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "newOwner",
				type: "address",
			},
		],
		name: "OwnershipTransferred",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{indexed: true, internalType: "address", name: "from", type: "address"},
			{indexed: true, internalType: "address", name: "to", type: "address"},
			{indexed: false, internalType: "uint256", name: "value", type: "uint256"},
		],
		name: "Transfer",
		type: "event",
	},
	{
		constant: true,
		inputs: [],
		name: "_decimals",
		outputs: [{internalType: "uint8", name: "", type: "uint8"}],
		payable: false,
		stateMutability: "view",
		type: "function",
	},
	{
		constant: true,
		inputs: [],
		name: "_name",
		outputs: [{internalType: "string", name: "", type: "string"}],
		payable: false,
		stateMutability: "view",
		type: "function",
	},
	{
		constant: true,
		inputs: [],
		name: "_symbol",
		outputs: [{internalType: "string", name: "", type: "string"}],
		payable: false,
		stateMutability: "view",
		type: "function",
	},
	{
		constant: true,
		inputs: [
			{internalType: "address", name: "owner", type: "address"},
			{internalType: "address", name: "spender", type: "address"},
		],
		name: "allowance",
		outputs: [{internalType: "uint256", name: "", type: "uint256"}],
		payable: false,
		stateMutability: "view",
		type: "function",
	},
	{
		constant: false,
		inputs: [
			{internalType: "address", name: "spender", type: "address"},
			{internalType: "uint256", name: "amount", type: "uint256"},
		],
		name: "approve",
		outputs: [{internalType: "bool", name: "", type: "bool"}],
		payable: false,
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		constant: true,
		inputs: [{internalType: "address", name: "account", type: "address"}],
		name: "balanceOf",
		outputs: [{internalType: "uint256", name: "", type: "uint256"}],
		payable: false,
		stateMutability: "view",
		type: "function",
	},
	{
		constant: false,
		inputs: [{internalType: "uint256", name: "amount", type: "uint256"}],
		name: "burn",
		outputs: [{internalType: "bool", name: "", type: "bool"}],
		payable: false,
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		constant: true,
		inputs: [],
		name: "decimals",
		outputs: [{internalType: "uint8", name: "", type: "uint8"}],
		payable: false,
		stateMutability: "view",
		type: "function",
	},
	{
		constant: false,
		inputs: [
			{internalType: "address", name: "spender", type: "address"},
			{internalType: "uint256", name: "subtractedValue", type: "uint256"},
		],
		name: "decreaseAllowance",
		outputs: [{internalType: "bool", name: "", type: "bool"}],
		payable: false,
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		constant: true,
		inputs: [],
		name: "getOwner",
		outputs: [{internalType: "address", name: "", type: "address"}],
		payable: false,
		stateMutability: "view",
		type: "function",
	},
	{
		constant: false,
		inputs: [
			{internalType: "address", name: "spender", type: "address"},
			{internalType: "uint256", name: "addedValue", type: "uint256"},
		],
		name: "increaseAllowance",
		outputs: [{internalType: "bool", name: "", type: "bool"}],
		payable: false,
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		constant: false,
		inputs: [{internalType: "uint256", name: "amount", type: "uint256"}],
		name: "mint",
		outputs: [{internalType: "bool", name: "", type: "bool"}],
		payable: false,
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		constant: true,
		inputs: [],
		name: "name",
		outputs: [{internalType: "string", name: "", type: "string"}],
		payable: false,
		stateMutability: "view",
		type: "function",
	},
	{
		constant: true,
		inputs: [],
		name: "owner",
		outputs: [{internalType: "address", name: "", type: "address"}],
		payable: false,
		stateMutability: "view",
		type: "function",
	},
	{
		constant: false,
		inputs: [],
		name: "renounceOwnership",
		outputs: [],
		payable: false,
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		constant: true,
		inputs: [],
		name: "symbol",
		outputs: [{internalType: "string", name: "", type: "string"}],
		payable: false,
		stateMutability: "view",
		type: "function",
	},
	{
		constant: true,
		inputs: [],
		name: "totalSupply",
		outputs: [{internalType: "uint256", name: "", type: "uint256"}],
		payable: false,
		stateMutability: "view",
		type: "function",
	},
	{
		constant: false,
		inputs: [
			{internalType: "address", name: "recipient", type: "address"},
			{internalType: "uint256", name: "amount", type: "uint256"},
		],
		name: "transfer",
		outputs: [{internalType: "bool", name: "", type: "bool"}],
		payable: false,
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		constant: false,
		inputs: [
			{internalType: "address", name: "sender", type: "address"},
			{internalType: "address", name: "recipient", type: "address"},
			{internalType: "uint256", name: "amount", type: "uint256"},
		],
		name: "transferFrom",
		outputs: [{internalType: "bool", name: "", type: "bool"}],
		payable: false,
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		constant: false,
		inputs: [{internalType: "address", name: "newOwner", type: "address"}],
		name: "transferOwnership",
		outputs: [],
		payable: false,
		stateMutability: "nonpayable",
		type: "function",
	},
];

const daiVaultABI = [
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint128",
				name: "amount",
				type: "uint128",
			},
			{
				indexed: false,
				internalType: "int8",
				name: "wid",
				type: "int8",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "user",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "creditor",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "recipient",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint128",
				name: "tokenAmount",
				type: "uint128",
			},
			{
				indexed: false,
				internalType: "uint128",
				name: "tonAmount",
				type: "uint128",
			},
			{
				indexed: false,
				internalType: "uint8",
				name: "swapType",
				type: "uint8",
			},
			{
				indexed: false,
				internalType: "uint128",
				name: "slippageNumerator",
				type: "uint128",
			},
			{
				indexed: false,
				internalType: "uint128",
				name: "slippageDenominator",
				type: "uint128",
			},
			{
				indexed: false,
				internalType: "bytes1",
				name: "separator",
				type: "bytes1",
			},
			{
				indexed: false,
				internalType: "bytes",
				name: "level3",
				type: "bytes",
			},
		],
		name: "FactoryDeposit",
		type: "event",
	},
	{
		inputs: [],
		name: "apiVersion",
		outputs: [
			{
				internalType: "string",
				name: "api_version",
				type: "string",
			},
		],
		stateMutability: "pure",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "bytes",
				name: "payload",
				type: "bytes",
			},
		],
		name: "decodeWithdrawEventData",
		outputs: [
			{
				internalType: "int8",
				name: "sender_wid",
				type: "int8",
			},
			{
				internalType: "uint256",
				name: "sender_addr",
				type: "uint256",
			},
			{
				internalType: "uint128",
				name: "amount",
				type: "uint128",
			},
			{
				internalType: "uint160",
				name: "_recipient",
				type: "uint160",
			},
			{
				internalType: "uint32",
				name: "chainId",
				type: "uint32",
			},
		],
		stateMutability: "pure",
		type: "function",
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "int128",
						name: "wid",
						type: "int128",
					},
					{
						internalType: "uint256",
						name: "addr",
						type: "uint256",
					},
				],
				internalType: "struct IVault.TONAddress",
				name: "recipient",
				type: "tuple",
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
		],
		name: "deposit",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint128",
				name: "amount",
				type: "uint128",
			},
			{
				internalType: "int8",
				name: "wid",
				type: "int8",
			},
			{
				internalType: "uint256",
				name: "user",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "creditor",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "recipient",
				type: "uint256",
			},
			{
				internalType: "uint128",
				name: "tokenAmount",
				type: "uint128",
			},
			{
				internalType: "uint128",
				name: "tonAmount",
				type: "uint128",
			},
			{
				internalType: "uint8",
				name: "swapType",
				type: "uint8",
			},
			{
				internalType: "uint128",
				name: "slippageNumerator",
				type: "uint128",
			},
			{
				internalType: "uint128",
				name: "slippageDenominator",
				type: "uint128",
			},
			{
				internalType: "bytes",
				name: "level3",
				type: "bytes",
			},
		],
		name: "depositToFactory",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "int128",
						name: "wid",
						type: "int128",
					},
					{
						internalType: "uint256",
						name: "addr",
						type: "uint256",
					},
				],
				internalType: "struct IVault.TONAddress",
				name: "recipient",
				type: "tuple",
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
			{
				components: [
					{
						internalType: "address",
						name: "recipient",
						type: "address",
					},
					{
						internalType: "uint256",
						name: "id",
						type: "uint256",
					},
				],
				internalType: "struct IVault.PendingWithdrawalId[]",
				name: "pendingWithdrawalsIdsToFill",
				type: "tuple[]",
			},
		],
		name: "depositWithFillings",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "getChainID",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_vault",
				type: "address",
			},
		],
		name: "initialize",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "bytes",
				name: "payload",
				type: "bytes",
			},
			{
				internalType: "bytes[]",
				name: "signatures",
				type: "bytes[]",
			},
			{
				internalType: "uint256",
				name: "bounty",
				type: "uint256",
			},
		],
		name: "saveWithdraw",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "vault",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
];

let internalTransferContract;
let daiContract;
let daiVaultContract;

const daiVaultWrapperAddress = "0xdE62EE1014E1ae5f37D27Ee20BcE7Ae0B3FfD0CD";
const daiVaultAddress = "0xe05052a189771888c4a1202ceec3be57c5efe891";
const daiBEP20Address = "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3";
const daiDecimals = 18;

const BridgeAssets = () => {
	const [address, setAddress] = useState(null);
	const [ens, setEns] = useState(null);
	const [network, setNetwork] = useState(null);
	const [balance, setBalance] = useState(null);
	const [wallet, setWallet] = useState({});

	const [onboard, setOnboard] = useState(null);
	const [notify, setNotify] = useState(null);

	const [darkMode, setDarkMode] = useState(false);
	const [desktopPosition, setDesktopPosition] = useState("bottomRight");
	const [mobilePosition, setMobilePosition] = useState("top");

	const [toAddress, setToAddress] = useState("");
	const [approveValue, setApproveValue] = useState("");

	useEffect(() => {
		const onboard = initOnboard({
			address: setAddress,
			ens: setEns,
			network: setNetwork,
			balance: setBalance,
			wallet: (wallet) => {
				if (wallet.provider) {
					setWallet(wallet);

					provider = new ethers.providers.Web3Provider(wallet.provider, "any");

					internalTransferContract = new ethers.Contract(
						"0xb8c12850827ded46b9ded8c1b6373da0c4d60370",
						internalTransferABI,
						provider.getUncheckedSigner(),
					);

					daiContract = new ethers.Contract(
						daiBEP20Address,
						daiABI,
						provider.getUncheckedSigner(),
					);

					daiVaultContract = new ethers.Contract(
						daiVaultWrapperAddress,
						daiVaultABI,
						provider.getUncheckedSigner(),
					);

					window.localStorage.setItem("selectedWallet", wallet.name);
				} else {
					provider = null;
					setWallet({});
				}
			},
		});

		setOnboard(onboard);

		setNotify(initNotify());
	}, []);

	useEffect(() => {
		const previouslySelectedWallet =
			window.localStorage.getItem("selectedWallet");

		if (previouslySelectedWallet && onboard) {
			onboard.walletSelect(previouslySelectedWallet);
		}
	}, [onboard]);

	const readyToTransact = async () => {
		if (!provider) {
			const walletSelected = await onboard.walletSelect();
			if (!walletSelected) return false;
		}

		const ready = await onboard.walletCheck();
		return ready;
	};

	const sendHash = async () => {
		if (!toAddress) {
			alert("An Ethereum address to send Eth to is required.");
			return;
		}

		const signer = provider.getUncheckedSigner();

		const {hash} = await signer.sendTransaction({
			to: toAddress,
			value: 1000000000000000,
		});

		const {emitter} = notify.hash(hash);

		emitter.on("txPool", (transaction) => {
			return {
				// message: `Your transaction is pending, click <a href="https://rinkeby.etherscan.io/tx/${transaction.hash}" rel="noopener noreferrer" target="_blank">here</a> for more info.`,
				// or you could use onclick for when someone clicks on the notification itself
				onclick: () =>
					window.open(`https://rinkeby.etherscan.io/tx/${transaction.hash}`),
			};
		});

		emitter.on("txSent", console.log);
		emitter.on("txConfirmed", console.log);
		emitter.on("txSpeedUp", console.log);
		emitter.on("txCancel", console.log);
		emitter.on("txFailed", console.log);
	};

	const sendInternalTransaction = async () => {
		if (!toAddress) {
			alert("An Ethereum address to send Eth to is required.");
			return;
		}

		const {hash} = await internalTransferContract.internalTransfer(toAddress, {
			value: 1000000000000000,
		});

		const {emitter} = notify.hash(hash);

		emitter.on("txSent", console.log);
		emitter.on("txPool", console.log);
		emitter.on("txConfirmed", console.log);
		emitter.on("txSpeedUp", console.log);
		emitter.on("txCancel", console.log);
		emitter.on("txFailed", console.log);
	};

	const approveForWrapper = async () => {
		if (!approveValue) {
			alert("value to approve is required.");
			return;
		}

		let av = new BigNumber(approveValue).shiftedBy(daiDecimals).toFixed();
		console.log("approveValue: ", av);

		const {hash} = await daiContract.approve(daiVaultAddress, av, {
			value: 0,
		});

		const {emitter} = notify.hash(hash);

		emitter.on("txSent", console.log);
		emitter.on("txPool", console.log);
		emitter.on("txConfirmed", console.log);
		emitter.on("txSpeedUp", console.log);
		emitter.on("txCancel", console.log);
		emitter.on("txFailed", console.log);
	};

	const depositToVault = async () => {
		if (!approveValue) {
			alert("value to approve is required.");
			return;
		}

		let av = new BigNumber(approveValue).shiftedBy(daiDecimals).toFixed();
		console.log("approveValue: ", av);

		// if (!toAddress) {
		//   alert('An Ethereum address to send Eth to is required.')
		//   return
		// }
		//
		// const { hash } = await internalTransferContract.internalTransfer(
		//   toAddress,
		//   {
		//     value: av
		//   }
		// )

		const {hash} = await daiVaultContract.depositToFactory(
			av,
			0,
			// DEXClient Addr for TON from Bridge
			"0xe6cd868e34a0558171483682b2dcbb19f0cc1ba8c13aef97c8c2c862b93d2094",
			"0x48b1daf7ff5c10ec590628e65702dcd01d947b36660a6348e5360f92c8b7bae5",
			// owber of income TIP3 wallet is DEXConnecror Addr from current DEXCLient. For token income from Bridge
			"0xe874c56af67b0c362ff8ac90912bae3bb137f693f84b3fa99056f081279c6246",
			0,
			0,
			0,
			5,
			100,
			"0x0000",
			{
				value: 0,
			},
		);

		const {emitter} = notify.hash(hash);

		emitter.on("txSent", console.log);
		emitter.on("txPool", console.log);
		emitter.on("txConfirmed", console.log);
		emitter.on("txSpeedUp", console.log);
		emitter.on("txCancel", console.log);
		emitter.on("txFailed", console.log);
	};

	const sendTransaction = async () => {
		if (!toAddress) {
			alert("An Ethereum address to send Eth to is required.");
		}

		const signer = provider.getUncheckedSigner();

		const txDetails = {
			to: toAddress,
			value: 1000000000000000,
		};

		const sendTransaction = () => {
			return signer.sendTransaction(txDetails).then((tx) => tx.hash);
		};

		const gasPrice = () => provider.getGasPrice().then((res) => res.toString());

		const estimateGas = () => {
			return provider.estimateGas(txDetails).then((res) => res.toString());
		};

		const {emitter} = await notify.transaction({
			sendTransaction,
			gasPrice,
			estimateGas,
			balance: onboard.getState().balance,
			txDetails,
		});

		emitter.on("txRequest", console.log);
		emitter.on("nsfFail", console.log);
		emitter.on("txRepeat", console.log);
		emitter.on("txAwaitingApproval", console.log);
		emitter.on("txConfirmReminder", console.log);
		emitter.on("txSendFail", console.log);
		emitter.on("txError", console.log);
		emitter.on("txUnderPriced", console.log);
		emitter.on("txSent", console.log);
		emitter.on("txPool", console.log);
		emitter.on("txConfirmed", console.log);
		emitter.on("txSpeedUp", console.log);
		emitter.on("txCancel", console.log);
		emitter.on("txFailed", console.log);
	};

	if (!onboard || !notify) return <div>Loading...</div>;

	return (
		<div>
			<header className="user-info">
				{ens && ens.name ? (
					<span>
						<img
							className="user-avatar"
							src={ens.avatar ? ens.avatar : avatarPlaceholder}
							alt="avatar"
						></img>
						<div
							style={{
								marginLeft: "10px",
							}}
						>
							{ens.name}
						</div>
					</span>
				) : (
					address && <span>{address}</span>
				)}
				{balance != null && (
					<span>
						{Number(balance) > 0 ? balance / 1000000000000000000 : balance} ETH
					</span>
				)}
				{network && (
					<span>{networkEnum?.[Number(network)] || "local"} Network</span>
				)}
			</header>
			<section className="main">
				<div className="main-content">
					<div className="vertical-main-container">
						<div className="container onboard">
							<h2>Onboarding Users with Onboard</h2>
							<div>
								{!wallet.provider && (
									<button
										className="bn-demo-button"
										onClick={() => {
											onboard.walletSelect();
										}}
									>
										Select a Wallet
									</button>
								)}

								{wallet.provider && (
									<button
										className="bn-demo-button"
										onClick={onboard.walletCheck}
									>
										Wallet Checks
									</button>
								)}

								{wallet.provider && (
									<button
										className="bn-demo-button"
										onClick={onboard.walletSelect}
									>
										Switch Wallets
									</button>
								)}

								{wallet.provider && (
									<button
										className="bn-demo-button"
										onClick={onboard.walletReset}
									>
										Reset Wallet State
									</button>
								)}
								{wallet.provider && wallet.dashboard && (
									<button className="bn-demo-button" onClick={wallet.dashboard}>
										Open Wallet Dashboard
									</button>
								)}
								{wallet.provider && wallet.type === "hardware" && address && (
									<button
										className="bn-demo-button"
										onClick={onboard.accountSelect}
									>
										Switch Account
									</button>
								)}
							</div>
						</div>
						<div className="container notify">
							<h2>Transaction Notifications with Notify</h2>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									alignItems: "flex-start",
									marginBottom: "1rem",
								}}
							>
								<div style={{marginBottom: "1rem"}}>
									<label>Send 0.001 Rinkeby Eth to:</label>
									<input
										type="text"
										style={{
											padding: "0.5rem",
											border: "none",
											borderRadius: "10px",
											marginLeft: "0.5rem",
											width: "18rem",
										}}
										value={toAddress}
										placeholder="address"
										onChange={(e) => setToAddress(e.target.value)}
									/>
								</div>

								<div>
									<button
										className="bn-demo-button"
										onClick={async () => {
											const ready = await readyToTransact();
											if (!ready) return;
											sendHash();
										}}
									>
										Send
									</button>
									with in-flight notifications
								</div>
								<div>
									<button
										className="bn-demo-button"
										onClick={async () => {
											const ready = await readyToTransact();
											if (!ready) return;
											sendTransaction();
										}}
									>
										Send
									</button>
									with pre-flight and in-flight notifications
								</div>
								<div>
									<button
										className="bn-demo-button"
										onClick={async () => {
											const ready = await readyToTransact();
											if (!ready) return;
											sendInternalTransaction();
										}}
									>
										Send
									</button>
									via a internal transaction
								</div>
							</div>
							<h2>Approve my DAI to DAI vault with Notify</h2>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									alignItems: "flex-start",
									marginBottom: "1rem",
								}}
							>
								<div style={{marginBottom: "1rem"}}>
									<label>Approve value:</label>
									<input
										type="text"
										style={{
											padding: "0.5rem",
											border: "none",
											borderRadius: "10px",
											marginLeft: "0.5rem",
											width: "18rem",
										}}
										value={approveValue}
										placeholder="qty"
										onChange={(e) => setApproveValue(e.target.value)}
									/>
								</div>
								<div>
									<button
										className="bn-demo-button"
										onClick={async () => {
											const ready = await readyToTransact();
											if (!ready) return;
											approveForWrapper();
										}}
									>
										Send
									</button>
									transaction for approve
								</div>
								<div>
									<button
										className="bn-demo-button"
										onClick={async () => {
											const ready = await readyToTransact();
											if (!ready) return;
											depositToVault();
										}}
									>
										Send
									</button>
									transaction for deposit to vault
								</div>
							</div>

							<div>
								<button
									className="bn-demo-button"
									onClick={async () => {
										if (!address) {
											await readyToTransact();
										}

										address && notify.account(address);
									}}
								>
									Watch Current Account
								</button>
								<button
									className="bn-demo-button"
									onClick={async () => {
										if (!address) {
											await readyToTransact();
										}

										address && notify.unsubscribe(address);
									}}
								>
									Un-watch Current Account
								</button>
								<button
									className="bn-demo-button"
									onClick={() => {
										const {update} = notify.notification({
											eventCode: "dbUpdate",
											type: "pending",
											message:
												"This is a custom notification triggered by the dapp",
										});
										setTimeout(
											() =>
												update({
													eventCode: "dbUpdateSuccess",
													message: "Updated status for custom notification",
													type: "success",
												}),
											4000,
										);
									}}
								>
									Custom Notification
								</button>
							</div>
						</div>
					</div>
					{/*<div className="container">*/}
					{/*    <h3>UI Settings</h3>*/}
					{/*    <button*/}
					{/*        className={`bn-demo-button ${*/}
					{/*            darkMode ? 'selected-toggle-btn' : 'unselected-toggle-btn'*/}
					{/*        }`}*/}
					{/*        onClick={() => {*/}
					{/*            setDarkMode(true)*/}
					{/*            notify.config({ darkMode: true })*/}
					{/*            onboard.config({ darkMode: true })*/}
					{/*        }}*/}
					{/*    >*/}
					{/*        Dark Mode*/}
					{/*    </button>*/}
					{/*    <button*/}
					{/*        className={`bn-demo-button ${*/}
					{/*            !darkMode ? 'selected-toggle-btn' : 'unselected-toggle-btn'*/}
					{/*        }`}*/}
					{/*        onClick={() => {*/}
					{/*            setDarkMode(false)*/}
					{/*            notify.config({ darkMode: false })*/}
					{/*            onboard.config({ darkMode: false })*/}
					{/*        }}*/}
					{/*    >*/}
					{/*        Light Mode*/}
					{/*    </button>*/}
					{/*    <h3>Desktop Positioning</h3>*/}
					{/*    <button*/}
					{/*        className={`bn-demo-button ${*/}
					{/*            desktopPosition === 'topLeft'*/}
					{/*                ? 'selected-toggle-btn'*/}
					{/*                : 'unselected-toggle-btn'*/}
					{/*        }`}*/}
					{/*        onClick={() => {*/}
					{/*            setDesktopPosition('topLeft')*/}
					{/*            notify.config({ desktopPosition: 'topLeft' })*/}
					{/*        }}*/}
					{/*    >*/}
					{/*        Top Left*/}
					{/*    </button>*/}
					{/*    <button*/}
					{/*        className={`bn-demo-button ${*/}
					{/*            desktopPosition === 'topRight'*/}
					{/*                ? 'selected-toggle-btn'*/}
					{/*                : 'unselected-toggle-btn'*/}
					{/*        }`}*/}
					{/*        onClick={() => {*/}
					{/*            setDesktopPosition('topRight')*/}
					{/*            notify.config({ desktopPosition: 'topRight' })*/}
					{/*        }}*/}
					{/*    >*/}
					{/*        Top Right*/}
					{/*    </button>*/}
					{/*    <button*/}
					{/*        className={`bn-demo-button ${*/}
					{/*            desktopPosition === 'bottomRight'*/}
					{/*                ? 'selected-toggle-btn'*/}
					{/*                : 'unselected-toggle-btn'*/}
					{/*        }`}*/}
					{/*        onClick={() => {*/}
					{/*            setDesktopPosition('bottomRight')*/}
					{/*            notify.config({ desktopPosition: 'bottomRight' })*/}
					{/*        }}*/}
					{/*    >*/}
					{/*        Bottom Right*/}
					{/*    </button>*/}
					{/*    <button*/}
					{/*        className={`bn-demo-button ${*/}
					{/*            desktopPosition === 'bottomLeft'*/}
					{/*                ? 'selected-toggle-btn'*/}
					{/*                : 'unselected-toggle-btn'*/}
					{/*        }`}*/}
					{/*        onClick={() => {*/}
					{/*            setDesktopPosition('bottomLeft')*/}
					{/*            notify.config({ desktopPosition: 'bottomLeft' })*/}
					{/*        }}*/}
					{/*    >*/}
					{/*        Bottom Left*/}
					{/*    </button>*/}
					{/*    <h3>Mobile Positioning</h3>*/}
					{/*    <button*/}
					{/*        className={`bn-demo-button ${*/}
					{/*            mobilePosition === 'top'*/}
					{/*                ? 'selected-toggle-btn'*/}
					{/*                : 'unselected-toggle-btn'*/}
					{/*        }`}*/}
					{/*        onClick={() => {*/}
					{/*            setMobilePosition('top')*/}
					{/*            notify.config({ mobilePosition: 'top' })*/}
					{/*        }}*/}
					{/*    >*/}
					{/*        Top*/}
					{/*    </button>*/}
					{/*    <button*/}
					{/*        className={`bn-demo-button ${*/}
					{/*            mobilePosition === 'bottom'*/}
					{/*                ? 'selected-toggle-btn'*/}
					{/*                : 'unselected-toggle-btn'*/}
					{/*        }`}*/}
					{/*        onClick={() => {*/}
					{/*            setMobilePosition('bottom')*/}
					{/*            notify.config({ mobilePosition: 'bottom' })*/}
					{/*        }}*/}
					{/*    >*/}
					{/*        Bottom*/}
					{/*    </button>*/}
					{/*</div>*/}
				</div>
			</section>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					position: "fixed",
					bottom: "1rem",
					left: "1rem",
					color: "#716c6c",
				}}
			>
				{/*<span>*/}
				{/*  React Demo version: <i>{staging ? 'NEXT' : version}</i>*/}
				{/*</span>*/}
				{/*        <span>*/}
				{/*  Onboard version:{' '}*/}
				{/*            <i>{staging ? 'NEXT' : dependencies['bnc-onboard'].slice(1)}</i>*/}
				{/*</span>*/}
				{/*        <span>*/}
				{/*  Notify version:{' '}*/}
				{/*            <i>{staging ? 'NEXT' : dependencies['bnc-notify'].slice(1)}</i>*/}
				{/*</span>*/}
			</div>
		</div>
	);
};

export default BridgeAssets;
