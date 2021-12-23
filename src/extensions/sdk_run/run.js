import { Account } from '@tonclient/appkit';
import { signerKeys } from '@tonclient/core';

import { getDecimals, toHex } from '../../reactUtils/reactUtils';
import { DataContract } from '../contracts/Data.js';
import { DEXClientContract } from '../contracts/DEXClient.js';
import { DEXConnectorContract } from '../contracts/DEXConnector';
import { DEXRootContract } from '../contracts/DEXRoot.js';
import { NftRootContract } from '../contracts/NftRoot';
import { RootTokenContract } from '../contracts/RootTokenContract';
import { WrappedTONVaultContract } from '../contracts/WrappedTONVault.js';
import client, {
  checkPubKey,
  getAllDataPrep,
  getClientAddrAtRootForShard,
  getClientKeys,
  getDexClientCode,
  getRootConnectorCode,
  getRootCreators,
  getShardConnectPairQUERY,
  getsoUINT,
  pairs,
} from '../sdk_get/get';
import {
  grammsForConnector,
  grammsForPair,
  grammsForRoot,
  grammsForWallet,
  grammsTotal,
  rootDecimals,
  withdrawFee,
  zeroAddress,
} from './constants';
// TonClient.useBinaryLibrary(libWeb);

const Radiance = require('../Radiance.json');
const depoolAddress = Radiance.networks['2'].depoolAddress;
const rootAddrNFT = Radiance.networks['2'].rootAddrNFT;

function UserException(message) {
  this.message = message;
  this.name = 'UserExeption';
}

function getShard(string) {
  return string[2];
}

export async function deployEmptyWallet(
  clientAddr,
  clientKeys,
  rootAddress,
  ownerAddress,
) {
  const clientAcc = new Account(DEXClientContract, {
    address: clientAddr,
    signer: signerKeys(clientKeys),
    client,
  });
  try {
    const { body } = await client.abi.encode_message_body({
      abi: { type: 'Contract', value: RootTokenContract.abi },
      signer: { type: 'None' },
      is_internal: true,
      call_set: {
        function_name: 'deployEmptyWallet',
        input: {
          deploy_grams: 200000000,
          wallet_public_key_: 0,
          owner_address_: ownerAddress,
          gas_back_address: clientAddr,
        },
      },
    });
    return await clientAcc.run('sendTransaction', {
      dest: rootAddress,
      value: 1500000000,
      bounce: true,
      flags: 3,
      payload: body,
    });
  } catch (e) {
    console.log(e);
    return e;
  }
}

export async function createNewPair(
  clientAddr,
  clientKeys,
  rootName,
  root0,
  root1,
  pairSoArg,
  connectorSoArg0,
  connectorSoArg1,
  rootSoArg,
) {
  const clientAcc = new Account(DEXClientContract, {
    address: clientAddr,
    signer: signerKeys(clientKeys),
    client,
  });
  const RootCreators = await clientAcc.run('createNewPair', {
    root0: root0,
    root1: root1,
    pairSoArg: pairSoArg,
    connectorSoArg0: connectorSoArg0,
    connectorSoArg1: connectorSoArg1,
    rootSoArg: rootSoArg,
    rootName: toHex(rootName),
    rootSymbol: toHex(rootName),
    rootDecimals: rootDecimals,
    grammsForPair: grammsForPair,
    grammsForRoot: grammsForRoot,
    grammsForConnector: grammsForConnector,
    grammsForWallet: grammsForWallet,
    grammsTotal: grammsTotal,
  });
  return RootCreators.decoded.output;
}

export async function withdrawAll(dataAddr, clientAddr, clientKeys) {
  const clientAcc = new Account(DEXClientContract, {
    address: clientAddr,
    signer: signerKeys(clientKeys),
    client,
  });
  try {
    const { body } = await client.abi.encode_message_body({
      abi: { type: 'Contract', value: DataContract.abi },
      signer: { type: 'None' },
      is_internal: true,
      call_set: {
        function_name: 'withdrawDePoolAll',
        input: {},
      },
    });
    const res = await clientAcc.run('sendTransaction', {
      dest: dataAddr,
      value: withdrawFee,
      bounce: true,
      flags: 3,
      payload: body,
    });
    return res;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export async function withdrawPart(dataAddr, clientAddr, clientKeys, amount) {
  const fixedAmount = Number(amount) * 1000000000;

  const clientAcc = new Account(DEXClientContract, {
    address: clientAddr,
    signer: signerKeys(clientKeys),
    client,
  });
  try {
    const { body } = await client.abi.encode_message_body({
      abi: { type: 'Contract', value: DataContract.abi },
      signer: { type: 'None' },
      is_internal: true,
      call_set: {
        function_name: 'withdrawDePoolPart',
        input: {
          amount: fixedAmount,
        },
      },
    });
    const res = await clientAcc.run('sendTransaction', {
      dest: dataAddr,
      value: withdrawFee,
      bounce: true,
      flags: 3,
      payload: body,
    });
    return res;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export async function wrapTons(clientAddr, clientKeys, amount) {
  const clientAcc = new Account(DEXClientContract, {
    address: clientAddr,
    signer: signerKeys(clientKeys),
    client,
  });
  const connectorData = await clientAcc.runLocal('rootConnector', {});
  const fixedAmount = Number(amount) * 1000000000;
  let connectorWTONAddr =
    connectorData.decoded.output.rootConnector[
      Radiance.networks['2'].rootWTONAddr
    ];

  const { body } = await client.abi.encode_message_body({
    abi: { type: 'Contract', value: WrappedTONVaultContract.abi },
    signer: { type: 'None' },
    is_internal: true,
    call_set: {
      function_name: 'wrap',
      input: {
        tokens: fixedAmount,
        wallet_public_key: 0,
        owner_address: connectorWTONAddr,
        gas_back_address: clientAddr,
      },
    },
  });
  try {
    return await clientAcc.run('sendTransaction', {
      dest: Radiance.networks['2'].vaultAddr,
      value: fixedAmount + 1200000000,
      bounce: true,
      flags: 3,
      payload: body,
    });
  } catch (e) {
    console.log(e);
    return e;
  }
}

export async function unWrapTons(clientAddr, clientKeys, amount) {
  const clientAcc = new Account(DEXClientContract, {
    address: clientAddr,
    signer: signerKeys(clientKeys),
    client,
  });
  const fixedAmount = Number(amount) * 1000000000;
  try {
    const unWrapres = await clientAcc.run('sendTokens', {
      tokenRoot: Radiance.networks['2'].rootWTONAddr,
      to: Radiance.networks['2'].vaultWTONAddr,
      tokens: fixedAmount,
      grams: 1200000000,
    });

    console.log(
      'Contract reacted to your sendTransaction for wrap:',
      unWrapres.decoded.output,
    );
    return unWrapres;
  } catch (e) {
    console.log(e);
    return e;
  }
}

/**
 * Function to send to root client pubkey
 * @author   max_akkerman
 * @return   callback         onSharding()
 */
export async function setCreator(curExt) {
  const {
    SendTransfer,
    address,
    callMethod,
    contract,
    internal,
    name,
    pubkey,
    runMethod,
  } = curExt._extLib;

  let checkClientExists = await checkPubKey(pubkey);
  console.log('checkClientExists', checkClientExists);
  if (checkClientExists.status) {
    return {
      status: false,
      text: 'pubkey checked - y already have dex client',
    };
  } else {
    try {
      const rootContract = await contract(
        DEXRootContract.abi,
        Radiance.networks['2'].dexroot,
      );

      let checkClientExists = await getRootCreators();
      if (checkClientExists.creators['0x' + pubkey]) {
        console.log(
          'checkClientExists.creators["0x"+pubkey]',
          checkClientExists.creators['0x' + pubkey],
        );
        // await onSharding(curExt)
        return { status: 'success', text: 'setCreator success' };
      }
      let setCrStatus = await callMethod(
        'setCreator',
        { giverAddr: address },
        rootContract,
      );
      console.log('setCrStatus', setCrStatus);
      let n = 0;
      while (!checkClientExists.creators['0x' + pubkey]) {
        checkClientExists = await getRootCreators();
        n++;
        if (n > 500) {
          return { status: false, text: 'setCreator success' };
        }
      }
      // return await onSharding(curExt)
      return {
        status: 'success',
        operation: 'setCreator timeout, you tried too much, try again',
      };

      // return resp
    } catch (e) {
      console.log('catch E', e);
      return e;
    }
  }
}

/**
 * Function to get shard id to deploy dex client
 * @author   max_akkerman
 * @return   callback         createDEXclient()
 */

export async function onSharding(pubkey) {
  console.log('curExt onSharding', pubkey);
  try {
    // const rootContract = await contract(DEXRootContract.abi, Radiance.networks['2'].dexroot);
    let targetShard = getShard(Radiance.networks['2'].dexroot);
    // console.log("pubkeypubkey",pubkey)
    let status = false;
    let n = 0;
    let clientAddress;
    while (!status) {
      let response = await getClientAddrAtRootForShard(pubkey, n);
      console.log('response', response);
      let clientAddr = response;
      let shard = getShard(clientAddr);
      if (shard === targetShard) {
        status = true;
        clientAddress = clientAddr;
        console.log('ьыьыьваь', {
          address: clientAddr,
          keys: pubkey,
          clientSoArg: n,
        });
        return {
          status: true,
          data: { address: clientAddr, keys: '0x' + pubkey, clientSoArg: n },
        };
      }
      if (n > 1000) {
        return {
          status: false,
          text: 'sharding timeout, you tried too much, try again',
        };
      }
      n++;
    }
  } catch (e) {
    console.log('catch E', e);
    return e;
  }
}

async function logEvents(params, response_type) {
  console.log(`params = ${JSON.stringify(params, null, 2)}`);
  console.log(`response_type = ${JSON.stringify(response_type, null, 2)}`);
}

export async function prepareClientDataForDeploy(phrase) {
  const clientKeys = await getClientKeys(phrase);
  let clientPubkey = clientKeys.public;
  const clientSet = await onSharding(clientPubkey);
  console.log('clientSet', clientSet);
  return {
    address: clientSet.data.address,
    clientSoArg: clientSet.data.clientSoArg,
    ...clientKeys,
  };
}

export async function deployClient(clientSet) {
  console.log('clientSet.data.clientSoArg', clientSet);
  const { codeDEXclient } = await getDexClientCode();

  console.log(
    'codeDEXclient bool',
    codeDEXclient,
    DEXClientContract.code,
    codeDEXclient === DEXClientContract.code,
  );

  const connectorCode = await getRootConnectorCode();
  console.log('connectorCode', connectorCode.codeDEXconnector);

  console.log(
    'connectorCode.codeDEXconnector',
    connectorCode.codeDEXconnector === DEXConnectorContract.code,
  );
  try {
    const clientAcc = new Account(DEXClientContract, {
      initData: {
        rootDEX: Radiance.networks['2'].dexroot,
        soUINT: clientSet.clientSoArg,
        // codeDEXConnector: DEXConnectorContract.code,
        codeDEXConnector: DEXConnectorContract.code,
        // codeDEXConnector: ConnectorCode
      },
      signer: signerKeys({
        public: clientSet.public,
        secret: clientSet.secret,
      }),
      client,
    });
    const address = await clientAcc.getAddress();

    let checkAddress = clientSet.address === address;
    console.log(
      checkAddress,
      'checkAddress:address',
      clientSet.address,
      'address',
      address,
    );

    return await clientAcc.deploy({
      initFunctionName: 'constructor',
      initInput: { ownerAddr: zeroAddress },
    });
  } catch (e) {
    console.log(e);
    return e;
  }
}

/**
 * Function to send to root client pubkey
 * @author   max_akkerman
 * @param curExt
 * @param   {object} shardData {address: clientAddr, keys: '0x'+pubkey, clientSoArg: n}
 * @return   {object} {deployedAddress:address,statusCreate:bool}
 */

export async function createDEXclient(curExt, shardData) {
  const { callMethod, contract, pubkey } = curExt._extLib;

  try {
    const rootContract = await contract(
      DEXRootContract.abi,
      Radiance.networks['2'].dexroot,
    );
    let createDEXclientStatus = await callMethod(
      'createDEXclient',
      {
        pubkey: shardData.keys,
        souint: shardData.clientSoArg,
      },
      rootContract,
    ).catch((e) => {
      console.log('createDEXclienteeeeee', e);
      let ecode = '106';
      let found = e.text.match(ecode);
      if (found) {
        return {
          status: false,
          text: 'y are not registered at dex root, pls transfer some funds to dex root address',
        };
      } else {
        return e;
      }
    });
    let checkDexClientExists = await checkPubKey(pubkey);
    let n = 0;
    while (!checkDexClientExists.status) {
      checkDexClientExists = await checkPubKey(pubkey);
      if (n > 1500) {
        console.log({ status: false, text: 'checking pubkey failed' });
        return { status: false, text: 'checking pubkey failed' };
      }
      n++;
    }
    return checkDexClientExists;
  } catch (e) {
    console.log('catch E', e);
    return e;
  }
}

/**
 * Function to transfer tons
 * @author   max_akkerman
 * @param addressTo
 * @param amount
 * @param SendTransfer
 * @param addressTo
 * @param amount
 * @param SendTransfer
 * @param addressTo
 * @param amount
 */

export async function transfer(SendTransfer, addressTo, amount) {
  try {
    return await SendTransfer(addressTo, amount.toString());
  } catch (e) {
    console.log('e', e);
    return e;
  }
}

/**
 * Function to swap A
 * @author   max_akkerman
 * @param qtyA
 * @param phrase
 * @param curExt
 * @param pairAddr
 * @param qtyA
 * @param phrase
 * @param curExt
 * @param pairAddr
 * @param qtyA
 * @param slippage
 * @param phrase
 * @param qtyB
 * @param fromtokenData
 * @param toTokenData
 * @param curExt
 * @param pairAddr
 * @param qtyA
 * @param phrase
 */

export async function swapA(
  curExt,
  pairAddr,
  qtyA,
  slippage = 2,
  phrase,
  qtyB,
  fromtokenData,
  toTokenData,
) {
  //fix types
  if (slippage === 0 || !slippage) {
    slippage = 2;
  }
  const qtBToNum = +qtyB * getDecimals(toTokenData.decimals);
  const slippageValueofTokenB = (qtBToNum * slippage) / 100;
  const minQtyB = Math.round(qtBToNum - slippageValueofTokenB);
  const maxQtyB = Math.round(qtBToNum + slippageValueofTokenB);
  const qtyANum = Number(qtyA) * getDecimals(fromtokenData.decimals);
  console.log(
    'qtyA',
    qtyA,
    'qtyB',
    qtyB,
    'qtyANum',
    qtyANum,
    'qtBToNum',
    qtBToNum,
  );
  const { pubkey } = curExt._extLib;

  const keys = await getClientKeys(phrase);
  let getClientAddressFromRoot = await checkPubKey(pubkey);

  if (getClientAddressFromRoot.status === false) {
    return getClientAddressFromRoot;
  }

  // const acc = new Account(DEXClientContract, {
  // 	address: getClientAddressFromRoot.dexclient,
  // 	client,
  // 	signer: signerKeys(keys),
  // });
  // try {
  // 	return await acc.run("processSwapA", {
  // 		pairAddr: pairAddr,
  // 		qtyA: qtyANum,
  // 		minQtyB: minQtyB,
  // 		maxQtyB: maxQtyB,
  // 	});
  // } catch (e) {
  // 	console.log("catch E", e);
  // 	return e;
  // }
}

/**
 * Function to swap B
 * @author   max_akkerman
 * @param qtyB
 * @param phrase
 * @param curExt
 * @param pairAddr
 * @param qtyB
 * @param phrase
 * @param curExt
 * @param pairAddr
 * @param qtyB
 * @param slippage
 * @param phrase
 * @param qtyA
 * @param fromtokenData
 * @param toTokenData
 * @param curExt
 * @param pairAddr
 * @param qtyB
 * @param phrase
 */

export async function swapB(
  curExt,
  pairAddr,
  qtyB,
  slippage = 2,
  phrase,
  qtyA,
  fromtokenData,
  toTokenData,
) {
  if (slippage === 0 || !slippage) {
    slippage = 2;
  }

  const qtAToNum = +qtyA * getDecimals(toTokenData.decimals);
  const slippageValueofTokenA = (qtAToNum * slippage) / 100;
  const minQtyA = Math.round(qtAToNum - slippageValueofTokenA);
  const maxQtyA = Math.round(qtAToNum + slippageValueofTokenA);
  const qtyBNum = Number(qtyB) * getDecimals(fromtokenData.decimals);

  const { pubkey } = curExt._extLib;
  let getClientAddressFromRoot = await checkPubKey(pubkey);
  console.log(
    'swapBBB qtyA',
    qtyA,
    'qtyB',
    qtyB,
    'qtyANum',
    qtAToNum,
    'qtBToNum',
    qtyBNum,
  );

  const keys = await getClientKeys(phrase);

  if (getClientAddressFromRoot.status === false) {
    return getClientAddressFromRoot;
  }
  const acc = new Account(DEXClientContract, {
    address: getClientAddressFromRoot.dexclient,
    client,
    signer: signerKeys(keys),
  });
  try {
    return await acc.run('processSwapB', {
      pairAddr: pairAddr,
      qtyB: qtyBNum,
      minQtyA: minQtyA,
      maxQtyA: maxQtyA,
    });
  } catch (e) {
    console.log('catch E', e);
    return e;
  }
}

/**
 * Function to return liquid from pair, tokens - are the liquidityProvider tokens type
 * @author   max_akkerman
 * @param tokens
 * @param curExt
 * @param pairAddr
 * @param tokens
 * @param curExt
 * @param pairAddr
 * @param keys
 * @param tokens
 * @param curExt
 * @param pairAddr
 * @param tokens
 */

export async function returnLiquidity(curExt, pairAddr, tokens, keys) {
  const { pubkey } = curExt._extLib;
  let getClientAddressFromRoot = await checkPubKey(pubkey);

  if (getClientAddressFromRoot.status === false) {
    return getClientAddressFromRoot;
  }
  const acc = new Account(DEXClientContract, {
    address: getClientAddressFromRoot.dexclient,
    client,
    signer: signerKeys(keys),
  });
  try {
    return await acc.run('returnLiquidity', {
      pairAddr: pairAddr,
      tokens: tokens.toFixed(),
    });
  } catch (e) {
    console.log('catch E', e);
    return e;
  }
}

/**
 * Function to process liquid
 * @author   max_akkerman
 * @param qtyB
 * @param pairAddr
 * @param qtyA
 * @param qtyB
 * @param pairAddr
 * @param qtyA
 * @param qtyB
 * @param pairAddr
 * @param qtyA
 * @param qtyB
 * @param clientAddress
 * @param pairAddr
 * @param qtyA
 * @param qtyB
 * @param keys
 * @param toTokenData
 * @param fromtokenData
 */

export async function processLiquidity(
  clientAddress,
  pairAddr,
  qtyA,
  qtyB,
  keys,
  fromtokenData,
  toTokenData,
) {
  // const {pubkey} = curExt._extLib;
  // console.log("pairAddr,\n" +
  // 	"\tqtyA,\n" +
  // 	"\tqtyB,\n" +
  // 	"\tkeys,\n" +
  // 	"\tfromtokenData,\n" +
  // 	"\ttoTokenData,",pairAddr,
  // 	qtyA,
  // 	qtyB,
  // 	keys,
  // 	fromtokenData,
  // 	toTokenData,)
  let qtyAnum = Number(qtyA);
  let qtyBnum = Number(qtyB);

  const qtyAfixed = Math.round(qtyAnum * getDecimals(fromtokenData.decimals));
  const qtyBfixed = Math.round(qtyBnum * getDecimals(toTokenData.decimals));
  // console.log("qtyAfixed",qtyAfixed,"qtyBfixed",typeof qtyBfixed,qtyBfixed,"pairAddr",pairAddr)
  const acc = new Account(DEXClientContract, {
    address: clientAddress,
    signer: signerKeys(keys),
    client,
  });

  try {
    return await acc.run('processLiquidity', {
      pairAddr: pairAddr,
      qtyA: qtyAfixed,
      qtyB: qtyBfixed.toString(),
    });
  } catch (e) {
    console.log('catch E processLiquidity', e);
    return e;
  }
}

/**
 * Function to connect To Pair
 * @author   max_akkerman
 * @param pairAddr
 * @param keys
 * @param pairAddr
 * @param keys
 */

export async function connectToPair(pairAddr, keys) {
  let getClientAddressFromRoot = await checkPubKey(keys.public);
  if (getClientAddressFromRoot.status === false) {
    return getClientAddressFromRoot;
  }
  const acc = new Account(DEXClientContract, {
    address: getClientAddressFromRoot.dexclient,
    client,
    signer: signerKeys(keys),
  });
  try {
    const connectPairres = await acc.run('connectPair', { pairAddr: pairAddr });
    if (
      !connectPairres ||
      (connectPairres &&
        (connectPairres.code === 1000 || connectPairres.code === 3))
    ) {
      return connectPairres;
    } else {
      return {
        pairAddr: pairAddr,
        clientAddress: getClientAddressFromRoot.dexclient,
      };
    }
  } catch (e) {
    console.log('catch E', e);
    return e;
  }
}

export async function getClientForConnect(data, clientAddress) {
  const { pairAddr } = data;
  try {
    let soUINT = await getsoUINT(clientAddress);
    let pairsT = await pairs(clientAddress);
    let clientRoots = await getAllDataPrep(clientAddress);
    let curPair = null;
    let n = 0;

    while (!curPair) {
      pairsT = await pairs(clientAddress);

      curPair = pairsT[pairAddr];
      n++;
      if (n > 500) {
        return { code: 3, text: 'time limit in checking cur pair' };
      }
    }
    return {
      ...soUINT,
      curPair,
      clientAdr: clientAddress,
      clientRoots: clientRoots.rootKeysR,
    };
  } catch (e) {
    console.log('catch E', e);
    return e;
  }
}

export async function connectToPairStep2DeployWallets(connectionData, keys) {
  let { clientAdr, clientRoots, curPair } = connectionData;
  let targetShard = getShard(clientAdr);
  let cureClientRoots = [curPair.rootA, curPair.rootB, curPair.rootAB];
  let newArr = cureClientRoots.filter(function (item) {
    return clientRoots.indexOf(item) === -1;
  });
  if (newArr.length === 0) {
    return { code: 3, text: 'y already have all pair wallets' };
  }
  let resArray = [];

  const acc = new Account(DEXClientContract, {
    address: clientAdr,
    client,
    signer: signerKeys(keys),
  });

  try {
    for (const item of newArr) {
      let soUint = await getShardConnectPairQUERY(clientAdr, targetShard, item);

      console.log('getting shard', item, 'soUint', soUint);
      const connectRootRes = await acc.run('connectRoot', {
        root: item,
        souint: soUint,
        gramsToConnector: 1100000000,
        gramsToRoot: 3100000000,
      });

      resArray.push(connectRootRes);
      if (connectRootRes.code) {
        return connectRootRes;
      }
    }
    return { status: 'success', resArray: resArray };
  } catch (e) {
    console.log('connectRoot e');
    return e;
  }
}

/*
    WALLET
*/
export async function sendToken(
  clientAddress,
  curExt,
  tokenRootAddress,
  addressTo,
  tokensAmount,
  keys,
  selectedToken,
) {
  const gramsForSend = 1000000000;

  const acc = new Account(DEXClientContract, {
    address: clientAddress,
    client,
    signer: signerKeys(keys),
  });
  try {
    return await acc.run('sendTokens', {
      tokenRoot: tokenRootAddress,
      to: addressTo,
      //todo check why 10000000 here
      tokens: tokensAmount * getDecimals(selectedToken.decimals),
      grams: gramsForSend,
    });
  } catch (e) {
    console.log('catch E', e);
    return e;
  }
}

export async function sendNFT(curExt, addrto, nftLockStakeAddress, phrase) {
  const { pubkey } = curExt._extLib;
  let getClientAddressFromRoot = await checkPubKey(pubkey);

  if (getClientAddressFromRoot.status === false) {
    return getClientAddressFromRoot;
  }

  const keys = await getClientKeys(phrase);
  if (getClientAddressFromRoot.status === false) {
    return getClientAddressFromRoot;
  }

  const acc = new Account(DEXClientContract, {
    address: getClientAddressFromRoot.dexclient,
    client,
    signer: signerKeys(keys),
  });

  const { body } = await client.abi.encode_message_body({
    abi: { type: 'Contract', value: DataContract.abi },
    signer: { type: 'None' },
    is_internal: true,
    call_set: {
      function_name: 'transferOwnership',
      input: {
        addrTo: addrto,
      },
    },
  });

  return await acc.run('sendTransaction', {
    dest: nftLockStakeAddress,
    value: 1500000000,
    bounce: true,
    flags: 3,
    payload: body,
  });
}

/*
     stakeToDePool
*/

export async function stakeToDePool(
  curExt,
  phrase,
  lockStake,
  period,
  apyForStake,
) {
  const { pubkey } = curExt._extLib;
  let getClientAddressFromRoot = await checkPubKey(pubkey);

  const APY = apyForStake.toFixed(2) * 100;

  if (getClientAddressFromRoot.status === false) {
    return getClientAddressFromRoot;
  }
  const keys = await getClientKeys(phrase);
  const acc = new Account(DEXClientContract, {
    address: getClientAddressFromRoot.dexclient,
    client,
    signer: signerKeys(keys),
  });
  try {
    const { body } = await client.abi.encode_message_body({
      abi: { type: 'Contract', value: NftRootContract.abi },
      signer: { type: 'None' },
      is_internal: true,
      call_set: {
        function_name: 'createLockStakeSafeWithNftKey',
        input: {
          _donor: getClientAddressFromRoot.dexclient,
          _depoolAddress: depoolAddress,
          //mainnet
          // _depoolFee: 500000000,
          // _depoolMinStake: 50000000000,

          // testnet
          _depoolFee: 500000000,
          _depoolMinStake: 10000000000,
          _amountLockStake: lockStake,
          _periodLockStake: period,
          _apyLockStake: APY,
        },
      },
    });
    return await acc.run('sendTransaction', {
      dest: rootAddrNFT,
      value: lockStake + 4000000000,
      bounce: true,
      flags: 3,
      payload: body,
    });
  } catch (e) {
    return e;
  }
}

export async function sendNativeTons(
  clientData,
  addressTo,
  tokensAmount,
  phrase,
) {
  const keys = await getClientKeys(phrase);
  const acc = new Account(DEXClientContract, {
    address: clientData.address,
    client,
    signer: signerKeys(keys),
  });

  try {
    return await acc.run('sendTransaction', {
      dest: addressTo,
      value: tokensAmount * 1000000000,
      bounce: false,
      flags: 3,
      payload: '',
    });
  } catch (e) {
    console.log('catch E', e);
    return e;
  }
}
