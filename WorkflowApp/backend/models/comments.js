const {mongoose} = require('../config/db')

const {Schema} = mongoose


const commentSchema = new Schema({
    idTask:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"tasks"
    },
    idUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    content:String,
    fileKey:String,
    file:String,
})

const CommentModel = mongoose.model("comments",commentSchema)

module.exports = CommentModel