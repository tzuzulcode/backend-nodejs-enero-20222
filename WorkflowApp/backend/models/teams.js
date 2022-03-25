const {mongoose} = require('../config/db')

const {Schema} = mongoose


const teamSchema = new Schema({
    idLeader:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    name:String,
    fileKey:String,
    img:String,
    description:String,
    members:[
        {
            _id:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"users"
            },
            role:{
                type:String,
                enum:["editor","validator","normal","leader"],
                default:"normal"
            }
        }
    ],
    lists:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"lists"
    }]
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