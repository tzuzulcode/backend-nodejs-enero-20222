const express = require("express")
const { isRegular } = require("../middleware/auth")
const upload = require("../middleware/upload")

const Teams = require("../services/teams")

function teams(app){
    const router = express.Router()
    app.use("/teams",router)

    const teamsService = new Teams()

    router.get("/",isRegular,async(req,res)=>{
        const teams = await teamsService.listByUser(req.user.id)
        return res.json(teams)
    })

    router.get("/:id",isRegular,async(req,res)=>{
        const team = await teamsService.get(req.params.id)
        return res.json(team)
    })

    router.post("/",isRegular,upload.single("img"),async (req,res)=>{
        const team = await teamsService.create(req.user.id,req.body,req.file)
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

    router.delete("/removeMember",async (req,res)=>{
        const team = await teamsService.deleteMember(req.body.idTeam,req.body.idMember)
        // const team = await teamsService.create(req.user,req.body)

        return res.json(team)
    })
    router.post("/:idTeam/addList",async (req,res)=>{

        const list = await teamsService.addList(req.params.idTeam,req.body)

        return res.json(list)
    })

    router.put("/:idTeam",async (req,res)=>{
        const team = await teamsService.update(req.params.idTeam,req.body)

        return res.json(team)
    })
    
    router.delete("/:idTeam/removeList/:idList",async (req,res)=>{
        
        const list = await teamsService.removeList(req.params.idTeam,req.params.idList)
        
        return res.json(list)
    })
    router.delete("/:idTeam",async (req,res)=>{
        const team = await teamsService.delete(req.params.idTeam)

        return res.json(team)
    })
}

module.exports = teams