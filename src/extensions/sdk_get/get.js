/*
    DEX contracts
*/
import { signerKeys, signerNone } from '@tonclient/core';
import { libWeb } from '@tonclient/lib-web';
import { ethers } from 'ethers';
import memoize from 'lodash.memoize';

// import {reduxStore} from "../../index";
import { reduxStore } from '@/lib/redux';

import { iconGenerator } from '../../iconGenerator';
import salary from '../../images/salary.svg';
import { saveLog } from '../../logging/logging';
import {
  dec2hex,
  getDecimals,
  getFixedNums,
  getFullName,
  hex2a,
  toHex,
} from '../../reactUtils/reactUtils';
import { setTips } from '../../store/actions/app';
import { setUpdatedBalance } from '../../store/actions/wallet';
import { CreditEthereumEventConfigurationContract } from '../contracts/CreditEthereumEventConfiguration.js';
/*
    NFT contracts
*/
import { DataContract } from '../contracts/Data.js';
import { DEXClientContract } from '../contracts/DEXClientMainNet.js';
import { DEXConnectorContract } from '../contracts/DEXConnector.js';
import { DEXPairContract } from '../contracts/DEXPair.js';
import { DEXRootContract } from '../contracts/DEXRoot.js';
import { GContract } from '../contracts/GContract.js';
import { LimitOrderRootContract } from '../contracts/LimitOrderRoot.js';
import { LimitOrderRouterContract } from '../contracts/LimitOrderRouter.js';
import { LockStakeSafeContract } from '../contracts/LockStakeSafe.js';
import { NftRootContract } from '../contracts/NftRoot.js';
import { RootTokenContract } from '../contracts/RootTokenContract.js';
import { SafeMultisigWallet } from '../contracts/SafeMultisigWallet.js';
import { TONTokenWalletContract } from '../contracts/TONTokenWallet.js';
import {
  checkMessagesAmountClient,
  decode,
  decodePayload,
  getShardThis,
} from '../tonUtils';

const { ResponseType } = require('@tonclient/core/dist/bin');
const { TonClient } = require('@tonclient/core');
const { Account } = require('@tonclient/appkit');
TonClient.useBinaryLibrary(libWeb);

const Radiance = require('../Radiance.json');
const dexroot = Radiance.networks['2'].dexroot;
const rootAddrNFT = Radiance.networks['2'].rootAddrNFT;
const BroxusRootCodeHash = Radiance.networks['2'].BroxusRootCodeHash;

const BridgeAssets = require('../BridgeAssets.json');
const assetsObj = BridgeAssets.token;

const DappServer = Radiance.networks['2'].DappServer;
const limitRootAddress = Radiance.networks['2'].limitRootAddress;
const limitOrderRouter = Radiance.networks['2'].limitOrderRouter;

const client = new TonClient({ network: { endpoints: [DappServer] } });
export default client;

const provider = new ethers.providers.EtherscanProvider(
  null,
  '4MWT3NGZ9U5WECARAWYGZ1MGNMCM72PETF',
);
const provider2 = new ethers.providers.JsonRpcProvider(
  'https://bsc-dataseed.binance.org/',
  { chainId: 56, name: 'binance' },
);
const provider3 = new ethers.providers.JsonRpcProvider(
  'https://speedy-nodes-nyc.moralis.io/38abd3f2a52dd8e90041ee98/polygon/mainnet',
  { chainId: 137, name: 'matic' },
);
const provider4 = new ethers.providers.JsonRpcProvider(
  'https://speedy-nodes-nyc.moralis.io/38abd3f2a52dd8e90041ee98/fantom/mainnet',
  { chainId: 250, name: 'fantom' },
);

const vaultWrapperAbi = ['function vault() external view returns (address)'];

const vaultAbi = ['function token() external view returns (address)'];

export async function getBridgeAssetsForAddress(chain, walletAddr) {
  console.log('getBridgeAssetsForAddress', chain, walletAddr);
  let eth1 = [];
  let bcs56 = [];
  let polygon137 = [];
  let phantom250 = [];

  let walletAddrResult = {
    bcs56: [],
    eth1: [],
    phantom250: [],
    polygon137: [],
  };
  let assetsArr = Object.keys(assetsObj);
  let vaultsArr;

  assetsArr.forEach((token) => {
    vaultsArr = assetsObj[token].vaults;
    vaultsArr.forEach((vault) => {
      if (vault.depositType == 'credit') {
        if (vault.chainId == '1') {
          eth1.push({ config: vault.ethereumConfiguration, token: token });
        } else if (vault.chainId == '56') {
          bcs56.push({ config: vault.ethereumConfiguration, token: token });
        } else if (vault.chainId == '137') {
          polygon137.push({
            config: vault.ethereumConfiguration,
            token: token,
          });
        } else if (vault.chainId == '250') {
          phantom250.push({
            config: vault.ethereumConfiguration,
            token: token,
          });
        }
      }
    });
  });

  let response;
  let itemConfig = {
    balance: '',
    config: '',
    decimals: '',
    evmsymbol: '',
    evmtoken: '',
    logo: '',
    name: '',
    symbol: '',
    thumbnail: '',
    token: '',
    vault: '',
    vaultWrapper: '',
  };

  if (chain == 1) {
    for (const item of eth1) {
      console.log('eth1', item.token);
      itemConfig = {
        balance: '',
        config: '',
        decimals: '',
        evmsymbol: '',
        evmtoken: '',
        logo: '',
        name: '',
        symbol: '',
        thumbnail: '',
        token: item.token,
        vault: '',
        vaultWrapper: '',
      };
      const rootAcc = new Account(RootTokenContract, {
        address: item.token,
        client,
      });
      response = await rootAcc.runLocal('symbol', {});
      itemConfig.symbol = hex2a(response.decoded.output.symbol);
      itemConfig.icon = iconGenerator(
        getReplacedSymbol(hex2a(response.decoded.output.symbol)),
      );
      itemConfig.config = item.config;
      const configAcc = new Account(CreditEthereumEventConfigurationContract, {
        address: item.config,
        client,
      });
      response = await configAcc.runLocal('getDetails', { answerId: 0 });
      let dec = response.decoded.output._networkConfiguration.eventEmitter;
      let vaultWrapperAddr = dec2hex(dec);
      itemConfig.vaultWrapper = vaultWrapperAddr;
      const vaultWrapper = new ethers.Contract(
        vaultWrapperAddr,
        vaultWrapperAbi,
        provider,
      );
      const vaultAddr = await vaultWrapper.vault();
      itemConfig.vault = vaultAddr;
      const vault = new ethers.Contract(vaultAddr, vaultAbi, provider);
      const tokenAddr = await vault.token();
      itemConfig.evmtoken = tokenAddr;
      response = await fetch(
        `https://deep-index.moralis.io/api/v2/${walletAddr}/erc20?chain=eth&token_addresses=${tokenAddr}`,
        {
          headers: {
            'X-API-Key':
              '7TXcjOlWFSvDpCkWRlXKUF2MsM8V6ECHJD5xWZ6Pf9hFPLDmBJTaNn3vSA4vceDi',
            accept: 'application/json',
          },
        },
      );
      const data = await response.json();
      console.log('eth1', data);
      if (data.length > 0) {
        itemConfig.balance = data[0].balance;
        itemConfig.decimals = data[0].decimals;
        itemConfig.name = data[0].name;
        itemConfig.evmsymbol = data[0].symbol;
        itemConfig.logo = data[0].logo;
        itemConfig.thumbnail = data[0].thumbnail;
      } else {
        response = await fetch(
          `https://deep-index.moralis.io/api/v2/erc20/metadata?chain=eth&addresses=${tokenAddr}`,
          {
            headers: {
              'X-API-Key':
                '7TXcjOlWFSvDpCkWRlXKUF2MsM8V6ECHJD5xWZ6Pf9hFPLDmBJTaNn3vSA4vceDi',
              accept: 'application/json',
            },
          },
        );
        const data = await response.json();
        itemConfig.balance = 0;
        itemConfig.decimals = 0;
        itemConfig.name = data[0].name;
        itemConfig.evmsymbol = data[0].symbol;
        itemConfig.logo = data[0].logo;
        itemConfig.thumbnail = data[0].thumbnail;
      }
      walletAddrResult.eth1.push(itemConfig);
    }
  } else if (chain == 56) {
    for (const item of bcs56) {
      console.log('bcs56', item.token);
      itemConfig = {
        balance: '',
        config: '',
        decimals: '',
        evmsymbol: '',
        evmtoken: '',
        logo: '',
        name: '',
        symbol: '',
        thumbnail: '',
        token: item.token,
        vault: '',
        vaultWrapper: '',
      };
      const rootAcc = new Account(RootTokenContract, {
        address: item.token,
        client,
      });
      response = await rootAcc.runLocal('symbol', {});
      itemConfig.symbol = hex2a(response.decoded.output.symbol);
      itemConfig.icon = iconGenerator(
        getReplacedSymbol(hex2a(response.decoded.output.symbol)),
      );

      itemConfig.config = item.config;
      const configAcc = new Account(CreditEthereumEventConfigurationContract, {
        address: item.config,
        client,
      });
      response = await configAcc.runLocal('getDetails', { answerId: 0 });
      let dec = response.decoded.output._networkConfiguration.eventEmitter;
      let vaultWrapperAddr = dec2hex(dec);
      itemConfig.vaultWrapper = vaultWrapperAddr;
      const vaultWrapper = new ethers.Contract(
        vaultWrapperAddr,
        vaultWrapperAbi,
        provider2,
      );
      const vaultAddr = await vaultWrapper.vault();
      itemConfig.vault = vaultAddr;
      const vault = new ethers.Contract(vaultAddr, vaultAbi, provider2);
      const tokenAddr = await vault.token();
      itemConfig.evmtoken = tokenAddr;
      response = await fetch(
        `https://deep-index.moralis.io/api/v2/${walletAddr}/erc20?chain=bsc&token_addresses=${tokenAddr}`,
        {
          headers: {
            'X-API-Key':
              '7TXcjOlWFSvDpCkWRlXKUF2MsM8V6ECHJD5xWZ6Pf9hFPLDmBJTaNn3vSA4vceDi',
            accept: 'application/json',
          },
        },
      );
      const data = await response.json();
      console.log('bcs56', data);
      if (data.length > 0) {
        itemConfig.balance = data[0].balance;
        itemConfig.decimals = data[0].decimals;
        itemConfig.name = data[0].name;
        itemConfig.evmsymbol = data[0].symbol;
        itemConfig.logo = data[0].logo;
        itemConfig.thumbnail = data[0].thumbnail;
      } else {
        response = await fetch(
          `https://deep-index.moralis.io/api/v2/erc20/metadata?chain=bsc&addresses=${tokenAddr}`,
          {
            headers: {
              'X-API-Key':
                '7TXcjOlWFSvDpCkWRlXKUF2MsM8V6ECHJD5xWZ6Pf9hFPLDmBJTaNn3vSA4vceDi',
              accept: 'application/json',
            },
          },
        );
        const data = await response.json();
        itemConfig.balance = 0;
        itemConfig.decimals = 0;
        itemConfig.name = data[0].name;
        itemConfig.evmsymbol = data[0].symbol;
        itemConfig.logo = data[0].logo;
        itemConfig.thumbnail = data[0].thumbnail;
      }
      walletAddrResult.bcs56.push(itemConfig);
    }
  } else if (chain === 137) {
    for (const item of polygon137) {
      console.log('polygon137', item.token);
      itemConfig = {
        balance: '',
        config: '',
        decimals: '',
        evmsymbol: '',
        evmtoken: '',
        logo: '',
        name: '',
        symbol: '',
        thumbnail: '',
        token: item.token,
        vault: '',
        vaultWrapper: '',
      };
      const rootAcc = new Account(RootTokenContract, {
        address: item.token,
        client,
      });
      response = await rootAcc.runLocal('symbol', {});
      itemConfig.symbol = hex2a(response.decoded.output.symbol);
      itemConfig.icon = iconGenerator(
        getReplacedSymbol(hex2a(response.decoded.output.symbol)),
      );

      itemConfig.config = item.config;
      const configAcc = new Account(CreditEthereumEventConfigurationContract, {
        address: item.config,
        client,
      });
      response = await configAcc.runLocal('getDetails', { answerId: 0 });
      let dec = response.decoded.output._networkConfiguration.eventEmitter;
      let vaultWrapperAddr = dec2hex(dec);
      itemConfig.vaultWrapper = vaultWrapperAddr;
      const vaultWrapper = new ethers.Contract(
        vaultWrapperAddr,
        vaultWrapperAbi,
        provider3,
      );
      const vaultAddr = await vaultWrapper.vault();
      itemConfig.vault = vaultAddr;
      const vault = new ethers.Contract(vaultAddr, vaultAbi, provider3);
      const tokenAddr = await vault.token();
      itemConfig.evmtoken = tokenAddr;
      response = await fetch(
        `https://deep-index.moralis.io/api/v2/${walletAddr}/erc20?chain=polygon&token_addresses=${tokenAddr}`,
        {
          headers: {
            'X-API-Key':
              '7TXcjOlWFSvDpCkWRlXKUF2MsM8V6ECHJD5xWZ6Pf9hFPLDmBJTaNn3vSA4vceDi',
            accept: 'application/json',
          },
        },
      );
      const data = await response.json();
      console.log('polygon137', data);
      if (data.length > 0) {
        itemConfig.balance = data[0].balance;
        itemConfig.decimals = data[0].decimals;
        itemConfig.name = data[0].name;
        itemConfig.evmsymbol = data[0].symbol;
        itemConfig.logo = data[0].logo;
        itemConfig.thumbnail = data[0].thumbnail;
      } else {
        response = await fetch(
          `https://deep-index.moralis.io/api/v2/erc20/metadata?chain=polygon&addresses=${tokenAddr}`,
          {
            headers: {
              'X-API-Key':
                '7TXcjOlWFSvDpCkWRlXKUF2MsM8V6ECHJD5xWZ6Pf9hFPLDmBJTaNn3vSA4vceDi',
              accept: 'application/json',
            },
          },
        );
        const data = await response.json();
        itemConfig.balance = 0;
        itemConfig.decimals = 0;
        itemConfig.name = data[0].name;
        itemConfig.evmsymbol = data[0].symbol;
        itemConfig.logo = data[0].logo;
        itemConfig.thumbnail = data[0].thumbnail;
      }
      walletAddrResult.polygon137.push(itemConfig);
    }
  } else if (chain == 250) {
    for (const item of phantom250) {
      console.log('phantom250', item.token);
      itemConfig = {
        balance: '',
        config: '',
        decimals: '',
        evmsymbol: '',
        evmtoken: '',
        logo: '',
        name: '',
        symbol: '',
        thumbnail: '',
        token: item.token,
        vault: '',
        vaultWrapper: '',
      };
      const rootAcc = new Account(RootTokenContract, {
        address: item.token,
        client,
      });
      response = await rootAcc.runLocal('symbol', {});
      itemConfig.symbol = hex2a(response.decoded.output.symbol);
      itemConfig.icon = iconGenerator(
        getReplacedSymbol(hex2a(response.decoded.output.symbol)),
      );

      itemConfig.config = item.config;
      const configAcc = new Account(CreditEthereumEventConfigurationContract, {
        address: item.config,
        client,
      });
      response = await configAcc.runLocal('getDetails', { answerId: 0 });
      let dec = response.decoded.output._networkConfiguration.eventEmitter;
      let vaultWrapperAddr = dec2hex(dec);
      itemConfig.vaultWrapper = vaultWrapperAddr;
      const vaultWrapper = new ethers.Contract(
        vaultWrapperAddr,
        vaultWrapperAbi,
        provider4,
      );
      const vaultAddr = await vaultWrapper.vault();
      itemConfig.vault = vaultAddr;
      const vault = new ethers.Contract(vaultAddr, vaultAbi, provider4);
      const tokenAddr = await vault.token();
      itemConfig.evmtoken = tokenAddr;
      response = await fetch(
        `https://deep-index.moralis.io/api/v2/${walletAddr}/erc20?chain=fantom&token_addresses=${tokenAddr}`,
        {
          headers: {
            'X-API-Key':
              '7TXcjOlWFSvDpCkWRlXKUF2MsM8V6ECHJD5xWZ6Pf9hFPLDmBJTaNn3vSA4vceDi',
            accept: 'application/json',
          },
        },
      );
      const data = await response.json();
      console.log('phantom250', data);
      if (data.length > 0) {
        itemConfig.balance = data[0].balance;
        itemConfig.decimals = data[0].decimals;
        itemConfig.name = data[0].name;
        itemConfig.evmsymbol = data[0].symbol;
        itemConfig.logo = data[0].logo;
        itemConfig.thumbnail = data[0].thumbnail;
      } else {
        response = await fetch(
          `https://deep-index.moralis.io/api/v2/erc20/metadata?chain=fantom&addresses=${tokenAddr}`,
          {
            headers: {
              'X-API-Key':
                '7TXcjOlWFSvDpCkWRlXKUF2MsM8V6ECHJD5xWZ6Pf9hFPLDmBJTaNn3vSA4vceDi',
              accept: 'application/json',
            },
          },
        );
        const data = await response.json();
        itemConfig.balance = 0;
        itemConfig.decimals = 0;
        itemConfig.name = data[0].name;
        itemConfig.evmsymbol = data[0].symbol;
        itemConfig.logo = data[0].logo;
        itemConfig.thumbnail = data[0].thumbnail;
      }
      walletAddrResult.phantom250.push(itemConfig);
    }
  }

  return walletAddrResult;
}

export async function getShardLimit() {
  let response;
  let targetShard = getShardThis(dexroot);
  const rootAcc = new Account(LimitOrderRootContract, {
    address: limitRootAddress,
    client,
  });
  const rootRouterAcc = new Account(LimitOrderRouterContract, {
    address: limitOrderRouter,
    client,
  });
  console.log('rootRouterAcc', rootRouterAcc);

  const souintInitial = await rootRouterAcc.runLocal('soUINT', {});
  console.log('souintInitial', souintInitial);

  let souint = Number(souintInitial);
  console.log('souint', souint);

  // let souint = 0;
  let curShard = null;

  while (curShard !== targetShard) {
    response = await rootAcc.runLocal('resolveOrder', { id: souint });
    console.log('shards', targetShard, curShard);

    curShard = response.decoded.output.addrOrder[2];
    console.log('shards', targetShard, curShard);
    souint++;
  }
  return souint;
}

export async function getWalletAddress(clientPubkey, pairAddress, rootAddress) {
  const rootAcc = new Account(DEXRootContract, {
    client,
    address: dexroot,
    signer: signerNone(),
  });
  const RTacc = new Account(RootTokenContract, {
    address: rootAddress,
    client,
  });
  let pubk = '0x' + clientPubkey;

  let connectorSoArg0;
  let status = false;
  let n = 0;
  let res;

  let targetShard = getShardThis(dexroot);
  while (!status) {
    res = await rootAcc.runLocal('getConnectorAddress', {
      _answer_id: 0,
      connectorCommander: pairAddress,
      connectorPubKey: pubk,
      connectorSoArg: n,
    });
    let connectorAddr = res.decoded.output.value0;
    let shardC = getShardThis(connectorAddr);
    if (shardC === targetShard) {
      console.log('connectorSoArg:', n);
      console.log('getConnectorAddress:', connectorAddr);
      res = await RTacc.runLocal('getWalletAddress', {
        _answer_id: 0,
        owner_address_: connectorAddr,
        wallet_public_key_: 0,
      });
      let walletAddr = res.decoded.output.value0;
      let shardW = getShardThis(walletAddr);
      if (shardW === targetShard) {
        console.log('Bingo!');
        connectorSoArg0 = n;
        console.log('getWalletAddress:', walletAddr);
        console.log('connectorSoArg0:', n);
        status = true;
      } else {
        console.log('n', n);
      }
    } else {
      console.log('n', n);
    }
    n++;
  }
  return connectorSoArg0;
}

export async function getRootTokenAddress(clientPubkey, rootName, decimals) {
  const rootAcc = new Account(DEXRootContract, {
    address: dexroot,
    client,
  });
  let rootABsouint;
  let rootABaddress;
  let status = false;
  let targetShard = getShardThis(dexroot);
  let n = 0;
  let res;
  let pubk = '0x' + clientPubkey;

  try {
    while (!status) {
      res = await rootAcc.runLocal('getRootTokenAddress', {
        _answer_id: 0,
        rootDecimals: decimals,
        rootName: toHex(rootName),
        rootPubKey: pubk,
        rootSoArg: n,
        rootSymbol: toHex(rootName),
      });
      console.log('targetShard', targetShard, n);
      rootABaddress = res.decoded.output.value0;
      rootABsouint = n;
      let shard = getShardThis(rootABaddress);
      if (shard === targetShard) {
        console.log('Bingo!');
        console.log('rootAB SoArg:', rootABsouint);
        console.log('rootAB Address:', rootABaddress);
        status = true;
      } else {
        console.log(n);
      }
      n++;
    }
    return { rootABaddress: rootABaddress, rootABsouint: rootABsouint };
  } catch (e) {
    console.log('e', e);
    return e;
  }
}

export async function getPairAddress(
  clientPubkey,
  clientAddr,
  rootAddrA,
  rootAddrB,
  rootABaddress,
) {
  const rootAcc = new Account(DEXRootContract, {
    address: dexroot,
    client,
    signer: signerNone(),
  });
  let pubk = '0x' + clientPubkey;

  let targetShard = getShardThis(dexroot);
  let pairAddress;
  let pairSoArg;
  let status = false;
  let n = 0;
  let res;
  while (!status) {
    res = await rootAcc.runLocal('getPairAddress', {
      _answer_id: 0,
      pairCreator: clientAddr,
      pairPubKey: pubk,
      pairRootA: rootAddrA,
      pairRootAB: rootABaddress,
      pairRootB: rootAddrB,
      pairSoArg: n,
    });
    pairAddress = res.decoded.output.value0;
    let shard = getShardThis(pairAddress);
    if (shard === targetShard) {
      console.log('Bingo!');
      console.log('pair SoArg:', n);
      pairSoArg = n;
      console.log('pairAddress Address:', pairAddress);
      status = true;
    } else {
      console.log(n);
    }
    n++;
  }
  return { pairAddress: pairAddress, pairSoArg: pairSoArg };
}

export async function queryRoots(minBalance) {
  try {
    return (
      await client.net.query_collection({
        collection: 'accounts',
        filter: {
          balance: {
            gt: minBalance,
          },
          code_hash: {
            eq: BroxusRootCodeHash,
          },
        },
        order_by: {
          direction: 'DESC',
          path: 'balance',
        },
        result: 'id balance',
      })
    ).result;
  } catch (error) {
    console.error(error);
  }
}

export async function getAccType2(addr) {
  try {
    const curWalletContract = new Account(TONTokenWalletContract, {
      address: addr,
      client,
    });

    return await curWalletContract.getAccount();
  } catch (e) {
    console.log('catch E', e);
    return e;
  }
}

export async function getAccTypeHex(addr) {
  try {
    return await client.utils.convert_address({
      address: addr,
      output_format: {
        type: 'Hex',
      },
    });
  } catch (e) {
    return e;
  }
}

let GiverAd =
  '0:ed069a52b79f0bc21d13da9762a591e957ade1890d4a1c355e0010a8cb291ae4';

export async function transferFromGiver(addr, count) {
  const gSigner = signerKeys({
    public: 'd7e584a9ef4d41de1060b95dc1cdfec6df60dd166abc684ae505a9ff48925a19',
    secret: '742bba3dab8eb0622ba0356acd3de4fd263b9f7290fdb719589f163f6468b699',
  });

  const curGiverContract = new Account(GContract, {
    address: GiverAd,
    client,
    signer: gSigner,
  });
  return await curGiverContract.run('pay', {
    addr,
    count,
  });
}

export async function getShardConnectPairQUERY(
  clientAddress,
  targetShard,
  rootAddress,
) {
  let connectorSoArg0;
  let status = false;

  let shardC;
  let connectorAddr;

  const accClient = new Account(DEXClientContract, {
    address: clientAddress,
    client,
  });
  const RootTknContract = new Account(RootTokenContract, {
    address: rootAddress,
    client,
  });
  let sountArr = await checkSouint(clientAddress);
  console.log('sountArr=11111', sountArr);
  // web3.utils.toBN(String(totalSupply) + "0".repeat(decimalPrecision)),
  let largestNum = sountArr
    .sort(function (a, b) {
      return a - b;
    })
    .reverse();
  console.log('sountArr==========', sountArr, largestNum);
  let n = largestNum[0] + 1 || 0;
  let shardW;
  let walletAddr;
  while (!status) {
    let response = await accClient.runLocal('getConnectorAddress', {
      _answer_id: 0,
      connectorSoArg: n,
    });
    // console.log("response",response)
    connectorAddr = response.decoded.output.value0;
    shardC = getShardThis(connectorAddr);
    if (shardC === targetShard) {
      console.log('sharding--------', n, shardC, targetShard);
      let resp = await RootTknContract.runLocal('getWalletAddress', {
        _answer_id: 0,
        owner_address_: connectorAddr,
        wallet_public_key_: 0,
      });
      walletAddr = resp.decoded.output.value0;
      shardW = getShardThis(walletAddr);
      if (shardW === targetShard) {
        console.log(
          'sharding+++++++++++',
          !sountArr.filter((item) => item === shardW).length,
          n,
        );
        connectorSoArg0 = n;
        status = true;
      } else {
        //console.log(n, 'second');
      }
    } else {
      //console.log(n, 'first');
    }
    n++;
  }

  return connectorSoArg0;
}

export async function getDexClientCode() {
  const RootContract = new Account(DEXRootContract, {
    address: Radiance.networks['2'].dexroot,
    client,
  });
  const RootCreators = await RootContract.runLocal('codeDEXclient', {});
  return RootCreators.decoded.output;
}

export async function getRootConnectorCode() {
  const RootContract = new Account(DEXRootContract, {
    address: Radiance.networks['2'].dexroot,
    client,
  });
  const RootCreators = await RootContract.runLocal('codeDEXconnector', {});
  return RootCreators.decoded.output;
}

export async function getRootClientCode() {
  const RootContract = new Account(DEXRootContract, {
    address: Radiance.networks['2'].dexroot,
    client,
  });
  const RootCreators = await RootContract.runLocal('codeDEXclient', {});
  return RootCreators.decoded.output;
}

export async function getRootCreators() {
  // try {
  const RootContract = new Account(DEXRootContract, {
    address: Radiance.networks['2'].dexroot,
    client,
  });
  const RootCreators = await RootContract.runLocal('creators', {});
  return RootCreators.decoded.output;
}

export async function getRootBalanceOF() {
  try {
    const RootContract = new Account(DEXRootContract, {
      address: Radiance.networks['2'].dexroot,
      client,
    });
    const RootbalanceOf = await RootContract.runLocal('balanceOf', {});
    return RootbalanceOf.decoded.output;
  } catch (e) {
    console.log('catch E', e);
    return e;
  }
}

/**
 * Function to get balance of TOKENS in token wallets
 * @author   max_akkerman
 * @param   {string} walletAddress
 * @return   {number}
 */

export async function getWalletBalanceQUERY(walletAddress) {
  try {
    const curWalletContract = new Account(TONTokenWalletContract, {
      address: walletAddress,
      client,
    });

    return await curWalletContract.runLocal('balance', { answerId: 0 });
  } catch (e) {
    console.log('catch E', e);
    return e;
  }
}

/**
 * Function to check connected pair or not
 * @author   max_akkerman
 * @param   {string, string} clientAddress,pairAddress
 * @param pairAddress
 * @return   {bool}
 */

export async function checkClientPairExists(clientAddress, pairAddress) {
  const acc = new Account(DEXClientContract, {
    address: clientAddress,
    client,
  });
  try {
    const response = await acc.runLocal('getAllDataPreparation', {});
    const response2 = await acc.runLocal('rootWallet', {});
    let clientPairs = response.decoded.output.pairKeysR;
    console.log('getAllDataPreparation1', response.decoded.output);
    console.log('getAllDataPreparation2', response2.decoded.output);
    let newArr = clientPairs.filter((item) => item === pairAddress);
    return newArr.length !== 0;
  } catch (e) {
    console.log('catch E', e);
    return false;
  }
}

/**
 * Function to check wallet exists by pair
 * @author   max_akkerman
 * @param   {string} clientAddress
 * @param pairAddress
 * @return   [{walletAddress:string,symbol:string,balance:number}]
 */

export async function checkwalletExists(clientAddress, pairAddress) {
  const acc = new Account(DEXClientContract, {
    address: clientAddress,
    client,
  });
  const pairContract = new Account(DEXPairContract, {
    address: pairAddress,
    client,
  });
  try {
    const respRootWallets = await acc.runLocal('rootWallet', {});

    const respRootA = await pairContract.runLocal('rootA', {});
    const respRootB = await pairContract.runLocal('rootB', {});
    const respRootAB = await pairContract.runLocal('rootAB', {});

    let clientRoots = respRootWallets.decoded.output.rootWallet;
    let rootA = respRootA.decoded.output.rootA;
    let rootB = respRootB.decoded.output.rootB;
    let rootAB = respRootAB.decoded.output.rootAB;

    let checkedArr = [
      {
        status: !!clientRoots[rootA],
        walletAaddress: rootA,
      },
      {
        status: !!clientRoots[rootB],
        walletBaddress: rootB,
      },
      {
        status: !!clientRoots[rootAB],
        walletABaddress: rootAB,
      },
    ];

    console.log('checkedObj', checkedArr);
    return checkedArr;
    // let newArr = clientPairs.filter(item => item === pairAddress);
    // return newArr.length !== 0;
  } catch (e) {
    console.log('catch E', e);

    return [
      {
        status: false,
        walletAaddress: 0,
      },
      {
        status: false,
        walletBaddress: 0,
      },
      {
        status: false,
        walletABaddress: 0,
      },
    ];
  }
}

/**
 * Function to get client wallets
 * @author   max_akkerman
 * @return   string
 * @param name
 */

export function getReplacedSymbol(symbol) {
  console.log('symbolTTT', symbol);
  if (symbol === 'WTON') {
    return 'wEVER';
  } else if (symbol.includes('DS-WTON')) {
    return symbol.replace('WTON', 'wEVER');
  } else if (symbol.includes('WBTC')) {
    return symbol.replace('WBTC', 'BTC');
  } else {
    return symbol;
  }
}
export async function getAllClientWallets(clientAddress) {
  console.log('clientAddress____', clientAddress);
  const acc = new Account(DEXClientContract, {
    address: clientAddress,
    client,
  });
  const response = await acc.runLocal('rootWallet', {});
  console.log(
    'response.decoded.output.rootWallet',
    response.decoded.output.rootWallet,
  );
  let normalizeWallets = [];
  try {
    for (const item of Object.entries(response.decoded.output.rootWallet)) {
      const curWalletContract = new Account(TONTokenWalletContract, {
        address: item[1],
        client,
      });
      const curRootContract = new Account(RootTokenContract, {
        address: item[0],
        client,
      });
      console.log('item[1]', item[1], 'item[0]', item[0]);

      let curWalletData = await curWalletContract.runLocal('getDetails', {
        _answer_id: 0,
      });
      let curRootData = await curRootContract.runLocal('getDetails', {
        _answer_id: 0,
      });
      let itemData = {};

      // console.log("hereii", curWalletData)
      itemData.walletAddress = item[1];
      // itemData.symbol = hex2a(curRootData.decoded.output.value0.symbol);
      itemData.symbol = getReplacedSymbol(
        hex2a(curRootData.decoded.output.value0.symbol),
      );

      itemData.tokenName = getFullName(itemData.symbol);
      itemData.type = 'PureToken';
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
        '0:eac2a309de0d777b820bd5b5fbfcb07733be5c068234333bd83ad35f610fe82d'
      ) {
        normalizeWallets.push(itemData);
      }
    }
    console.log('normalizeWallets', normalizeWallets);
    return normalizeWallets;
  } catch (e) {
    console.log('catch E', e);
    return e;
  }
}

/**
 * Function to check existing of dexclient at root
 * @author   max_akkerman
 * @param   {number} clientPubkey
 * @return   [{walletAddress:string,symbol:string,balance:number}]
 */

export async function checkPubKey(clientPubkey) {
  try {
    const RootContract = new Account(DEXRootContract, {
      address: Radiance.networks['2'].dexroot,
      client,
    });

    let response = await RootContract.runLocal('checkPubKey', {
      pubkey: '0x' + clientPubkey,
    });
    return response.decoded.output;
  } catch (e) {
    console.log('catch E', e);
    return e;
  }
}

/**
 * Function to get all pairs on dex root
 * @author   max_akkerman
 * @param
 * @return   number{pairAddress:string,symbolA:string,reserveA:number,symbolB:string,reserveB:number,rateAB:nubmer,rateBA:number}]
 */

export const getAllPairsWoithoutProvider = memoize(async () => {
  const acc = new Account(DEXRootContract, {
    address: Radiance.networks['2'].dexroot,
    client,
  });
  const response = await acc.runLocal('pairs', {});
  console.log('response.decoded.output', response.decoded.output);
  let normlizeWallets = [];

  for (const item of Object.entries(response.decoded.output.pairs)) {
    const curRootTokenA = new Account(RootTokenContract, {
      address: item[1].root0,
      client,
    });
    const curRootTokenB = new Account(RootTokenContract, {
      address: item[1].root1,
      client,
    });
    const curRootTokenAB = new Account(RootTokenContract, {
      address: item[1].rootLP,
      client,
    });
    const pairContract = new Account(DEXPairContract, {
      address: item[0],
      client,
    });

    let bal = await pairContract.runLocal('balanceReserve', {});

    let curRootDataA = await curRootTokenA.runLocal('getDetails', {
      _answer_id: 0,
    });
    let curRootDataB = await curRootTokenB.runLocal('getDetails', {
      _answer_id: 0,
    });
    let curRootDataAB = await curRootTokenAB.runLocal('getDetails', {
      _answer_id: 0,
    });
    console.log('curRootDataA', curRootDataA);
    const decimalsRootA = Number(curRootDataA.decoded.output.value0.decimals);
    const decimalsRootB = Number(curRootDataB.decoded.output.value0.decimals);
    const decimalsRootAB = Number(curRootDataAB.decoded.output.value0.decimals);

    const balanceA = Number(bal.decoded.output.balanceReserve[item[1].root0]);
    const balanceB = Number(bal.decoded.output.balanceReserve[item[1].root1]);

    const fixedA = getFixedNums(decimalsRootA, balanceA);
    const fixedB = getFixedNums(decimalsRootB, balanceB);
    // console.log("fixedA", fixedA, "fixedB", fixedB);
    let itemData = {};
    itemData.pairAddress = item[0];

    // itemData.pairname = hex2a(curRootDataAB.decoded.output.value0.name)
    itemData.symbolA =
      hex2a(curRootDataA.decoded.output.value0.symbol) === 'WTON'
        ? 'wEVER'
        : hex2a(curRootDataA.decoded.output.value0.symbol);
    itemData.reserveA = balanceA;
    itemData.decimalsA = decimalsRootA;
    itemData.symbolB =
      hex2a(curRootDataB.decoded.output.value0.symbol) === 'WTON'
        ? 'wEVER'
        : hex2a(curRootDataB.decoded.output.value0.symbol);

    // itemData.symbolB = hex2a(curRootDataB.decoded.output.value0.symbol);
    itemData.reserveB = balanceB;
    itemData.decimalsB = decimalsRootB;

    itemData.decimalsAB = decimalsRootAB;

    itemData.rateAB = fixedB / fixedA;
    itemData.rateBA = fixedA / fixedB;
    itemData.totalSupply = await getPairsTotalSupply(item[0]);

    if (
      itemData.pairAddress !==
      '0:ea784f5e3434beb91fa56c8b0131cac0be703d6551a3bb297e4d6db95ae0af8e'
    ) {
      console.log('alert', itemData.symbolA);
      normlizeWallets.push(itemData);
    }

    // let wrongPairID = normlizeWallets.find((item,i)=>{
    // 	if(item.pairAddress === "0:ea784f5e3434beb91fa56c8b0131cac0be703d6551a3bb297e4d6db95ae0af8e")
    // 	{
    // 		return i
    // 	}
    //
    // })
    // console.log("wrongPairID",wrongPairID)
    // if(wrongPairID){
    // 	normlizeWallets.splice(wrongPairID,1)
    // }

    console.log('normlizeWallets!!normlizeWallets', normlizeWallets);
  }
  return normlizeWallets;
});

/**
 * Function to get native balance of address in tons
 * @author   max_akkerman
 * @param {string} clientAddress
 * @return   {number}
 */

export async function getClientBalance(clientAddress) {
  console.log('clientAddress', clientAddress);
  let address = clientAddress;
  if (
    clientAddress ===
    '0:0000000000000000000000000000000000000000000000000000000000000000'
  )
    return 0;
  try {
    let clientBalance = await client.net.query_collection({
      collection: 'accounts',
      filter: {
        id: {
          eq: address,
        },
      },
      result: 'balance',
    });
    console.log('clientBalance', clientBalance);
    return +clientBalance.result[0].balance / 1000000000;
  } catch (e) {
    console.log('catch E', e);
    return 0;
  }
}

export async function getDetailsFromTokenRoot(address) {
  const rootAcc = new Account(RootTokenContract, { address: address, client });

  let rootDetails = await rootAcc.runLocal('getDetails', { _answer_id: 0 });
  // console.log("rootDetailsNorm", rootDetailsNorm)

  return {
    decimals: rootDetails.decoded.output.value0.decimals,
    name: rootDetails.decoded.output.value0.name,
    symbol: rootDetails.decoded.output.value0.symbol,
    total_supply: rootDetails.decoded.output.value0.total_supply,
  };
}

export async function getExpectedWalletAddressByOwner(rootAddress, toAddress) {
  const rootAcc = new Account(RootTokenContract, {
    address: rootAddress,
    client,
  });

  let walletAddress = await rootAcc.runLocal('getWalletAddress', {
    _answer_id: 0,
    owner_address_: toAddress,
    wallet_public_key_: 0,
  });
  console.log(
    'walletAddress.decoded.output.value0.address',
    walletAddress.decoded.output,
  );
  return {
    name: walletAddress.decoded.output.value0,
  };
}

export async function getRootFromTonWallet(address) {
  const tokenWalletAcc = new Account(TONTokenWalletContract, {
    address: address,
    client,
  });

  let tokenWalletDetails = await tokenWalletAcc.runLocal('root_address', {});
  return tokenWalletDetails.decoded.output.value0.root_address;
}

export async function getDetailsFromTONtokenWallet2(address) {
  const tokenWalletAcc = new Account(TONTokenWalletContract, {
    address: address,
    client,
  });
  try {
    let tokenWalletDetails = await tokenWalletAcc.runLocal('getDetails', {
      _answer_id: 0,
    });

    return tokenWalletDetails.decoded.output;
  } catch (e) {
    console.log('eee', e);
    return e;
  }
}

export async function getDetailsFromTONtokenWallet(address) {
  console.log('rrrr', address);
  const tokenWalletAcc = new Account(TONTokenWalletContract, {
    address: address,
    client,
  });
  try {
    let tokenWalletDetails = await tokenWalletAcc.runLocal('getDetails', {
      _answer_id: 0,
    });

    if (!tokenWalletDetails.decoded.output.value0.root_address) {
      return undefined;
    }
    console.log('tokenWalletDetails.decoded', tokenWalletDetails.decoded);
    return tokenWalletDetails.decoded.output.value0.root_address;
  } catch (e) {
    console.log('eee', e);
    return e;
  }
}

export async function subscribeClientBalance(address) {
  await client.net.subscribe_collection(
    {
      collection: 'accounts',
      filter: {
        id: { eq: address },
      },
      result: 'balance',
    },
    async (params) => {
      if (!params.result) return;
      // if(!checkMessagesAmountClient({tonLiveID:params.result.id}))return

      reduxStore.dispatch(
        setUpdatedBalance(Number(params.result.balance) / 1000000000),
      );

      let checkedDuple = {
        created_at: params.result.created_at || 'default',
        name: 'UpdateBalanceTONs',
        tonLiveID: params.result.id || 'default',
      };

      let transactionData = {
        amount: Number(params.result.value) || 'default',
        src: params.result.src || 'default',
      };
      reduxStore.dispatch(
        setTips({
          message: `Your balance updated ${
            Number(params.result.balance) / 1000000000
          }`,
          type: 'info',
          ...checkedDuple,
          ...transactionData,
        }),
      );
    },
  );
  console.log('status subscribedAddress: address');
}

const transactionTypes = {
  0: 'Swap',
};

export async function subscribeClient(address) {
  await client.net.subscribe_collection(
    {
      collection: 'messages',
      filter: {
        dst: { eq: address },
      },
      limit: 1,
      order: [{ direction: 'DESC', path: 'created_at' }],
      result: 'id boc created_at body dst src',
    },
    async (params, responseType) => {
      console.log('client params ONLY', params);
      if (responseType === ResponseType.Custom) {
        let decoded = await decode.message(
          DEXRootContract.abi,
          params.result.boc,
        );
        if (decoded === 304) {
          decoded = await decode.message(
            RootTokenContract.abi,
            params.result.boc,
          );
        }
        if (decoded === 304) {
          decoded = await decode.message(
            TONTokenWalletContract.abi,
            params.result.boc,
          );
        }
        if (decoded === 304) {
          decoded = await decode.message(
            SafeMultisigWallet.abi,
            params.result.boc,
          );
        }
        if (decoded === 304) {
          decoded = await decode.message(
            DEXPairContract.abi,
            params.result.boc,
          );
        }
        if (decoded === 304) {
          decoded = await decode.message(
            DEXClientContract.abi,
            params.result.boc,
          );
        }
        if (decoded === 304) {
          decoded = await decode.message(
            DEXConnectorContract.abi,
            params.result.boc,
          );
        }
        if (decoded === 304) {
          decoded = await decode.message(
            NftRootContract.abi,
            params.result.boc,
          );
        }
        if (decoded === 304) {
          decoded = await decode.message(
            LockStakeSafeContract.abi,
            params.result.boc,
          );
        }
        if (decoded === 304) {
          decoded = await decode.message(DataContract.abi, params.result.boc);
        }
        console.log('client params22222', params, 'decoded22222', decoded);

        if (decoded.name === 'connectRoot') {
          const rootData = await getDetailsFromTokenRoot(decoded.value.root);

          let checkedDuple = {
            created_at: params.result.created_at || 'default',
            name: decoded.name,
            tonLiveID: params.result.id || 'default',
          };
          let transactionData = {
            token_name: hex2a(rootData.name) || 'default',
            token_symbol: hex2a(rootData.symbol) || 'default',
          };
          reduxStore.dispatch(
            setTips({
              message: `You deployed ${transactionData.token_name} wallet`,
              type: 'info',
              ...checkedDuple,
              ...transactionData,
            }),
          );
          saveLog(
            {
              clientAddress: params.result.dst,
              created_at: (Date.now() + 10800000) / 1000,
              name: decoded.name,
              rootAddress: decoded.value.root,
              tokenName: hex2a(rootData.name) || 'default',
              tokenSymbol: hex2a(rootData.symbol) || 'default',
              tonLiveID: params.result.id || 'default',
            },
            'connectRoot',
          );
        }
        if (decoded.name === 'sendTransaction') {
          if (!checkMessagesAmountClient({ tonLiveID: params.result.id }))
            return;
          let checkedDuple = {
            created_at: params.result.created_at || 'default',
            name: decoded.name,
            tonLiveID: params.result.id || 'default',
          };
          let transactionData = {
            dest: decoded.value.dest,
            value: decoded.value.value,
          };
          reduxStore.dispatch(
            setTips({
              message: `You send ${
                Number(transactionData.value) / 1000000000
              } EVERs`,
              type: 'info',
              ...checkedDuple,
              ...transactionData,
            }),
          );
          saveLog(
            {
              amount: decoded.value.value,
              clientAddress: params.result.dst,
              created_at: (Date.now() + 10800000) / 1000,
              dst: decoded.value.dest,
              name: decoded.name,
              tonLiveID: params.result.id || 'default',
            },
            'sendTransaction',
          );
        }

        if (decoded.name === 'sendTokens') {
          console.log('send tokens callback');
          const rootData = await getDetailsFromTokenRoot(
            decoded.value.tokenRoot,
          );

          let callbackData = {
            amount:
              +decoded.value.tokens / getDecimals(rootData.decimals) ||
              'default',
            created_at: params.result.created_at || 'default',
            dst: decoded.value.to || 'default',
            name: decoded.name,
            token_name: hex2a(rootData.name) || 'default',
            token_root: decoded.value.tokenRoot || 'default',
            token_symbol: hex2a(rootData.symbol) || 'default',
            tonLiveID: params.result.id || 'default',
            updated_balance: decoded.value.updated_balance || 'default',
          };

          console.log('send callbackData', callbackData);
          reduxStore.dispatch(
            setTips({
              message: `You send ${callbackData.amount.toFixed(4)} ${
                callbackData.token_name
              }`,
              type: 'info',
              ...callbackData,
            }),
          );
          saveLog(
            {
              amount: decoded.value.tokens,
              clientAddress: params.result.dst,
              created_at: (Date.now() + 10800000) / 1000,
              decimals: getDecimals(rootData.decimals),
              dst: callbackData.dst,
              name: decoded.name,
              tokenName: callbackData.token_name,
              tokenSymbol: callbackData.token_symbol,
              tonLiveID: callbackData.tonLiveID,
            },
            'sendTokens',
          );
        }

        if (decoded.name === 'deployLockStakeSafeCallback') {
          let checkedDuple = {
            amount: decoded.value.amount || 'default',
            created_at: params.result.created_at || 'default',
            name: decoded.name,
            payload: 'default',
            sender_address: decoded.value.sender_address || 'default',
            sender_wallet: decoded.value.sender_wallet || 'default',
            token_root: decoded.value.token_root || 'default',
            token_wallet: decoded.value.token_wallet || 'default',
            tonLiveID: params.result.id || 'default',
            updated_balance: decoded.value.updated_balance || 'default',
          };
          reduxStore.dispatch(
            setTips({
              message: `You stake to dePool ${
                Number(checkedDuple.amount) / 1000000000
              } EVERs`,
              type: 'info',
              ...checkedDuple,
            }),
          );
        }

        if (decoded.name === 'returnLiquidityCallback') {
          let checkedDuple = {
            created_at: params.result.created_at || 'default',
            name: decoded.name,
            tonLiveID: params.result.id || 'default',
          };

          const rootAaddress = await getDetailsFromTONtokenWallet(
            decoded.value.walletA,
          );
          const rootBaddress = await getDetailsFromTONtokenWallet(
            decoded.value.walletB,
          );
          const rootABaddress = await getDetailsFromTONtokenWallet(
            decoded.value.walletAB,
          );

          const rootAdetails = await getDetailsFromTokenRoot(rootAaddress);
          const rootBdetails = await getDetailsFromTokenRoot(rootBaddress);
          const rootABdetails = await getDetailsFromTokenRoot(rootABaddress);

          const provideData = {
            burnAB: Number(decoded.value.burnAB) / 1000000000,
            returnA:
              Number(decoded.value.returnA) /
              getDecimals(rootAdetails.decimals),
            returnB:
              Number(decoded.value.returnB) /
              getDecimals(rootBdetails.decimals),
            tokenABname: hex2a(rootABdetails.name),
            tokenABsymbol: hex2a(rootABdetails.symbol),
            tokenAname: hex2a(rootAdetails.name),
            tokenAsymbol: hex2a(rootAdetails.symbol),
            tokenBname: hex2a(rootBdetails.name),
            tokenBsymbol: hex2a(rootBdetails.symbol),
            walletA: decoded.value.walletA,
            walletAB: decoded.value.walletAB,
            walletB: decoded.value.walletB,
          };
          reduxStore.dispatch(
            setTips({
              message: `You return ${provideData.returnA.toFixed(4)} ${
                provideData.tokenAname || 'def'
              } and ${provideData.returnB.toFixed(4)} ${
                provideData.tokenBname || 'def'
              } payed ${provideData.burnAB.toFixed(6)} ${
                provideData.tokenABname || 'def'
              }`,
              type: 'info',
              ...checkedDuple,
              ...provideData,
            }),
          );
          saveLog(
            {
              burnAB: Number(decoded.value.burnAB),
              clientAddress: params.result.dst,
              created_at: (Date.now() + 10800000) / 1000,
              decimalsA: getDecimals(rootAdetails.decimals),
              decimalsB: getDecimals(rootBdetails.decimals),
              name: 'removeLiquidity',
              returnA: Number(decoded.value.returnA),
              returnB: Number(decoded.value.returnB),
              tokenABnameR: hex2a(rootABdetails.name),
              tokenABsymbolR: hex2a(rootABdetails.symbol),
              tokenAsymbolR: provideData.tokenAsymbol,
              tokenBsymbolR: provideData.tokenBsymbol,
              tonLiveID: checkedDuple.tonLiveID,
            },
            'removeLiquidity',
          );
        }

        if (decoded.name === 'processLiquidityCallback') {
          let checkedDuple = {
            created_at: params.result.created_at || 'default',
            name: decoded.name,
            tonLiveID: params.result.id || 'default',
          };

          const rootAaddress = await getDetailsFromTONtokenWallet(
            decoded.value.walletA,
          );
          const rootBaddress = await getDetailsFromTONtokenWallet(
            decoded.value.walletB,
          );
          const rootABaddress = await getDetailsFromTONtokenWallet(
            decoded.value.walletAB,
          );

          const rootAdetails = await getDetailsFromTokenRoot(rootAaddress);
          const rootBdetails = await getDetailsFromTokenRoot(rootBaddress);
          const rootABdetails = await getDetailsFromTokenRoot(rootABaddress);

          //
          // // console.log("hereii", curWalletData)
          //                 itemData.walletAddress = item[1];
          //                 itemData.symbol = hex2a(curRootData.decoded.output.value0.symbol);
          //                 itemData.tokenName = getFullName(itemData.symbol)
          //                 itemData.type = "PureToken"
          //                 itemData.owner_address = curWalletData.decoded.output.value0.owner_address
          //                 itemData.decimals = curRootData.decoded.output.value0.decimals
          //                 itemData.icon = iconGenerator(itemData.symbol)
          //                 itemData.rootAddress = curWalletData.decoded.output.value0.root_address;
          //                 itemData.balance = +curWalletData.decoded.output.value0.balance / getDecimals(curRootData.decoded.output.value0.decimals);

          const provideData = {
            amountA:
              Number(decoded.value.amountA) /
              getDecimals(rootAdetails.decimals),
            amountAB: Number(decoded.value.mintAB) / 1000000000,
            amountB:
              Number(decoded.value.amountB) /
              getDecimals(rootBdetails.decimals),
            provideA:
              Number(decoded.value.provideA) /
              getDecimals(rootAdetails.decimals),
            provideB:
              Number(decoded.value.provideB) /
              getDecimals(rootBdetails.decimals),
            tokenABname: hex2a(rootABdetails.name),
            tokenABsymbol: hex2a(rootABdetails.symbol),
            tokenAname: hex2a(rootAdetails.name),
            tokenAsymbol: hex2a(rootAdetails.symbol),
            tokenBname: hex2a(rootBdetails.name),
            tokenBsymbol: hex2a(rootBdetails.symbol),
            unusedReturnA:
              Number(decoded.value.unusedReturnA) /
              getDecimals(rootAdetails.decimals),
            unusedReturnB:
              Number(decoded.value.unusedReturnB) /
              getDecimals(rootBdetails.decimals),
            walletA: decoded.value.walletA,
            walletAB: decoded.value.walletAB,
            walletB: decoded.value.walletB,
          };
          reduxStore.dispatch(
            setTips({
              message: `You provided ${provideData.amountA.toFixed(4)} ${
                provideData.tokenAname || 'def'
              } and ${provideData.amountB.toFixed(4)} ${
                provideData.tokenBname || 'def'
              } for ${provideData.amountAB.toFixed(6)} ${
                provideData.tokenABname || 'def'
              }`,
              type: 'info',
              ...checkedDuple,
              ...provideData,
            }),
          );
          saveLog(
            {
              clientAddress: params.result.dst,
              created_at: (Date.now() + 10800000) / 1000,
              decimalsA: getDecimals(rootAdetails.decimals),
              decimalsB: getDecimals(rootBdetails.decimals),
              gotAB: Number(decoded.value.mintAB),
              name: 'addLiquidity',
              provideA: Number(decoded.value.provideA),
              provideB: Number(decoded.value.provideB),
              tokenAsymbolP: provideData.tokenAsymbol,
              tokenBsymbolP: provideData.tokenBsymbol,
              tonLiveID: checkedDuple.tonLiveID,
            },
            'addLiquidity',
          );
        }

        if (decoded.name === 'transferOwnershipCallback') {
          let checkedDuple = {
            created_at: params.result.created_at || 'default',
            name: decoded.name,
            tonLiveID: params.result.id || 'default',
          };
          const lockStakeData = await getDetailsFromDataContract(
            params.result.src,
          );
          if (lockStakeData.addrOwner === address) {
            reduxStore.dispatch(
              setTips({
                message: `You get lock stake ${
                  +lockStakeData.amountLockStake / 1000000000
                } EVERs`,
                type: 'info',
                ...checkedDuple,
                ...lockStakeData,
              }),
            );
          }

          if (lockStakeData.addrOwner !== address) {
            reduxStore.dispatch(
              setTips({
                message: `You send lock stake ${
                  +lockStakeData.amountLockStake / 1000000000
                } EVERs`,
                type: 'info',
                ...checkedDuple,
                ...lockStakeData,
              }),
            );
          }
        }

        if (decoded.name === 'tokensReceivedCallback') {
          console.log('client para', params, 'decoded22222', decoded);
          const decodedPayl = await decodePayload(decoded.value.payload);

          const payloadFlag = Number(decodedPayl.arg0);
          // console.log("fkn payload", decodedPayl.arg0);
          if (!checkMessagesAmountClient({ tonLiveID: params.result.id }))
            return;
          const rootD = await getDetailsFromTokenRoot(decoded.value.token_root);
          console.log('rootD', rootD);

          let checkedDuple = {
            amount:
              decoded.value.amount / getDecimals(rootD.decimals) || 'default',
            created_at: params.result.created_at || 'default',
            name: decoded.name,
            payload: decodedPayl,
            sender_address: decoded.value.sender_address || 'default',
            sender_wallet: decoded.value.sender_wallet || 'default',
            token_name: hex2a(rootD.name) || 'default',
            token_root: decoded.value.token_root || 'default',
            token_symbol: hex2a(rootD.symbol) || 'default',
            token_wallet: decoded.value.token_wallet || 'default',
            tonLiveID: params.result.id || 'default',
            updated_balance: decoded.value.updated_balance || 'default',
          };

          if (payloadFlag === 0) {
            const rootAddressA = await getDetailsFromTONtokenWallet(
              decodedPayl.arg1,
            );
            const rootAddressB = await getDetailsFromTONtokenWallet(
              decodedPayl.arg2,
            );

            const rootAdet = await getDetailsFromTokenRoot(rootAddressA);
            const rootBdet = await getDetailsFromTokenRoot(rootAddressB);

            const transactionData = {
              amountA:
                +decodedPayl.arg3 / getDecimals(Number(rootAdet.decimals)),
              amountB:
                +decodedPayl.arg4 / getDecimals(Number(rootBdet.decimals)),
              tokenAname: hex2a(rootAdet.name),
              tokenAsymbol: hex2a(rootAdet.symbol),
              tokenBname: hex2a(rootBdet.name),
              tokenBsymbol: hex2a(rootBdet.symbol),
              transactionType: transactionTypes[0],
            };
            reduxStore.dispatch(
              setTips({
                message: `You swapped ${transactionData.amountA.toFixed(4)} ${
                  transactionData.tokenAname
                } for ${transactionData.amountB.toFixed(4)} ${
                  transactionData.tokenBname
                }`,
                type: 'info',
                ...checkedDuple,
                ...transactionData,
              }),
            );
            saveLog(
              {
                amountAswap: +decodedPayl.arg3,
                amountBswap: +decodedPayl.arg4,
                clientAddress: params.result.dst,
                created_at: (Date.now() + 10800000) / 1000,
                decimalsA: getDecimals(Number(rootAdet.decimals)),
                decimalsB: getDecimals(Number(rootBdet.decimals)),
                name: 'swap',
                swapAsymbol: transactionData.tokenAsymbol,
                swapBsymbol: transactionData.tokenBsymbol,
                tonLiveID: checkedDuple.tonLiveID,
              },
              'swap',
            );
          } else if (payloadFlag === 8) {
            reduxStore.dispatch(
              setTips({
                message: `Something went wrong, swap failed`,
                type: 'error',
                ...checkedDuple,
              }),
            );
          } else if (payloadFlag === 1) {
            console.log('decodedPayl.arg0 === 1');

            reduxStore.dispatch(
              setTips({
                message: `Someone send y ${checkedDuple.amount} ${hex2a(
                  rootD.name,
                )}`,
                type: 'info',
                ...checkedDuple,
              }),
            );
          } else if (payloadFlag === 2) {
            console.log('decodedPayl.arg0 === 2');

            reduxStore.dispatch(
              setTips({
                message: `This one was your change ${
                  checkedDuple.amount
                } ${hex2a(rootD.name)}`,
                type: 'info',
                ...checkedDuple,
              }),
            );
          }
          // else if(payloadFlag ===7) {
          //         console.log("decodedPayl.arg0 === 3")
          //
          //         store.dispatch(setTips(
          //                 {
          //                     message: `You provide liquidity`,
          //                     type: "info",
          //                     ...checkedDuple
          //                 }
          //             ))
          //
          //     }
          else if (payloadFlag === 9) {
            console.log('decodedPayl.arg0 === 3');

            reduxStore.dispatch(
              setTips({
                message: `Provide liquidity was unsuccessful`,
                type: 'info',
                ...checkedDuple,
              }),
            );
          }
          // else if(payloadFlag ===6) {
          //         console.log("decodedPayl.arg0 === 3")
          //
          //         store.dispatch(setTips(
          //             {
          //                 message: `You return liquidity and get ${(Number(decoded.value.amount) / 1000000000).toFixed(4)} ${hex2a(rootD.name)}`,
          //                 type: "info",
          //                 ...checkedDuple
          //             }
          //         ))
          //
          //     }
          else if (payloadFlag === 4) {
            console.log('decodedPayl.arg0 === 3');

            reduxStore.dispatch(
              setTips({
                message: `You receive ${checkedDuple.amount.toFixed(4)} ${hex2a(
                  rootD.name,
                )}`,
                type: 'info',
                ...checkedDuple,
              }),
            );
          }

          // {body_type: 'Input', name: 'transferOwnershipCallback', value: {…}, header: null}
          // body_type: "Input"
          // header: null
          // name: "transferOwnershipCallback"
          // value:
          //     addrFrom: "0:18d4d2924826306634e811344ec217d621bafc55376d9653bbba2e59c2f5914d"
          // addrTo: "0:13bf1c036e1114ed956beb5014d383f81f5b559783c1d3b88220168659fd46bf"

          // store.dispatch(setSubscribeReceiveTokens(data))
        }
      }
    },
  );
  console.log('SUBSCRIBED TO client', address);
  return { status: 'success', subscribedAddress: address };
}

export async function subscribe(address) {
  await client.net.subscribe_collection(
    {
      collection: 'messages',
      filter: {
        dst: { eq: address },
      },
      limit: 1,
      order: [{ direction: 'DESC', path: 'created_at' }],
      result: 'id boc created_at body dst src',
    },
    async (params, responseType) => {
      if (responseType === ResponseType.Custom) {
        let decoded = await decode.message(
          DEXRootContract.abi,
          params.result.boc,
        );
        if (decoded === 304) {
          decoded = await decode.message(
            RootTokenContract.abi,
            params.result.boc,
          );
        }
        if (decoded === 304) {
          decoded = await decode.message(
            TONTokenWalletContract.abi,
            params.result.boc,
          );
        }
        if (decoded === 304) {
          decoded = await decode.message(
            SafeMultisigWallet.abi,
            params.result.boc,
          );
        }
        if (decoded === 304) {
          decoded = await decode.message(
            DEXPairContract.abi,
            params.result.boc,
          );
        }
        if (decoded === 304) {
          decoded = await decode.message(
            DEXClientContract.abi,
            params.result.boc,
          );
        }
        console.log('client params22', params, 'decoded22', decoded);

        if (decoded.name === 'transfer') {
          if (!checkMessagesAmountClient({ tonLiveID: params.result.id }))
            return;

          const rootAddress = await getDetailsFromTONtokenWallet(
            decoded.value.to,
          );
          console.log('rootAddress', rootAddress);
          const rootD = await getDetailsFromTokenRoot(rootAddress);
          console.log('rootD', rootD);
        }

        if (decoded.name === 'accept') {
          if (params.result.src !== Radiance.networks[2].rootWTONAddr) return;
          if (!checkMessagesAmountClient({ tonLiveID: params.result.id }))
            return;

          console.log('I am wton and i am here');
          let d = await getDetailsFromTokenRoot(params.result.src);

          const acceptedPairTokens = {
            amount: Number(decoded.value.tokens) / getDecimals(d.decimals),
            created_at: params.result.created_at,
            dst: params.result.dst,
            name: 'acceptedPairTokens',
            src: params.result.src,
            token_name: hex2a(d.name),
            token_symbol: hex2a(d.symbol),
            transactionID: params.result.id,
          };

          console.log('acceptedPairTokens', acceptedPairTokens);
          reduxStore.dispatch(
            setTips({
              message: `You get ${acceptedPairTokens.amount.toFixed(4)} ${hex2a(
                d.name,
              )}`,
              type: 'info',
              ...acceptedPairTokens,
            }),
          );
        }
      }
    },
  );
  console.log({ status: 'success', subscribedAddress: address });
  return { status: 'success', subscribedAddress: address };
}

export async function getPairsTotalSupply(pairAddress) {
  const acc = new Account(DEXPairContract, { address: pairAddress, client });
  try {
    const response = await acc.runLocal('totalSupply', {});
    return +response.decoded.output.totalSupply;
  } catch (e) {
    console.log('catch E', e);
    return e;
  }
}

export async function pairs(clientAddress) {
  console.log('clientAddress -------------', clientAddress);
  const acc = new Account(DEXClientContract, {
    address: clientAddress,
    client,
  });
  try {
    const response = await acc.runLocal('pairs', {});
    return response.decoded.output.pairs;
  } catch (e) {
    console.log('catch E', e);
    return e;
  }
}

export async function getClientAddrAtRootForShard(pubkey, n) {
  const acc = new Account(DEXRootContract, {
    address: Radiance.networks['2'].dexroot,
    client,
  });
  try {
    const response = await acc.runLocal('getClientAddress', {
      _answer_id: 0,
      clientPubKey: '0x' + pubkey,
      clientSoArg: n,
    });
    return response.decoded.output.value0;
  } catch (e) {
    console.log('catch E', e);
    return e;
  }
}

export async function getsoUINT(clientAddress) {
  const acc = new Account(DEXClientContract, {
    address: clientAddress,
    client,
  });
  try {
    const response = await acc.runLocal('soUINT', {});
    return response.decoded.output.soUINT;
  } catch (e) {
    console.log('catch E', e);
    return e;
  }
}

export async function getAllDataPrep(clientAddress) {
  const acc = new Account(DEXClientContract, {
    address: clientAddress,
    client,
  });
  try {
    const response = await acc.runLocal('getAllDataPreparation', {});
    return response.decoded.output;
  } catch (e) {
    console.log('catch E', e);
    return e;
  }
}

export async function getAllDataPreparation(clientAddress) {
  const acc = new Account(DEXClientContract, {
    address: clientAddress,
    client,
  });
  try {
    const response = await acc.runLocal('rootWallet', {});
    return response.decoded.output.rootWallet;
  } catch (e) {
    console.log('catch E', e);
    return e;
  }
}

export async function getConnectors(rootAddress) {
  const acc = new Account(DEXClientContract, { address: rootAddress, client });
  try {
    const response = await acc.runLocal('rootConnector', {});
    return response.decoded.output.rootConnector;
  } catch (e) {
    console.log('catch E', e);
    return e;
  }
}

export async function getSouint(connectorAddress) {
  const accConnector = new Account(DEXConnectorContract, {
    address: connectorAddress,
    client,
  });
  try {
    const response = await accConnector.runLocal('soUINT', {});
    return response.decoded.output.soUINT;
  } catch (e) {
    console.log('catch E', e);
    return e;
  }
}

export async function checkSouint(clientAddress) {
  try {
    let connectorsArr = await getConnectors(clientAddress);
    let souintArr = [];
    for (const item of Object.values(connectorsArr)) {
      let BIValue = Number(await getSouint(item));
      souintArr.push(BIValue);
    }
    return souintArr;
  } catch (e) {
    console.log('catch E', e);
    return e;
  }
}

/*
    DEV
*/
const secretKeys = {
  '0:0fa9e2a9993f55f41c90b050468f2f7909a391b7de3cb1b3df74bf449b4dae4c': {
    public: 'f574ac4095a3d3d8b267e4300bac4825ece723ed2569238a860149b683201a5c',
    secret: '96975ca89e99116a97a4850f0cc962e8d2630a80e4568d76b8e2f94a7addf312',
  },
  '0:8ed631b2691e55ddc65065e0475d82a0b776307797b31a2683a3af7b5c26b984': {
    public: '0ce403a4a20165155788f0517d1a455b4f1e82899f3782fadcf07413b2a56730',
    secret: 'e91e2e4e61d35d882a478bb21f77184b9aca6f93faedf6ed24be9e9bf032ef55',
  },
  '0:d1828255dc48d7db45e9e36c6ef5852319ecb6376bf95bf4e7c1a77d9f3590e0': {
    public: '04a88959a0b1b1655894343714ce7bc7c516c8195407ab6c8de8b64c92e7f172',
    secret: 'cd69d372dacd5f8fd0f8e6db120205bb128507df76b02064f6d01d90e8e3be04',
  },
  '0:d214d4779f63e062569a39d414a98c9891cf5e97cc790a3e6c62ce5fd0a5e1c9': {
    public: 'cdc97359b239a115d61364526052da837a85d396fa7cca76da015942657c9fad',
    secret: 'f5a05c6211db62ff076fb25a7c349033123f2a0b9aea97b673f2b83e378b3824',
  },
};

export async function mintTokens(walletAddress, clientAddress) {
  const countToken = 100;
  const rootData = await getAllDataPreparation(clientAddress.dexclient);
  let rootAddress = '';
  for (let walletId in rootData) {
    if (Object.prototype.hasOwnProperty.call(rootData, walletId)) {
      let wallet = rootData[walletId];
      if (wallet === walletAddress) rootAddress = walletId;
    }
  }
  console.log('rootData', rootData);
  const signer = signerKeys(secretKeys[rootAddress]);

  const curRootContract = new Account(RootTokenContract, {
    address: rootAddress,
    client,
    signer,
  });
  let usersGiver = [];
  if (localStorage.getItem('usersGiver') === null) {
    localStorage.setItem('usersGiver', JSON.stringify(usersGiver));
  } else usersGiver = JSON.parse(localStorage.getItem('usersGiver'));
  console.log('rootData[rootAddress]', rootData[rootAddress]);
  if (usersGiver.includes(rootData[rootAddress]) === false) {
    await transferFromGiver(rootData[rootAddress], 120000000);
    usersGiver.push(rootData[rootAddress]);
  }
  localStorage.setItem('usersGiver', JSON.stringify(usersGiver));

  let resf = await curRootContract
    .run('mint', {
      to: rootData[rootAddress],
      tokens: countToken * 1e9,
    })
    .catch((e) => {
      console.log('token giver error', e);
      return e;
    });
  console.log('resf', resf);
}

/*
 **** WALLET****
 */
export const getAssetsForDeploy = memoize(async () => {
  /*
        DONT DELETE
            // wton 0:0ee39330eddb680ce731cd6a443c71d9069db06d149a9bec9569d1eb8d04eb37
            // uni 0:471c9d737254a0044695c7e50ec5b8f6f94eadd49511b298d4a331b95106652b
            // weth 0:45f682b7e783283caef3f268e10073cf08842bce20041d5224c38d87df9f2e90
            // dai 0:95934aa6a66cb3eb211a80e99234dfbba6329cfa31600ce3c2b070d8d9677cef
            // usdt 0:751b6e22687891bdc1706c8d91bf77281237f7453d27dc3106c640ec165a2abf
            // usdc 0:1ad0575f0f98f87a07ec505c39839cb9766c70a11dadbfc171f59b2818759819
            // wbtc 0:6e76bccb41be2210dc9d7a4d0f3cbf0d5da592d0cb6b87662d5510f5b5efe497
    */

  const rootAddresses = [
    {
      id: '0:0ee39330eddb680ce731cd6a443c71d9069db06d149a9bec9569d1eb8d04eb37',
    },
    {
      id: '0:471c9d737254a0044695c7e50ec5b8f6f94eadd49511b298d4a331b95106652b',
    },
    {
      id: '0:45f682b7e783283caef3f268e10073cf08842bce20041d5224c38d87df9f2e90',
    },
    {
      id: '0:95934aa6a66cb3eb211a80e99234dfbba6329cfa31600ce3c2b070d8d9677cef',
    },
    {
      id: '0:751b6e22687891bdc1706c8d91bf77281237f7453d27dc3106c640ec165a2abf',
    },
    {
      id: '0:1ad0575f0f98f87a07ec505c39839cb9766c70a11dadbfc171f59b2818759819',
    },
    {
      id: '0:6e76bccb41be2210dc9d7a4d0f3cbf0d5da592d0cb6b87662d5510f5b5efe497',
    },
  ];

  console.log('rootAddresses', rootAddresses);
  const rootDataArray = [];

  console.log(
    'rootAddresses',
    rootAddresses.filter(
      (item) =>
        item.id ===
        '0:0ee39330eddb680ce731cd6a443c71d9069db06d149a9bec9569d1eb8d04eb37',
    ),
  );

  rootAddresses.map(async (item) => {
    const curRootData = await getDetailsFromTokenRoot(item.id);
    curRootData.tokenName = hex2a(curRootData.name);
    curRootData.symbol = hex2a(curRootData.symbol);
    curRootData.balance = curRootData.total_supply / 1000000000;
    curRootData.icon = iconGenerator(curRootData.symbol);
    curRootData.rootAddress = item.id;
    console.log('curRootData', curRootData);
    rootDataArray.push(curRootData);
  });

  console.log('rootDataArray', rootDataArray);
  return rootDataArray;
});

export async function queryByCode(code) {
  try {
    return (
      await client.net.query_collection({
        collection: 'accounts',
        filter: {
          code_hash: {
            eq: code,
          },
        },

        result: 'id',
      })
    ).result;
  } catch (error) {
    console.error(error);
  }
}

export async function getCodeHashFromNFTRoot() {
  const acc = new Account(NftRootContract, {
    address: rootAddrNFT,
    client,
  });
  try {
    const response = await acc.runLocal('resolveCodeHashData', {});

    console.log(
      'response.decoded.output.codeHashData.slice(2)',
      response.decoded.output.codeHashData.slice(2),
    );
    return response.decoded.output.codeHashData.slice(2);
  } catch (e) {
    console.log('catch E', e);
    return e;
  }
}

export async function agregateQueryNFTassets(addrClient) {
  const codeHash = await getCodeHashFromNFTRoot();
  if (codeHash.code) {
    return [];
  }
  const nftTokenItemAddress = await queryByCode(codeHash);
  console.log('nftTokenItemAddress', nftTokenItemAddress);
  if (!nftTokenItemAddress || !nftTokenItemAddress.length) return;

  const datainfo = [];
  let k = 0;
  for (const item of nftTokenItemAddress) {
    const dataNFT = await getDataInfo(item.id, addrClient);
    //todo add type
    if (dataNFT) {
      k++;
      dataNFT['type'] = 'DePoolStake';
      dataNFT['symbol'] = 'DP';
      dataNFT['tokenName'] = 'DP';
      dataNFT['icon'] = salary;
      dataNFT['balance'] = 1;
      dataNFT['showNftData'] = false;
      dataNFT['id'] = k;
      dataNFT['details'] = await getDetailsFromDataContract(dataNFT.addrData);
      datainfo.push({
        ...dataNFT,
        ...(await getLockStakeSafeInfo(dataNFT._safeLockStake)),
      });
    }
  }

  console.log('datainfo', datainfo);

  return datainfo;
}

export async function getDetailsFromDataContract(address) {
  const accNFTdata = new Account(DataContract, { address: address, client });
  try {
    const dataDetails = await accNFTdata.runLocal('getDetails', {});

    return dataDetails.decoded.output;
  } catch (e) {
    console.log('catch E', e);
    return e;
  }
}

export async function getLockStakeSafeInfo(address) {
  const acc = new Account(LockStakeSafeContract, { address: address, client });
  try {
    const depoolAddress = await acc.runLocal('depoolAddress', {});
    const depoolFee = await acc.runLocal('depoolFee', {});
    const depoolMinStake = await acc.runLocal('depoolMinStake', {});
    const stakeList = await acc.runLocal('stakeList', {});
    const stakeTotal = await acc.runLocal('stakeTotal', {});
    const withdrawTotal = await acc.runLocal('withdrawTotal', {});
    const onRoundCompleteList = await acc.runLocal('onRoundCompleteList', {});
    const receiveAnswerList = await acc.runLocal('receiveAnswerList', {});
    const onTransferList = await acc.runLocal('onTransferList', {});
    const depoolStakeReturn = await acc.runLocal('depoolStakeReturn', {});
    return {
      ...depoolAddress.decoded.output,
      ...depoolFee.decoded.output,
      ...depoolMinStake.decoded.output,
      ...stakeList.decoded.output,
      ...stakeTotal.decoded.output,
      ...withdrawTotal.decoded.output,
      ...onRoundCompleteList.decoded.output,
      ...receiveAnswerList.decoded.output,
      ...onTransferList.decoded.output,
    };
  } catch (e) {
    console.log('catch E', e);
    return e;
  }
}

export async function getDataInfo(address, addrClient) {
  const accNFTdata = new Account(DataContract, { address: address, client });
  try {
    const getInfo = await accNFTdata.runLocal('getInfo', {});
    const dataOwner = await accNFTdata.runLocal('getOwner', {});
    console.log('dataOwner', dataOwner, 'getInfo', getInfo);

    const safeLockStake = await accNFTdata.runLocal('_safeLockStake', {});
    //todo set owner address here
    console.log('addrClient', addrClient);
    if (dataOwner.decoded.output.addrOwner === addrClient) {
      return { ...getInfo.decoded.output, ...safeLockStake.decoded.output };
    }
  } catch (e) {
    console.log('catch E', e);
    return e;
  }
}

export async function getCodeHashFromTVC() {
  try {
    const code = (await client.boc.get_code_from_tvc({ tvc: DataContract.tvc }))
      .code;

    const hashCode = (await client.boc.get_boc_hash({ boc: code })).hash;

    console.log(`SetCode Multisig wallet code hash: ${hashCode}`);
    await queryByCode(hashCode);
    // Your can find all popular Smart contract hash codes at https://ton.live/contracts
  } catch (error) {
    if (error.code === 504) {
      console.error(
        `Network is inaccessible. You have to start TON OS SE using \`tondev se start\`.\n If you run SE on another port or ip, replace http://localhost endpoint with http://localhost:port or http://ip:port in index.js file.`,
      );
    } else {
      console.error(error);
    }
  }
}

const HD_PATH = "m/44'/396'/0'/0/0";

const SEED_PHRASE_WORD_COUNT = 12; //Mnemonic word count
const SEED_PHRASE_DICTIONARY_ENGLISH = 1; //Dictionary identifier
// let phrase = "net drift once march flip pudding palace famous regular grab crack cancel";

export async function getClientKeys(phrase) {
  //todo change with only pubkey returns
  try {
    return await client.crypto.mnemonic_derive_sign_keys({
      dictionary: SEED_PHRASE_DICTIONARY_ENGLISH,
      path: HD_PATH,
      phrase,
      word_count: SEED_PHRASE_WORD_COUNT,
    });
  } catch (e) {
    return e;
  }
}
