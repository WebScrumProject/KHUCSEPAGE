import * as jwt from "jsonwebtoken";
import { redisClient } from "./database";

function generateJWT({ googleId, email, name, type }) {
  const token = jwt.sign(
    {
      googleId,
      email,
      name,
      type,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" } //1시간 후 만료
  );
  return token;
}

function generateRefreshJWT({ email, name, type }) {
  const refreshToken = jwt.sign(
    {
      email,
      name,
      type,
    },
    process.env.REFRESH_JWT_SECRET,
    { expiresIn: "10d" }
  );

  return refreshToken;
}

async function appendRefreshToken(user, refreshToken) {
  try {
    await redisClient.sadd(user, refreshToken);
    return;
  } catch (err) {
    throw new Error(`Redis client error refreshingtoken: ${err.message}`);
  }
}

async function emptyRefreshTokens(user) {
  try {
    await redisClient.del(user);
    return;
  } catch (err) {
    throw new Error(`Redis client error: ${err.message}`);
  }
}

async function refreshTokenExists(user, refreshToken) {
  try {
    const refreshTokenExistence = await redisClient.sismember(
      user,
      refreshToken
    );
    return refreshTokenExistence;
  } catch (err) {
    throw new Error(`Redis client error: ${err.message}`);
  }
}

export {
  generateJWT,
  generateRefreshJWT,
  appendRefreshToken,
  emptyRefreshTokens,
  refreshTokenExists,
};
