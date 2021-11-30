import { Account } from '@tonclient/appkit';
import { memoize } from 'lodash';

import { FUNC_FAIL } from '../constants/runtimeErrors';
import { RootTokenContract } from '../extensions/contracts/RootTokenContract';
import client from '../extensions/sdk_get/get';

const getCached = memoize(async (rootAddress) => {
  let tokenAcc = new Account(RootTokenContract, {
    address: rootAddress,
    client,
  });

  const res = await tokenAcc.runLocal('getDetails', {
    _answer_id: 0,
  });
  if (!res.decoded) throw new Error(FUNC_FAIL);

  return res.decoded.output.value0;
});

export default async function getTokenInfo(rootAddress) {
  const cached = await getCached(rootAddress);
  return cached;
}
