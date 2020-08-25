import mongoose from "mongoose";
import plm from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  facebookId: Number,
  githubId: Number,
});

// 사용자 인증에 필요한 username으로 어떤 속성을 설정시킬 것인지?
// login.pug에서 사용자의 id를 입력하는 input 태그의 name으로 어떤 것을 설정했는지 적어줌.
// usernameField처럼 passwordField도 있지만 디폴트 값으로 password라고 지정되어 있어 굳이 써주지 않았다.
UserSchema.plugin(plm, { usernameField: "email" });

const model = mongoose.model("User", UserSchema);

export default model;
