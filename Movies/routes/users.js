const express = require("express")
const { verifyToken } = require("../middleware/auth")
const Users = require("../services/users")

function users(app){
    const router = express.Router()
    const usersService = new Users()
    app.use("/users",router)

    router.get('/:id',async (req,res)=>{
        const {id} = req.params
        const user = await usersService.get(id)
        return res.status(200).json(user)
    })
    router.get('/',verifyToken,async (req,res)=>{
        console.log(req.user)
        const users = await usersService.getAll()
        return res.status(200).json(users)
    })
    router.post('/',async (req,res)=>{
        const user = await usersService.create(req.body)
        return res.status(201).json(user)
    })

    router.put('/:id',async(req,res)=>{
        const {id} = req.params
        const user = await usersService.update(id,req.body)
        // put: 200 o 204
        return res.status(200).json(user)
    })
    router.delete('/:id',async(req,res)=>{
        const {id} = req.params
        const user = await usersService.delete(id)
        // delete: 200 o 202
        return res.status(200).json(user)
    })
}


module.exports = users