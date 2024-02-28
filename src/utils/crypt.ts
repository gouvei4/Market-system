import crypto from 'crypto';

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function encrypt(type: string, data: any) {
  return crypto.createHash(type).update(data, 'binary').digest('hex');
}

export function generateBigInt() {
  const randomNumber = Math.floor(100000 + Math.random() * 900000).toString();
  const bigIntNumber = BigInt(randomNumber);
  return bigIntNumber.toString();
}
