const Users = require("./users")
const jwt = require("jsonwebtoken")
const { jwt_secret } = require("../config")
const bcrypt = require("bcrypt")

class Auth{

    constructor(){
        this.users = new Users()
    }

    async hashPassword(password){
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password,salt)
        return hash
    }

    getToken(user){
        const data = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role?user.role:0,
        }
        const token = jwt.sign(data,jwt_secret,{expiresIn:"1d"})
        return {success:true,data,token}
    }

    //Hacer decrypting
    // Reto: Implementar ese metodo
    //bcrypt.compare(password,user.password)

    async login(email,password){
        const user = await this.users.getByEmail(email)
        if(user){
            const correctPassword = await bcrypt.compare(password,user.password)
            if(correctPassword){
                // user.password = undefined
                // user.__v = undefined
                // jwt.sign(user,jwt_secret,{expiresIn:"1d"},(error,token)=>{
                //     return {success:true,user,token}
                // })
                return this.getToken(user)
                
            }
        }
        
        

        return {success:false,message:"Las credenciales no coinciden"}
    }

    async signup(userData){
        if(await this.users.getByEmail(userData.email)){
            return {succes:false,message:"Usuario ya registrado"}
        }else{
            userData.role = 0
            userData.password = await this.hashPassword(userData.password)
            const user = await this.users.create(userData)
            return this.getToken(user)
        }
        
    }

    async loginGoogle(profile){
        let user = await this.users.getByFilter({idGoogle:profile.id})
        if(!user){
            user = await this.users.create({
                firstName:profile.name.givenName,
                lastName:profile.name.familyName,
                email:profile.emails[0].value,
                role:0,
                provider:profile.provider,
                idGoogle:profile.id
            })
        }
        return this.getToken(user)
    }
}

module.exports = Auth