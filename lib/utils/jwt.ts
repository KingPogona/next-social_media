// utils/jwt.ts
import { SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode('your-secret-key'); // Use a secure key

export async function createToken(payload: Record<string, unknown>): Promise<string> {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(secret);
  return token;
}

export async function verifyToken(token: string): Promise<object | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}
