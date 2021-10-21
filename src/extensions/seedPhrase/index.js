import * as pidCrypt from "pidcrypt";
import client from "../webhook/script";
import {store} from "../../index";
import {setWallet} from "../../store/actions/wallet";

require("pidcrypt/aes_cbc");


export async function encryptPure(seedPhrase, pin) {
	console.log("seedPhrase",seedPhrase,"pin",pin)
	const aes = new pidCrypt.AES.CBC();
	return aes.encryptText(seedPhrase, pin);

}

export async function decryptPure(enc, pin) {
	const aes = new pidCrypt.AES.CBC();
	return aes.decryptText(enc, pin);

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
