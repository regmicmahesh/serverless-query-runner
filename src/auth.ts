import passport from "passport";
import { Strategy as GithubStrategy } from "passport-github2";
import { getEnv } from "./utils";

const allowedUsernames = getEnv("GITHUB_ALLOWED_USERNAMES").split(",");

type HandleGithubCallback = (
  accessToken: string,
  refreshToken: string,
  profile: any,
  done: Function
) => void;

const handleGithubCallback: HandleGithubCallback = (
  accessToken,
  refreshToken,
  profile,
  done
) => {
  const { username } = profile;

  if (!allowedUsernames.includes(username)) {
    return done(new Error("Unauthorized"), false);
  }

  return done(null, profile);

};

passport.use(
  new GithubStrategy(
    {
      clientID: getEnv("GITHUB_CLIENT_ID"),
      clientSecret: getEnv("GITHUB_CLIENT_SECRET"),
      callbackURL: getEnv("GITHUB_CALLBACK_URL"),
    },
    handleGithubCallback
  )
);

passport.serializeUser(function (user: any, done) {
  const { id, username } = user;
  return done(null, { id, username });
});

passport.deserializeUser(function (obj: any, done) {
  done(null, obj);
});

export default passport;
