import passport from "passport";
import User from "./models/User";

/**
 * Strategy
 */
passport.use(User.createStrategy()); // Strategy 객체 등록 -> 등록한 전략 데이터가 req._strategys에 기록된다.

/**
 * Serialization : 전달받은 객체(정보)를 세션에 저장하는 역할
 * De-Serialization : 서버로 들어오는 요청마다 세션 정보가 유효한 지를 검사하는 역할
 */
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
