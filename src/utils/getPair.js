import { PAIR_NULL } from '../constants/runtimeErrors';
import getAllPairs from './getAllPairs';

/**
 * @typedef {Object} Pair
 * @property {string} addrPair
 * @property {string} rootA
 * @property {string} rootB
 */
/**
 * @param {string} addrPair
 * @returns {Promise<Pair>}
 */
export default async function getPair(addrPair) {
  const pairs = await getAllPairs();
  const pair = pairs.find((p) => p.addrPair === addrPair);
  if (!pair) throw new Error(PAIR_NULL);
  return pair;
}
