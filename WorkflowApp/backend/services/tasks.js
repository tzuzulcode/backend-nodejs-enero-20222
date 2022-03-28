const TaskModel = require("../models/tasks")
const CommentService = require("./comments")

class Tasks{

    async get(id){
        const result = await TaskModel.findById(id).populate("comments").populate("assigned","name email")

        return result
    }

    async create(data){
        const result = await TaskModel.create(data)

        return result
    }
    async update(id,data){
        const result = await TaskModel.findByIdAndUpdate(id,data)

        return result
    }

    async delete(id){
        const result = await TaskModel.findByIdAndDelete(id)

        return result
    }

    async addComment(idTask,idUser,commentData,file){
        const commentService = new CommentService()
        const comment = await commentService.create(idUser,commentData,file)
        const result = await TaskModel.updateOne({_id:idTask},{$push:{comments:comment.id}},{new:true})
        return comment
    }
    async removeComment(idTask,idComment){
        const commentService = new CommentService()
        const comment = await commentService.delete(idComment)
        const result = await TaskModel.updateOne({_id:idTask},{$pull:{comments:idComment}},{new:true})
        return comment
    }
}


module.exports = Tasks