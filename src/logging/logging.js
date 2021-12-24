export async function saveLog(data, type) {
  return await fetch(`https://logs.trade.defispace.com:9000/${type}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  });
}
