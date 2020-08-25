import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import User from "./models/User";
import {
  githubLoginCallback,
  facebookLoginCallback,
} from "./controllers/userController";
import routes from "./routes";
/**
 * Strategy 등록
 */
passport.use(User.createStrategy()); // Local 방식: username과 password를 이용한 방식
passport.use(
  // Github 방식
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:4000${routes.githubCallback}`,
    },
    githubLoginCallback
  )
);
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      callbackURL: `https://0710ba0c87cd.ngrok.io${routes.facebookCallback}`,
      profileFields: ["id", "displayName", "photos", "email"],
      scope: ["public_profile", "email"],
    },
    facebookLoginCallback
  )
);

/**
 * Serialization : 전달받은 객체(정보)를 세션에 저장하는 역할
 * De-Serialization : 서버로 들어오는 요청마다 세션 정보가 유효한 지를 검사하는 역할
 */
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
