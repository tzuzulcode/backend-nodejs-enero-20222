const express = require("express")
const Auth = require("../services/auth")
function auth(app){
    const router = express.Router()
    const authService = new Auth()
    app.use("/auth",router)

    router.post('/login',async (req,res)=>{
        const {email,password} = req.body
        const response = await authService.login(email,password)
        return res.cookie("token",response.token,{
            httpOnly:true,
            secure:true,
            sameSite:"none"
        })
        .json(response)
    })
    router.post('/signup',async (req,res)=>{
        const user = req.body
        const response = await authService.signup(user)
        return res.status(201).json(response)
    })

}

module.exports = auth