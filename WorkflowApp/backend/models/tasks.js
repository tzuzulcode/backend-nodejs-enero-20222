const {mongoose} = require('../config/db')

const {Schema} = mongoose


const taskSchema = new Schema({
    idList:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"lists"
    },
    name:String,
    description:String,
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"comments"
    }],
    assigned:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }]
})

const TaskModel = mongoose.model("tasks",taskSchema)

module.exports = TaskModel