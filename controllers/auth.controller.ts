import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
  getAccessTokenFromGoogle,
  getGoogleAuthURL,
} from "../libs/googleoauth";
import { getUserDetails, upsertUser } from "../libs/userdetail";
import {
  appendRefreshToken,
  emptyRefreshTokens,
  generateJWT,
  generateRefreshJWT,
} from "../libs/jwt";

export async function googleLogin(req: Request, res: Response) {
  const url = getGoogleAuthURL();
  return res.redirect(url);
}

//소셜로그인 인증 및 유저정보를 가져오는데 성공하면 jwt토큰을 발급
export async function googleOauthHandler(req: Request, res: Response) {
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
    const url = await upsertUser({
      id: userDetails.id,
      email: userDetails.email,
      name: userDetails.name,
      picture: userDetails.picture,
      hd: userDetails.hd,
    });

    const googleId = userDetails.id;
    const email = userDetails.email;
    const name = userDetails.name;
    const type = userDetails.type;

    const token = generateJWT({ googleId, email, name, type }); //jwt생성

    const refreshToken = generateRefreshJWT({ email, name, type });
    //store refreshToken on redis
    await appendRefreshToken(email, refreshToken);

    // return res.status(200).json({
    //   token,
    //   refreshToken,
    // });

    res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000 });

    return res.redirect(url);
    //1시간동안 유효한 쿠키 설정
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: err.message,
    });
  }
}

export async function getTokenWithRefreshToken(req, res) {
  const { googleId, name, email, type } = req.user;
  const token = generateJWT({ googleId, email, name, type });
  return res.status(200).json({
    token,
  });
}

export async function logout(req, res) {
  const { email } = req.user;
  try {
    await emptyRefreshTokens(email);
    return res.status(200).json({
      message: "Logout succesful",
    });
  } catch (err) {
    return res.status(500).json({
      err: err.message,
    });
  }
}
