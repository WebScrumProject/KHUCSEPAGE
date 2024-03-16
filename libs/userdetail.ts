import axios from "axios";
import { redisClient } from "./database";

interface InsertedUser {
  userid?: string;
  useremail?: string;
  username?: string;
  usertype?: string;
}

interface SessionUser {
  userid: string;
  useremail: string;
  username: string;
  userimage: string;
}

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
    userimage: picture,
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

//1. khu메일인지 확인하고 2-1. redis에 이미 존재하는 user이면 main으로 바로 리다이렉션 2-2. redis에 존재하지 않는 유저면 InsertUser하고 리다이렉션
async function upsertUser({ id, email, name, picture, hd }) {
  // const url = "/";
  try {
    const reply = await redisClient.exists(id);
    if (reply === 1) {
      console.log(`User already exists in Redis: ${id}`);
      return;
      // return url;
    }

    InsertUser({ id, email, name, picture, hd });
    console.log(`Successfully insert in Redis: ${id}`);
    // return url;
  } catch (err) {
    // throw new Error(err.message);
    console.log(err.message);
  }
}

// async function upsertUser({ id, email, name, picture, hd }) {
//   if (hd === "khu.ac.kr") {
//     try {
//       const reply = await redisClient.exists(id);
//       if (reply === 1) {
//         console.log(`User already exists in Redis: ${id}`);

//       } else {
//         InsertUser({ id, email, name, picture, hd });
//         console.log(`Successfully insert in Redis: ${id}`);
//       }
//       const data = await redisClient.hmget(
//         id,
//         "useremail",
//         "username",
//         "usertype"
//       );
//       const result: InsertedUser = data.reduce((acc, value, index) => {
//         switch (index) {
//           case 0:
//             acc.useremail = value;
//             break;
//           case 1:
//             acc.username = value;
//             break;
//           case 2:
//             acc.usertype = value;
//             break;
//           default:
//             break;
//         }
//         return acc;
//       }, {} as InsertedUser);
//       result.userId = id;

//       return result;
//     } catch (err) {
//       throw new Error(err.message);
//     }
//   } else {
//     console.log("Try again with khu email");
//   }
// }

export { getUserDetails, upsertUser };
