const jwt = require("jsonwebtoken")
const { jwt_secret } = require("../config")

const verifyToken = (req,res,next)=>{
    const auth = req.header("Authorization")

    if(!auth){
        return res.status(403).json({status:"No-Auth",message:"A token is required for this process"})
    }

    const token = auth.split(" ")[1]
    const decoded = jwt.verify(token,jwt_secret)
    console.log(decoded)

    return next()
}

//TODO: Se exporta como objeto porque más adelante tendremos mas middleware
module.exports = {verifyToken}