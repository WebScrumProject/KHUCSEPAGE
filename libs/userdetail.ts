import axios from "axios";
import { redisClient } from "./database";
import { doesNotMatch } from "assert";

async function getUserDetails(access_token) {
  const url = "https://www.googleapis.com/oauth2/v2/userinfo";

  const response = await axios({
    url,
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  const userInfo = response.data;

  return userInfo;
}

function InsertUser(userDetails) {
  let info: string = userDetails.displayName;
  let name: string = "",
    college: string = "",
    major: string,
    add: boolean = false;
  let index: number = 0;
  for (let i = 0; i < info.length; i++) {
    if (info[i] != "[") name += info[i];
    else {
      index = i;
      break;
    }
  }
  for (let i = index + 1; i < info.length; i++) {
    if (add == true) college += info[i];
    if (info[i] == "(") {
      add = true;
    } else if (info[i] == " ") {
      index = i;
      add = false;
      break;
    }
  }
  major = info.substring(index + 1, info.length - 1);
  redisClient.hSet(userDetails.id, "username", name);
  redisClient.hSet(userDetails.id, "usercollege", college);
  redisClient.hSet(userDetails.id, "usermajor", major);
  redisClient.hSet(userDetails.id, "useremail", userDetails.emails[0].value);
  redisClient.hSet(userDetails.id, "userphone", "");
  redisClient.hSet(userDetails.id, "usertype", "newuser");
  redisClient.hSet(userDetails.id, "applyproj", JSON.stringify([]));
  redisClient.hSet(userDetails.id, "portfolio", JSON.stringify([]));
  redisClient.hSet(userDetails.id, "profileImage", userDetails._json.picture);
}

async function upsertUser(userDetails) {
  try {
    const reply = await redisClient.exists(userDetails.id);

    if (reply === 1) {
      console.log(`User already exists in Redis: ${userDetails}`);
    } else {
      if (userDetails._json.hd === "khu.ac.kr") {
        InsertUser(userDetails);
        console.log(`Succesfully insert in Redis: ${userDetails}`);

        const data = await redisClient.hmGet(
          userDetails.id,
          "useremail",
          "username"
        );

        const result = data.reduce((acc, value, index) => {
          const field = index === 0 ? "useremail" : "username";
          acc[field] = value;
          return acc;
        }, {});

        return result;
      } else {
        console.log("Try again with khu mail");
      }
    }
  } catch (err) {
    throw new Error(err.message);
  }
}

export { getUserDetails, upsertUser };
