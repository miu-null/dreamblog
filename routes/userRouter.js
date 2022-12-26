const express = require("express");
const router = express.Router();
const {User} = require("../models/index.js");
const jwt = require("jsonwebtoken");

//회원가입
router.post("/register", async (req, res) => {
    try {
        const {userName, passWord, pass2} = req.body;
        /*
        body = {
            userName,
            passWord,
            pass2
        }
    */
        // 1. 비밀번호와 비밀번호확인 입력받은 값이 일치하는지!
        if (passWord !== pass2) {
            return res.status(400).json({msg: "비밀번호 값이 일치하지 않습니다"});
        }

        // 2. DB에 넣는다
        await User.create({userName, passWord});
        return res.status(200).json({msg: "가입을 축하합니다!"});
    } catch (err) {
        console.log(err);
    }
});

//로그인
router.post("/signin", async (req, res) => {
    /*
            const name = req.body.name; 기본 할당
            const {name} = req.body; 객체구조분해할당
     */
    try {
        const {userName, passWord} = req.body;

        // 1. db에서 정보를 꺼냄
        /*
            user = {
                userId : "",
                userName: "",
                passWord : "",
            }
        */
        /*
            sql = "SELECT * FROM Users WHERE userName = '입력받은 userName'"
        */
        const user = await User.findOne({
            where: {userName},
        });
        // 2. 입력받은 패스워드와  닉네임으로 찾아온 유저의 DB에저장되어있는 패스워드를 비교
        if (passWord !== user.passWord) {
            return res.status(400).json({msg: "비밀번호 값이 일치하지 않습니다"});
        }

        // 3. 비교했는데 맞아!
        // 3-1 유저의 정보를 가지고 JWT TOKEN을 생성
        const token = jwt.sign({userId: user.userId}, "mysecretkey", {expiresIn: "1d"});

        // 3-2 생성한 token을 cookie에 실어
        // res.cookie('이름', 보낼값)
        res.cookie("token", token);
        // 4. 성공메시지 리턴

        return res.status(200).json({msg: "로그인 성공", token});
    } catch (err) {
        console.log(err);
    }
});

//로그아웃 / 처리결과값(쿠키 삭제)가 코드에 영향을 미치지 않음. 쿠키삭제후 남는 결과물이 없음
router.get("/signout", (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({msg: "잘가시오"});
});

module.exports = router;
