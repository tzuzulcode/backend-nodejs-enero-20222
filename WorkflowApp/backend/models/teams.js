const {mongoose} = require('../config/db')

const {Schema} = mongoose

const teamSchema = new Schema({
    idLeader:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    name:String,
    img:String,
    description:String,
    members:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"users"
        }
    ]
})

const TeamModel = mongoose.model("teams",teamSchema)

module.exports = TeamModel