import { Account } from '@tonclient/appkit';

import { NO_CONTEXT } from '@/constants/runtimeErrors';
import { DEXPairContract } from '@/extensions/contracts/DEXPair';

/**
 * @returns {Promise<number>} totalSupply
 */
export default async function getPairsTotalSupply(pairAddress) {
  if (!this || !this.context || !this.context.tonClient)
    throw new Error(NO_CONTEXT);

  const acc = new Account(DEXPairContract, {
    address: pairAddress,
    client: this.context.tonClient,
  });
  try {
    const response = await acc.runLocal('totalSupply', {});
    return +response.decoded.output.totalSupply;
  } catch (e) {
    console.log('catch E', e);
    return e;
  }
}
