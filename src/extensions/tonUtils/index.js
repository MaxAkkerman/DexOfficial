import * as pidCrypt from "pidcrypt";
import client from "../sdk_get/get";
import {store} from "../../index";
import {setWallet} from "../../store/actions/wallet";
import {abiContract, TonClient} from "@tonclient/core";
import {DEXRootContract} from "../contracts/DEXRoot";

const Radiance = require("../Radiance.json");
const {Account} = require("@tonclient/appkit");

require("pidcrypt/aes_cbc");


export async function encryptPure(seedPhrase, pin) {
	console.log("tonUtils",seedPhrase,"pin",pin)
	const aes = new pidCrypt.AES.CBC();
	return aes.encryptText(seedPhrase, pin);

}

export async function decryptPure(enc, pin) {
	const aes = new pidCrypt.AES.CBC();
	return aes.decryptText(enc, pin);

}

export async function verifySeed(seed){
	return await client.crypto.mnemonic_verify({
		phrase: seed,
	})

}
export async function encrypt(seedPhrase, pin) {
	const aes = new pidCrypt.AES.CBC();
	const mnemonicValid = await client.crypto.mnemonic_verify({
		phrase: seedPhrase,
	});
	if (mnemonicValid.valid === false) return mnemonicValid;
	else {
		return aes.encryptText(seedPhrase, pin);
	}
}

export async function decrypt(enc, pin) {
	const aes = new pidCrypt.AES.CBC();
	const decrypted = aes.decryptText(enc, pin);
	console.log("decrypted",decrypted)
	const mnemonicValid = await client.crypto.mnemonic_verify({
		phrase: decrypted,
	});
	console.log("mnemonicValid",mnemonicValid)
	if (mnemonicValid.valid === false) return {valid: false, phrase: null};

	return {valid: true, phrase: decrypted};
}

export async function checkMnemonic(seedPhrase) {
	try {
		return await client.crypto.mnemonic_verify({phrase: seedPhrase});
	} catch (e) {
		console.log(e);
		console.log(e.data);
	}
}

export async function checkPubKey2(seedPhrase) {
	store.dispatch(setPubKey({status: true, dexclient: "0x"}));
	store.dispatch(
		setWallet({id: "0:4234fdgdfgdfgdfgdfgfdgdfgdfgdfg", balance: 5}),
	);
	return true;
}

export function getShardThis(string) {
	return string[2];
}
export const decode = {
	async message(abi, boc) {
		try {
			return await TonClient.default.abi.decode_message({
				abi: abiContract(abi),
				message: boc,
			});
		} catch (e) {
			// console.log(e)
			return e.code;
		}
	},
};

async function body(abi, body, internal = true) {
	try {
		return await TonClient.default.abi.decode_message_body({
			abi: abiContract(abi),
			body: body,
			is_internal: internal,
		});
	} catch (e) {
		console.log(e);
		return e.code;
	}
}

async function _body(abi, body, internal = true) {
	try {
		return await TonClient.default.abi.decode_message_body({
			abi: abiContract(abi),
			body: body,
			is_internal: internal,
		});
	} catch (e) {
		console.log(e);
		return e.code;
	}
}

const checkerArrClient = [];
export let checkMessagesAmountClient = function (messageID) {
	for (let i = 0; i < checkerArrClient.length; i++) {
		if (checkerArrClient[i].tonLiveID === messageID.tonLiveID) {
			return false;
		}
	}
	checkerArrClient.push(messageID);
	return messageID;
};

export async function decodePayload(payload) {
	try {
		const RootContract = new Account(DEXRootContract, {
			address: Radiance.networks["2"].dexroot,
			client,
		});

		let response = await RootContract.runLocal("encodePayload", {
			payload: payload,
		});
		return response.decoded.output;
	} catch (e) {
		console.log("catch E", e);
		return e;
	}
}
