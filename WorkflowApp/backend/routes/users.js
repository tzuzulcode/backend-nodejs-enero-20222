const express = require("express")
const UserService = require("../services/users")

const users = (app)=>{
    const router = express.Router()
    const userService = new UserService()

    app.use("/users",router)


    router.get("/",async (req,res)=>{
        const users = await userService.getAll()

        return res.json(users)
    })
}


module.exports = users