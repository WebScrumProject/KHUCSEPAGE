import * as jwt from "jsonwebtoken";
import { refreshTokenExists } from "../libs/jwt";

async function verifyRefreshToken(req, res, next) {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res.status(403).json({
      error: "No refresh token provided",
    });
  }
  try {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_JWT_SECRET,
      async (err, payload) => {
        if (err) {
          return res.status(401).json({
            error: err.message,
          });
        }
        const existingRefreshToken = await refreshTokenExists(
          payload.normalize,
          refreshToken
        );
        if (!existingRefreshToken) {
          return res.status(401).json({
            error: "Invalid refresh token",
          });
        }
        req.user = payload;
        return next();
      }
    );
  } catch (err) {
    res.status(401).json({
      error: err.message,
    });
  }
}

export default verifyRefreshToken;
