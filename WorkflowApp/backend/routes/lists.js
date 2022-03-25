const express = require("express")
const { isRegular } = require("../middleware/auth")

const Lists = require("../services/lists")

function lists(app){
    const router = express.Router()

    const listService = new Lists()

    app.use("/lists",router)

    router.post("/addTask",isRegular,(req,res)=>{
        return res.json({data:"Hola"})
    })

    router.put("/:idList",(req,res)=>{
        const list =  listService.update(req.params.idList,req.body)
        return res.json(list)
    })
}

module.exports = lists