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
// const teamSchema = new Schema({
//     leader:{
//         id:String,
//         name:String,
//         email:String,
//         profile_pic:String
//     },
//     name:String,
//     img:String,
//     description:String,
//     members:[
//         {
//             id:String,
//             name:String,
//             email:String,
//             profile_pic:String,
//             role:{
//                 type:String,
//                 enum:["editor","validator","normal","leader"],
//                 default:"normal"
//             }
//         }
//     ]
// })

const TeamModel = mongoose.model("teams",teamSchema)

module.exports = TeamModel