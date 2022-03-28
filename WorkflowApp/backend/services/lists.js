const ListModel = require("../models/lists")
const TaskService = require("./tasks")

class Lists{

    async create(data){
        const result = await ListModel.create(data)

        return result
    }
    async update(id,data){
        const result = await ListModel.findByIdAndUpdate(id,data,{new:true})

        return result
    }

    async delete(id){
        const result = await ListModel.findByIdAndDelete(id)

        return result
    }

    async addTask(idList,taskData){
        const taskService = new TaskService()
        const task = await taskService.create(taskData)
        const result = await ListModel.updateOne({_id:idList},{$push:{tasks:task.id}})
        return task
    }
    async removeTask(idList,idTask){
        const taskService = new TaskService()
        const task = await taskService.delete(idTask)
        const result = await ListModel.updateOne({_id:idList},{$pull:{task:idTask}})
        return task
    }
}


module.exports = Lists