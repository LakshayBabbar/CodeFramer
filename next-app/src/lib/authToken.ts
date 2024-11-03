import { SignJWT, jwtVerify } from "jose";

type payloadType = {
  id: string;
  username: string;
};

export async function generateToken(payload: payloadType, secret: string) {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 8 * 24 * 60 * 60;

  const token = await new SignJWT({ ...payload, iat, exp })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(iat)
    .setExpirationTime(exp)
    .sign(new TextEncoder().encode(secret));

  return token;
}

export async function verifyToken(token: string, secret: string) {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret)
    );
    return { payload };
  } catch (error) {
    return { error };
  }
}
