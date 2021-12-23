import { Account } from '@tonclient/appkit';

import { FUNC_FAIL, NO_CONTEXT } from '@/constants/runtimeErrors';
import { LimitOrderRootContract } from '@/extensions/contracts/LimitOrderRoot';

/**
 * @param {string} rootAddress
 * @returns {Promise<string>} routerAddress
 */
export default async function getRouterAddress() {
  if (
    !this ||
    !this.context ||
    !this.context.limitRootAddress ||
    !this.context.tonClient
  )
    throw new Error(NO_CONTEXT);

  const rootAcc = new Account(LimitOrderRootContract, {
    address: this.context.limitRootAddress,
    client: this.context.tonClient,
  });

  let res = await rootAcc.runLocal('_deployedRouter', {});
  if (!res.decoded) throw new Error(FUNC_FAIL);
  const { _deployedRouter } = res.decoded.output;
  console.log('LimitOrderRoot->deployed_router_address', _deployedRouter);

  return _deployedRouter;
}
