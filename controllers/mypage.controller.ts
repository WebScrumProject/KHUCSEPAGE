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

export async function postImage(req: Request, res: Response) {
  try {
    const multerFile = req.file as Express.MulterS3.File;
    const imageUrl = multerFile.location;

    console.log(imageUrl);
    res.send(imageUrl);
  } catch (err) {
    res.status(500).send("Error posting profImage");
  }
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
    res.status(200).send(updatedUser);
  } catch (err) {
    res.status(500).send("Error updating User:", err.message);
  }
}

export function deleteUser(req, res) {
  const userId: string = req.user.googleId;

  try {
    const deletedUser = redisClient.hdel(userId);
    console.log(deletedUser);
    res.status(200).send(deletedUser).redirect("/");
  } catch (err) {
    console.error("Error deleting User: ", err.message);
  }
}
