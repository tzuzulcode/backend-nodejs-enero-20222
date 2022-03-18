const express = require("express")
const { uploadFile } = require("../libs/storage")
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

    router.post("/",isRegular,async (req,res)=>{
        const team = await teamsService.create(req.user.id,req.body)
        // const team = await teamsService.create(req.user,req.body)

        return res.json(team)
    })

    router.post("/uploadTest",upload.single("image"),(req,res)=>{

        const file = req.file
        uploadFile(file.originalname,req.file.buffer)

        return res.json({success:true})
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
}

module.exports = teams