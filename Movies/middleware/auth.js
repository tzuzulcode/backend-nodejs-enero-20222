const jwt = require("jsonwebtoken")
const { jwt_secret } = require("../config")

const handleToken=(token,req,res,next)=>{
    try{
        const decoded = jwt.verify(token,jwt_secret)
        req.user = decoded
        return next()
    }catch(error){
        console.error("JWT error",error.message)
        return res.status(403).json({status:"Expired",message:"A valid token is required for this process"})
    }
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

//TODO: Se exporta como objeto porque más adelante tendremos mas middleware
module.exports = {verifyToken}