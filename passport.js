import passport from "passport";
import GithubStrategy from "passport-github";
import User from "./models/User";
import { githubLoginCallback } from "./controllers/userController";
import routes from "./routes";
/**
 * Strategy 등록
 */
passport.use(User.createStrategy()); // Local
passport.use(
  // Github
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:4000${routes.githubCallback}`,
    },
    githubLoginCallback
  )
);

/**
 * Serialization : 전달받은 객체(정보)를 세션에 저장하는 역할
 * De-Serialization : 서버로 들어오는 요청마다 세션 정보가 유효한 지를 검사하는 역할
 */
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
