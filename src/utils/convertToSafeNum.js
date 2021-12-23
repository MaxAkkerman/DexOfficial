/**
 * @param {number} unsafeNum - Number which can be in decimals or in scientific notation
 * @return {string} safeNum - Number in a full width
 */
export default function convertToInt(unsafeNum) {
  return BigInt(Math.round(unsafeNum)).toString();
}
