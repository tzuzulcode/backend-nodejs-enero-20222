const jwt = require("jsonwebtoken")
const { jwt_secret, facebook_app_id, facebook_app_secret } = require("../config")
const {oauth_client_id,oauth_callback_url,oauth_client_secret} = require("../config")

const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require("passport-facebook").Strategy

const handleToken=(token,req,res,next)=>{
    try{
        const decoded = jwt.verify(token,jwt_secret)
        req.user = decoded
        return validateRole(req,res,next)
    }catch(error){
        console.error("JWT error",error.message)
        return res.status(403).json({status:"Expired",message:"A valid token is required for this process"})
    }
}



const validateRole = (req,res,next)=>{
    if(req.user.role>=req.neededRole){
        return next()
    }
    
    return res.status(403).json({status:"Insuficient permissions",message:"A superior role is required for this action"})
}

const verifyToken = (req,res,next)=>{
    const auth = req.header("Authorization")
    const cookies = req.cookies

    if(!auth && !cookies.token){
        return res.status(403).json({status:"No-Auth",message:"A token is required for this process"})
    }
    
    if(cookies.token){
        handleToken(cookies.token,req,res,next)
    }else{
        const token = auth.split(" ")[1]
        handleToken(token,req,res,next)
    }
}


const isRegular = (req,res,next)=>{
    req.neededRole = 0
    verifyToken(req,res,next)
}
const isAdmin = (req,res,next)=>{
    req.neededRole = 2
    verifyToken(req,res,next)
}
const isEditor = (req,res,next)=>{
    req.neededRole = 1
    verifyToken(req,res,next)
}

const useGoogleStrategy = ()=>{
    return new GoogleStrategy({
        clientID:oauth_client_id,
        clientSecret:oauth_client_secret,
        callbackURL:oauth_callback_url
    },(accessToken,refreshToken,profile,done)=>{
        //console.log({accessToken,refreshToken,profile})
        done(null,{profile})
    })
}

const useFacebookStrategy = () =>{
    return new FacebookStrategy({
        clientID:facebook_app_id,
        clientSecret:facebook_app_secret,
        callbackURL:"http://localhost:4000/auth/facebook/callback"
    },(accessToken,refreshToken,profile,done)=>{
        //console.log({accessToken,refreshToken,profile})
        done(null,{profile})
    })
}

module.exports = {isRegular,isAdmin,isEditor,useGoogleStrategy,useFacebookStrategy}