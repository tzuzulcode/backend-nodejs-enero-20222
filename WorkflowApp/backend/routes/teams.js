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
        // const team = await teamsService.create(req.user,req.body)

        return res.json(team)
    })
    router.post("/addMember",async (req,res)=>{

        const team = await teamsService.addMember(req.body.idTeam,req.body.idNewMember)
        // const team = await teamsService.create(req.user,req.body)

        return res.json(team)
    })
    router.post("/changeRole",async (req,res)=>{

        const team = await teamsService.changeRole(req.body.idTeam,req.body.idMember,req.body.newRole)
        // const team = await teamsService.create(req.user,req.body)

        return res.json(team)
    })
}

module.exports = teams