const express = require("express")
const { isRegular } = require("../middleware/auth")

const Comments = require("../services/comments")

function tasks(app){
    const router = express.Router()

    const comments = new Comments()

    app.use("/comments",router)


    router.put("/:idComment",isRegular, async (req,res)=>{
        const comment =  comments.update(req.params.idComment,req.body)
        return res.json(comment)
    })
}

module.exports = tasks