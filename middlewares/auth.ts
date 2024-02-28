import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";

//authHeader가 존재하는지 확인하고 jwt를 verify하여 req.user에 토큰의 페이로드 정보를 담는다.

function isLoggedIn(req: Request, res: Response, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(403).json({
      error: "No authorization header defined",
    });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({
        error: err.message,
      });
    }
    req.user = user;
    next();
  });
}

export default isLoggedIn;
