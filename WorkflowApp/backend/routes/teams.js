const express = require("express")
const { isRegular } = require("../middleware/auth")

const Teams = require("../services/teams")

function teams(app){
    const router = express.Router()
    app.use("/teams",router)

    const teamsService = new Teams()

    router.get("/",isRegular,async(req,res)=>{
        const teams = await teamsService.listByUser(req.user.id)
        return res.json(teams)
    })

    router.post("/",isRegular,async (req,res)=>{
        const team = await teamsService.create(req.user.id,req.body)

        return res.json(team)
    })
}

module.exports = teams