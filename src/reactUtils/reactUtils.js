import {setClientData, setPairsList, setSubscribeReceiveTokens, setTransactionsList} from "../store/actions/wallet";
import {store} from "../index";
import {
    checkClientPairExists, checkPubKey,
    checkwalletExists,
    getAllPairsWoithoutProvider, getClientBalance, getClientKeys,
    subscribe, subscribeClient, subscribeClientBalance,
} from "../extensions/webhook/script";
import {setCurExt, setTips, setWalletIsConnected} from "../store/actions/app";
import {getWalletExt} from "../extensions/extensions/checkExtensions";
import {
    enterSeedPhraseSaveToLocalStorage,
    setSeedPassword, showEnterSeedPhrase,
    wordEightEnterSeedPhrase, wordElevenEnterSeedPhrase,
    wordFiveEnterSeedPhrase,
    wordFourEnterSeedPhrase, wordNineEnterSeedPhrase,
    wordOneEnterSeedPhrase, wordSevenEnterSeedPhrase, wordSixEnterSeedPhrase, wordTenEnterSeedPhrase,
    wordThreeEnterSeedPhrase, wordTwelveEnterSeedPhrase,
    wordTwoEnterSeedPhrase
} from "../store/actions/enterSeedPhrase";
import {encrypt} from "../extensions/seedPhrase";

const {setLiquidityList} = require("../store/actions/wallet");
const {setTokenList} = require("../store/actions/wallet");
const {getAllClientWallets} = require("../extensions/webhook/script");


export async function InitializeClient(clientPubKey) {
    let clientStatus = await checkPubKey(clientPubKey);
    if (clientStatus.status) {
        const dexClientAddress = clientStatus.dexclient;
        const dexClientStatus = clientStatus.status;
        const dexClientBalance = await getClientBalance(dexClientAddress);
        store.dispatch(
            setClientData({
                status: dexClientStatus,
                dexclient: dexClientAddress,
                balance: dexClientBalance,
				public:clientPubKey
            }),
        );

        const extensionWallet = await getWalletExt(
            dexClientAddress,
            clientPubKey,
        );

        store.dispatch(setCurExt(extensionWallet[0]));

        store.dispatch(setTransactionsList([]));
        store.dispatch(setSubscribeReceiveTokens([]));


        subscribeClient(dexClientAddress);
        subscribeClientBalance(dexClientAddress);
        // subscribeClientBalanceForTips(dexClientAddress)
        await getAllPairsAndSetToStore(dexClientAddress);
        await getAllTokensAndSetToStore(dexClientAddress);
        store.dispatch(setWalletIsConnected(true));


    }
    return true
}

export async function getAllTokensAndSetToStore(clientAddress) {
    let tokenList = await getAllClientWallets(clientAddress);
    let liquidityList = [];
    if (tokenList.length) {
        tokenList.forEach(async (item) => await subscribe(item.walletAddress));
        liquidityList = tokenList.filter((i) => i.symbol.includes("/"));
        tokenList = tokenList.filter((i) => !i.symbol.includes("/"));
        store.dispatch(setTokenList(tokenList));
        store.dispatch(setLiquidityList(liquidityList));
    }
}

const hex = require('ascii-hex');

export async function getAllPairsAndSetToStore(clientAddress) {
    const pairs = await getAllPairsWoithoutProvider();

    let arrPairs = [];


    await pairs.map(async (item) => {
        item.exists = await checkClientPairExists(clientAddress, item.pairAddress);
        item.walletExists = await checkwalletExists(
            clientAddress,
            item.pairAddress,
        );

        arrPairs.push(item);
    });

    store.dispatch(setPairsList(arrPairs));
}

export function copyToClipboard(textToCopy) {
    // navigator clipboard api needs a secure context (https)

    if (navigator.clipboard && window.isSecureContext) {
        // navigator clipboard api method'
        store.dispatch(
            setTips({
                message: `Copied`,
                type: "info",
                transNotSave: true,
            }),
        );
        return navigator.clipboard.writeText(textToCopy);
    } else {
        store.dispatch(
            setTips({
                message: `Copied`,
                type: "info",
                transNotSave: true,
            }),
        );
        // text area method
        let textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        // make the textarea out of viewport
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise((res, rej) => {
            // here the magic happens
            document.execCommand("copy") ? res() : rej();
            textArea.remove();
        });
    }
}

export function calculateRate(stake, percent, period) {
    const years = period / 12;
    console.log("stake", stake, "percent", percent, "years", years);
    const totalProfit = stake * Math.pow(1 + percent / 100, years);
    return totalProfit;
}

export function getDecimals(decimals) {
    let x = "1";
    let decimalsNum = Number(decimals);
    for (let i = 0; i < decimalsNum; i++) {
        x += "0";
    }
    return Number(x);
}

export function getFixedNums(dec, amount) {
    if (dec === 9) {
        return amount
    } else if (dec < 9) {
        let x = 1;
        for (let i = 0; i < 9 - dec; i++) {
            x *= 10;
        }
        return amount * x;
    } else if (dec > 9) {
        let x = 1;
        for (let i = 0; i < dec - 9; i++) {
            x *= 10;
        }
        return amount / x;
    }


}

export function hex2a(hex) {
    let str = "";
    for (let i = 0; i < hex.length; i += 2) {
        let v = parseInt(hex.substr(i, 2), 16);
        if (v) str += String.fromCharCode(v);
    }
    return str;
}

export function getRootSymbol(symbolA, symbolB) {
    let upA = symbolA.toUpperCase()
    let upB = symbolB.toUpperCase()
    return `DS-${upA}/${upB}`
}

// export function toBytes(str) {
// 	var bytes = [];
// 	for(var i = 0; i < str.length; i++) {
// 		var char = str.charCodeAt(i);
// 		bytes.push(char >>> 8);
// 		bytes.push(char & 0xFF);
// 	}
// 	return bytes;
// }
Number.prototype.noExponents = function() {
    var data = String(this).split(/[eE]/);
    if (data.length == 1) return data[0];

    var z = '',
        sign = this < 0 ? '-' : '',
        str = data[0].replace('.', ''),
        mag = Number(data[1]) + 1;

    if (mag < 0) {
        z = sign + '0.';
        while (mag++) z += '0';
        return z + str.replace(/^\-/, '');
    }
    mag -= str.length;
    while (mag--) z += '0';
    return str + z;
}
export function toHex(input) {
    let output = '';
    for (let i = 0; i < input.length; i++) {
        output += hex(input[i]).toString(16)
    }
    return String(output);
}

export function getFraction(num) {
    console.log("nuuum",num)
    let numStr = num.toString()
    let shouldBeFact = numStr.match(/0.0/)
    const ar = Array.from(numStr)
    console.log(shouldBeFact)
    if (!shouldBeFact) return num
    console.log("numStr", numStr)
    let regNumsSub = numStr.match(/[^0]{4}/)

    let regNumsZeros = numStr.match(/^.*0/)
    const newNum = []
    for(let i = 0; i< ar.length; i++){
        if(regNumsZeros[i] === "0" || regNumsZeros[i] === ".") {
            newNum.push(regNumsZeros[i])
            console.log("newNum", newNum, "regNumsZeros", newNum.toString())
        }
    }
    console.log("newNum", newNum, "newNumarr", newNum.toString())

    return newNum.toString()

}

export function handleCutAddress(address) {
    //todo add validation
    let spliced = address.slice(0, 7);
    let splicedpart2 = address.slice(59);
    return spliced + "..." + splicedpart2;
}
export function checkDecimals(value) {
    return value.toFixed(4);
}
function qtyOneForOther(amountIn, reserveIn, reserveOut) {
    return Math.floor((amountIn * reserveOut) / reserveIn);
}

export function getSumsForProvide(amountA, amountB, reserveA, reserveB, additional) {
    let argA = qtyOneForOther(amountB, reserveB, reserveA);
    let argB = qtyOneForOther(amountA, reserveA, reserveB);
    let minAmountA = Math.min(amountA, argA);
    let minAmountB = Math.min(amountB, argB);
    let crmin = Math.min(reserveA, reserveB);
    let crmax = Math.max(reserveA, reserveB);
    let crquotient = ~~(crmax / crmin);
    let crremainder = crmax % crmin;
    let amountMin = Math.min(minAmountA, minAmountB) + (additional ? additional : 0);
    let amountOther = amountMin * crquotient + (amountMin * crremainder) / crmin;
    let acceptForProvideA = minAmountA < minAmountB ? amountMin : amountOther;
    let acceptForProvideB = minAmountB < minAmountA ? amountMin : amountOther;

    return [Math.floor(acceptForProvideA), Math.floor(acceptForProvideB)];
}
