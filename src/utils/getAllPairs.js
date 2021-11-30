import { Account } from '@tonclient/appkit';
import { memoize } from 'lodash';

import { FUNC_FAIL } from '../constants/runtimeErrors';
import { DEXRootContract } from '../extensions/contracts/DEXRoot';
import Radiance from '../extensions/Radiance.json';
import client from '../extensions/sdk_get/get';

/**
 * @typedef {Object} Pair
 * @property {string} addrPair
 * @property {string} rootA
 * @property {string} rootB
 */
/**
 * @returns {Promise<Pair[]>} pairs
 */
const getAllPairs = memoize(async () => {
  const rootAcc = new Account(DEXRootContract, {
    address: Radiance.networks[2].dexroot,
    client,
  });

  const res = await rootAcc.runLocal('pairs', {});
  if (!res.decoded) throw new Error(FUNC_FAIL);
  const { pairs } = res.decoded.output;
  console.log('DEXRoot->pairs', pairs);

  const pairList = [];
  Object.entries(pairs).forEach(([addrPair, { root0, root1 }]) => {
    pairList.push({ addrPair, rootA: root0, rootB: root1 });
  });

  return pairList;
});

export default getAllPairs;
