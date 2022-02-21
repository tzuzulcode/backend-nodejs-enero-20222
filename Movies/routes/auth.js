const express = require("express")
const { useGoogleStrategy, useFacebookStrategy } = require("../middleware/auth")
const passport = require("passport")

const Auth = require("../services/auth")
function auth(app){
    const router = express.Router()
    const authService = new Auth()
    app.use("/auth",router)

    app.use(passport.initialize())

    passport.use(useGoogleStrategy())
    passport.use(useFacebookStrategy())
    
    passport.serializeUser((user,done)=>{
        done(null,user)
    })

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
        const response = await authService.loginProvider(req.user.profile)
        return res.cookie("token",response.token,{
            httpOnly:true,
            sameSite:"none",
            secure:true,
        }).json(response)
    })
    router.get('/facebook',passport.authenticate("facebook"))
    router.get('/facebook/callback',passport.authenticate("facebook"),async (req,res)=>{
        console.log(req.user.profile)
        const response = await authService.loginProvider(req.user.profile)
        return res.cookie("token",response.token,{
            httpOnly:true,
            sameSite:"none",
            secure:true,
        }).json(response)

        //return res.json({message:"Bienvenido"})
    })

}

module.exports = auth