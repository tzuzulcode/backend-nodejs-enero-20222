const UserModel = require("../models/user")
class Users{
    async get(id){
        const user = await UserModel.findById(id)
        return user
    }

    async getByEmail(email){
        if(email){
            const user = await UserModel.findOne({email:email})
            return user
        }
    }

    async getByFilter(filter){
        const user = await UserModel.findOne(filter)
        return user
    }

    async getAll(){
        // find devuelve varios elementos
        const users = await UserModel.find()
        return users
    }

    async create(data){
        const user = await UserModel.create(data)
        return user
    }

    async update(id,data){
        const user = await UserModel.findByIdAndUpdate(id,data,{new:true})
        return user
    }

    async delete(id){
        const user = await UserModel.findByIdAndDelete(id)
        return user
    }
}

module.exports = Users