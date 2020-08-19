import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { userRouter } from "./router";

const app = express(); // express 서버를 생성하여 app이라는 변수에 저장.

const handleHome = (req, res) => res.send("Hello from home.");

const handleProfile = (req, res) => res.send("You are on my profile.");

/**
 * Set middleware. (미들웨어 설정: 위치가 중요함. 해당 위치는 Global 영역이기 때문에 모든 페이지 접근 전에 동작됨.)
 */
app.use(helmet()); // 보안
app.use(morgan("dev")); // 로깅
app.use(cookieParser()); // 사용자 정보를 담고 있는 쿠키를 생성할 수 있음.
app.use(bodyParser.json()); // JSON 형태의 데이터를 읽을 수 있음.
app.use(bodyParser.urlencoded({ extended: true })); // extended: true 옵션에 의해 qs 모듈을 사용하여 쿼리스트링 파싱 -> req.body에 jSON 형식으로 저장되어 데이터 리딩 가능.

/**
 * Routing web page address (URL로 페이지 접근 가능하게 함.)
 */
app.get("/", handleHome);
app.get("/profile", handleProfile)

app.use("/user", userRouter);

export default app;
