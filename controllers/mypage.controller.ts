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
import { redisClient } from "../libs/database";

export function welcome(req, res) {
  res.send.json({
    message: `Hello ${req.user.googleId}, Welcome to the mypage route`,
  });
}

export async function getUserDetail(req, res) {
  const userId: string = req.user.googleId;
  try {
    const foundUser = await redisClient.hgetall(userId);
    res.send(foundUser);
  } catch (err) {
    res.status(500).send("Error getting User Detail");
  }
}

export async function putUserDetail(req, res) {
  const userId: string = req.user.googleId;

  const {
    usermajor,
    userphone,
    userimage,
    useremail,
    usertype,
    usercollege,
    username,
  } = req.body;

  try {
    const updatedUser = redisClient.hmset(userId, {
      usermajor,
      userphone,
      userimage,
      useremail,
      usertype,
      usercollege,
      username,
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).send("Error updating User");
  }
}
