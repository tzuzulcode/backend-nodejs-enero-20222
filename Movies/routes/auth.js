const express = require("express")
const Auth = require("../services/auth")
function auth(app,passport){
    const router = express.Router()
    const authService = new Auth()
    app.use("/auth",router)

    router.post('/login',async (req,res)=>{
        const {email,password} = req.body
        console.log(req.body)
        const response = await authService.login(email,password)
        return res.cookie("token",response.token,{
            httpOnly:true,
            sameSite:"none",
            secure:true,
        })
        .json(response)
    })
    router.post('/signup',async (req,res)=>{
        const user = req.body
        const response = await authService.signup(user)
        return res.cookie("token",response.token,{
            httpOnly:true,
            sameSite:"none",
            secure:true,
        })
        .json(response)
    })

    router.post('/logout',(req,res)=>{
        return res.cookie("token","",{
            httpOnly:true,
            sameSite:"none",
            secure:true,
            expires:new Date()
        }).json({loggedOut:true})
    })

    router.get('/google',passport.authenticate("google",{
        scope:['email','profile']
    }))
    router.get('/google/callback',passport.authenticate("google"),async (req,res)=>{
        const response = await authService.loginGoogle(req.user.profile)
        return res.cookie("token",response.token,{
            httpOnly:true,
            // sameSite:"none",
            // secure:true,
        }).json(response)
    })

}

module.exports = auth