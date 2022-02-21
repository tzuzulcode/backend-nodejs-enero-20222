const {mongoose} = require('../config/db')

const {Schema} = mongoose

const userSchema = new Schema({
    firstName:String,
    lastName:String,
    displayName:String,
    birthday:Date,
    city:String,
    email:String,
    password:String,
    role:Number,
    provider:String,
    idProvider:String
})

const UserModel = mongoose.model("users",userSchema)

module.exports = UserModel