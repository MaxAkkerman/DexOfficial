import { Account } from '@tonclient/appkit';

import { FUNC_FAIL, NO_CONTEXT } from '@/constants/runtimeErrors';
import { DEXRootContract } from '@/extensions/contracts/DEXRoot';

/**
 * @returns {Promise<{
 *	addrPair: string,
 *	rootA: string,
 *	rootB: string,
 * }[]>} pairs
 */
export default async function getAllPairs() {
  if (!this.context.dexRootAddress || !this.context.tonClient)
    throw new Error(NO_CONTEXT);

  const rootAcc = new Account(DEXRootContract, {
    address: this.networkAddress,
    client: this.tonClient,
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
}
