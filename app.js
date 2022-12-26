const express = require("express");
const cookieparser = require("cookie-parser");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieparser());

/* Router */
const userRouter = require("./routes/userRouter.js");
const feedRouter = require("./routes/feedRouter.js");

app.use("/api", [userRouter, feedRouter]);
// 화면이 아닌 기능인 경우 URI에 /api를 붙여주는 관행,
// app.use() <- 미들웨어로서 웹서버에서 요청을 받거나 모든 요청에 대해 공통적인 처리를 할 때 씀

app.listen(port, () => {
    console.log(port, "번 포트로 서버가 켜졌습니다!!!!!!!!!!!!! 박현민 만세!!!!!!!!!!");
});
