// 사용할 모듈 import
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import { localsMiddleware } from "./middlewares";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";

import "./db";
import "./passport";

/**
 * Model
 */
import "./models/Video";
import "./models/Comment";
import "./models/User";

const app = express(); // express 서버 객체를 생성하여 app이라는 변수에 저장.

const CookieStore = MongoStore(session); // 서버가 재시작되어도 몽고DB에 세션 저장시켜놓아서 로그인 유지 가능.

/**
 * Set middleware.
 * (미들웨어 설정: 위치가 중요함. 해당 위치는 Global 영역이기 때문에 모든 페이지 접근 전에 동작됨.)
 */
app.use(helmet()); // 보안
app.set("view engine", "pug"); // View template engine 설정
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(cookieParser()); // 사용자 정보를 담고 있는 쿠키를 생성할 수 있음.
app.use(bodyParser.json()); // JSON 형태의 데이터를 읽을 수 있음.
// extended: true 옵션에 의해 qs 모듈을 사용하여 쿼리스트링 파싱
//-> req.body에 jSON 형식으로 저장되어 데이터 리딩 가능.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev")); // 로깅

// 사용자 인증 구간
app.use(
  session({
    secret: process.env.COOKIE_SECRET, // 세션의 암호화를 위한 것.
    resave: true, // 세션에 변화가 없어도 다시 저장할 건지를 설정.
    saveUninitialized: false, // 세션에 값이 없을 때 공백 값을 넣을 건지 설정
    store: new CookieStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);

/**
 * Routing.
 */
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
