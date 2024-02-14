import * as jwt from "jsonwebtoken";
import { redisClient } from "./database";

function generateJWT({ email, name }) {
  const token = jwt.sign(
    {
      email,
      name,
    },
    process.env.JWT_SECRET,
    { expiresIn: 60 * 5 }
  );
  return token;
}

function generateRefreshJWT({ email, name }) {
  const refreshToken = jwt.sign(
    {
      email,
      name,
    },
    process.env.REFRESH_JWT_SECRET,
    { expiresIn: "150d" }
  );

  return refreshToken;
}

async function appendRefreshToken(user, refreshToken) {
  try {
    await redisClient.sAdd(user, refreshToken);
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

export {
  generateJWT,
  generateRefreshJWT,
  appendRefreshToken,
  emptyRefreshTokens,
};
