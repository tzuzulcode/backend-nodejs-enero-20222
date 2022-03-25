const ListModel = require("../models/lists")


class Lists{

    async create(data){
        const result = await ListModel.create(data)

        return result
    }
    async update(id,data){
        const result = await ListModel.findByIdAndUpdate(id,data)

        return result
    }

    async delete(id){
        const result = await ListModel.findByIdAndDelete(id)

        return result
    }

    addTask(task){
        
    }
}


module.exports = Lists