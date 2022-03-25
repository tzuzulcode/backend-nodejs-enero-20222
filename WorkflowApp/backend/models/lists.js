const {mongoose} = require('../config/db')

const {Schema} = mongoose


const listSchema = new Schema({
    idTeam:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"teams"
    },
    name:String,
    description:String,
    tasks:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"tasks"
    }]
})

const ListModel = mongoose.model("lists",listSchema)

module.exports = ListModel