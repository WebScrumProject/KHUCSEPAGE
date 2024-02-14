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

function InsertUser({ id, email, name, picture, hd }) {
  let username: string = "",
    college: string = "",
    major: string,
    add: boolean = false;
  let index: number = 0;
  for (let i = 0; i < name.length; i++) {
    if (name[i] != "[") username += name[i];
    else {
      index = i;
      break;
    }
  }
  for (let i = index + 1; i < name.length; i++) {
    if (add == true) college += name[i];
    if (name[i] == "(") {
      add = true;
    } else if (name[i] == " ") {
      index = i;
      add = false;
      break;
    }
  }
  major = name.substring(index + 1, name.length - 1);

  const user = {
    username: name,
    usercollege: college,
    usermajor: major,
    useremail: email,
    userphone: "",
    usertype: "newuser",
  };

  redisClient.hmset(id, user, (err, reply) => {
    if (err) {
      console.error(err);
    } else {
      console.log(reply);
    }
  });

  // redisClient.hset(id, "username", name);
  // redisClient.hset(userDetails.id, "usercollege", college);
  // redisClient.hset(userDetails.id, "usermajor", major);
  // redisClient.hset(userDetails.id, "useremail", userDetails.emails[0].value);
  // redisClient.hset(userDetails.id, "userphone", "");
  // redisClient.hset(userDetails.id, "usertype", "newuser");
  // redisClient.hset(userDetails.id, "applyproj", JSON.stringify([]));
  // redisClient.hset(userDetails.id, "portfolio", JSON.stringify([]));
  // redisClient.hset(userDetails.id, "profileImage", userDetails._json.picture);
}

async function upsertUser({ id, email, name, picture, hd }) {
  try {
    const reply = await redisClient.exists(id);

    if (reply === 1) {
      console.log(`User already exists in Redis: ${id}`);
    } else if (hd === "khu.ac.kr") {
      InsertUser({ id, email, name, picture, hd });
      console.log(`Succesfully insert in Redis: ${id}`);
    } else {
      console.log("Try again with khu mail");
    }
    const data = await redisClient.hmget(id, "useremail", "username");

    const result = data.reduce((acc, value, index) => {
      const field = index === 0 ? "useremail" : "username";
      acc[field] = value;
      return acc;
    }, {});

    return result;
  } catch (err) {
    throw new Error(err.message);
  }
}

export { getUserDetails, upsertUser };
