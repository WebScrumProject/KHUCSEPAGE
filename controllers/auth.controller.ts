import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
  getAccessTokenFromGoogle,
  getGoogleAuthURL,
} from "../libs/googleoauth";
import getUserDetails, { upsertUser } from "../libs/userdetail";
import {
  appendRefreshToken,
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


    const token = generateJWT({ data.useremail, name });

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
