const Users = require("./users")
const jwt = require("jsonwebtoken")
const { jwt_secret } = require("../config")

class Auth{

    constructor(){
        this.users = new Users()
    }

    async login(email,password){
        const user = await this.users.getByEmail(email)
        if(user && user.password === password){
            // user.password = undefined
            // user.__v = undefined
            // jwt.sign(user,jwt_secret,{expiresIn:"1d"},(error,token)=>{
            //     return {success:true,user,token}
            // })
            const data = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
            }
            const token = jwt.sign(data,jwt_secret,{expiresIn:"1d"})
            return {success:true,data,token}
            
        }

        return {success:false,message:"Las credenciales no coinciden"}
    }

    async signup(data){
        if(await this.users.getByEmail(data.email)){
            return {succes:false,message:"Usuario ya registrado"}
        }else{
            const user = await this.users.create(data)
            user.password = undefined
            user.__v = undefined
            return {succes:true,user}
        }
        
    }
}

module.exports = Auth