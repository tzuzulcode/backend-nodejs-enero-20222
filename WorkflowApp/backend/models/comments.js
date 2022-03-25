const {mongoose} = require('../config/db')

const {Schema} = mongoose


const commentSchema = new Schema({
    idTask:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"tasks"
    },
    content:String,
    fileKey:String,
    file:String,
})

const CommentModel = mongoose.model("comments",commentSchema)

module.exports = CommentModel