/*
    이 파일이 존재하는이유 ?

    로그인이 되어있는지 안되어있는지 체크해주는 미들웨어

    1. 로그인 상태를 체크하기 위해서 우리가 어떤 값을 가지고 체크를 할건지?
     = token 

    2. token 값은 암호화가 되어있다.... 그럼 이걸 어떻게 해야할까?
    = 복호화 해야겠네?

    3. 어? 그러면 암호화를 할때 무엇을 가지고 암호화를 했지?
    = { userId }, "secret", 만료시간
    = 복호화를 하면? userId 다시알아올수있겠네?
    
    4. DB에서 해당하는 유저의 정보를 한번 싹 뽑아오자! async await

    5. 4번에서 뽑아온 유저의 정보를 local 서버에 저장 해놓자!

    6. next()
*/
const jwt = require("jsonwebtoken");

const {User} = require("../models/index.js");

module.exports = async (req, res, next) => {
    // 1. 로그인 상태를 체크하기 위해서 우리가 어떤 값을 가지고 체크를 할건지?
    try {
        const token = req.cookies.token;
        // 토큰이 없다면...?
        if (!token) {
            res.status(400).json({msg: "로그인이 필요합니다."});
            return;
        }

        // 2. token 값은 암호화가 되어있다.... 그럼 이걸 어떻게 해야할까?
        // 3. 어? 그러면 암호화를 할때 무엇을 가지고 암호화를 했지?
        const {userId} = jwt.verify(token, "mysecretkey");

        // 4. DB에서 해당하는 유저의 정보를 한번 싹 뽑아오자! async await
        const user = await User.findOne({
            where: {userId},
        });

        // 5. 4번에서 뽑아온 유저의 정보를 local 서버에 저장 해놓자!
        res.locals.user = user;

        //6. next()
        next();
    } catch (error) {
        console.log(error);
    }
};
