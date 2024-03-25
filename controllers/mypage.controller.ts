import { Request, Response } from "express";
import { redisClient } from "../libs/database";
import projectModel from "../models/projectSchema";
import ProjCardDTO from "../DTO/proj.dto";

export async function postImage(req: Request, res: Response) {
  try {
    const multerFile = req.file as Express.MulterS3.File;
    const imageUrl = multerFile.location;

    console.log(imageUrl);
    res.send(imageUrl);
  } catch (err) {
    res.status(500).send(`Error getting User Project: ${err}`);
  }
}

export async function getUserProject(req, res: Response) {
  const userId: string = req.user.googleId;

  try {
    const result = await projectModel.find({ id: userId });

    if (result) {
      const userProj: ProjCardDTO[] = result.map((data) => ({
        projTitle: data.title,
        projDate: data.date,
      }));
      res.send(userProj);
    } else {
      console.log("해당 id를 가진 project를 찾을 수 없습니다.");
    }
  } catch (err) {
    res.status(500).send(`Error getting User Project : ${err}`);
  }
}

export async function getAppliedProject(req, res: Response) {
  const userId: string = req.user.googleId;

  try {
    const result = await projectModel.find({ "apply.id": userId });
    console.log(result);
    if (result) {
      const userProj: ProjCardDTO[] = result.map((data) => ({
        projTitle: data.title,
        projDate: data.date,
      }));
      res.send(userProj);
    } else {
      console.log("해당 id를 가진 project를 찾을 수 없습니다.");
    }
  } catch (err) {
    res.status(500).send(`Error getting User Project : ${err}`);
  }
}

export async function getUserDetail(req, res: Response) {
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
  console.log(userId);
  try {
    const deletedUser = redisClient.del(userId);
    res.status(200).redirect("/");
  } catch (err) {
    console.error("Error deleting User: ", err.message);
  }
}
