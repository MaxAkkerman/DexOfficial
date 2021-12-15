export default function hexToString(hex: string) {
  return Buffer.from(
    (hex.match(/.{2}/g) || []).map((s: string) => parseInt(s, 16)),
  ).toString();
}
