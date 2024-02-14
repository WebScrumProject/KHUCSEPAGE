import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
  getAccessTokenFromGoogle,
  getGoogleAuthURL,
} from "../libs/googleoauth";
import getUserDetails, { upsertUser } from "../libs/userdetail";
import {
  appendRefreshToken,
  emptyRefreshTokens,
  generateJWT,
  generateRefreshJWT,
} from "../libs/jwt";

async function googleLogin(req: Request, res: Response) {
  const url = getGoogleAuthURL();
  return res.status(200).json({
    url,
  });
}
async function googleOauthHandler(req: Request, res: Response) {
  const code = req.query.code;
  try {
    const access_token = await getAccessTokenFromGoogle(code);
    const userDetails = await getUserDetails(access_token);

    if (!userDetails.verified_email) {
      return res.status(403).json({
        error: "You have not verified your google account",
      });
    }
    //update or insert user details on the database
    const data = await upsertUser({
      userDetails,
    });
    console.log(data);

    //upsertUser하고 반환되는 값을 통해서 email name을 할당하려고 했지만 잘 안돼서 임시로..
    const email = userDetails.email;
    const name = userDetails.name;

    const token = generateJWT({ email, name });

    const refreshToken = generateRefreshJWT({ email, name });

    //store refreshToken on redis
    await appendRefreshToken(email, refreshToken);

    return res.status(200).json({
      token,
      refreshToken,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: err.message,
    });
  }
}

async function getTokenWithRefreshToken(req, res) {
  const { name, email } = req.user;
  const token = generateJWT({ email, name });
  return res.status(200).json({
    token,
  });
}

async function logout(req, res) {
  const { name } = req.user;
  try {
    await emptyRefreshTokens(name);
    return res.status(200).json({
      message: "Logout succesful",
    });
  } catch (err) {
    return res.status(500).json({
      err: err.message,
    });
  }
}

module.exports = {
  googleLogin,
  googleOauthHandler,
  getTokenWithRefreshToken,
  logout,
};
