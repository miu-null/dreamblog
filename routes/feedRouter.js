const express = require("express");
const router = express.Router();
const {Feed, User} = require("../models/index.js");
const auth = require("../middleware/auth.js");

// 전체 피드 가져오기 API
router.get("/feeds", async (req, res) => {
    try {
        const feeds = await Feed.findAll({
            // join
            // required: true => Inner Join
            include: [
                {
                    model: User,
                    attributes: ["userName"],
                    required: true,
                },
            ],
        });
        // [{},{}]z
        // findOne {}
        if (feeds.length === 0) {
            // 게시글이 없음
            return res.status(400).json({msg: "글이 없습니다."});
        }

        // durl!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        return res.status(200).json({feeds});
    } catch (err) {
        console.log(err);
    }
});

// 글 상세조회 API

// 피드에 글 작성하기 API
router.post("/feed", auth, async (req, res) => {
    try {
        const {subject, content} = req.body;
        // 글은 누가씀? 어떤새끼가 이글을 씀?
        const {userId} = res.locals.user.dataValues;

        if (userId) {
            // DB저장을 하는데? 데이터 뭘넣어줄지를 제대로 확인하자!
            await Feed.create({subject, content, userId});
            
            return res.status(200).json({msg: "글 작성이 완료됨"});   
        }
    } catch (err) {
        console.log(err);
    }
});

//  try{
//     // 필요한건 다 했다! 근데 조금 더 생각이란걸 해보자!
// const { subject, content } = req.body;
// await Feed.create({subject, content});
// return res.status(200).json({msg: "글 작성이 완료되었습니다."})

// }

// catch(err){}

// 피드에 글 수정하기 API

// 피드에 글 삭제하기 API

module.exports = router;
