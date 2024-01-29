import passport from "passport";
import { client } from "./database";

const GoogleStrategy = require("passport-google-oauth20").Strategy;

module.exports = function (passport) {
  new GoogleStrategy(
    {
      clientID: process.env.OAUTH_ID,
      clientSecret: process.env.OAUTH_PW,
      callbackURL: "/login/redirect",
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: any
    ) => {
      try {
        client.exists(profile.id, (err: any, reply: any) => {
          if (err) throw err;
          if (reply == 1) {
            done(null, profile);
          } else {
            if (profile._json.hd == "khu.ac.kr") {
              register(profile);
              done(null, profile);
            } else {
              done(null, false);
            }
          }
        });
      } catch (error) {
        console.log(error);
        done(error);
      }
    }
  );
};
