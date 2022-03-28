const express = require("express")
const { isRegular } = require("../middleware/auth")
const upload = require("../middleware/upload")
const Tasks = require("../services/tasks")

function tasks(app){
    const router = express.Router()

    const taskService = new Tasks()

    app.use("/tasks",router)

    router.get("/:idTask",isRegular,async(req,res)=>{
        const task = await taskService.get(req.params.idTask)

        return res.json(task)
    })

    router.post("/:idTask/addComment",isRegular,upload.single("file"),async(req,res)=>{
        const result = await taskService.addComment(req.params.idTask,req.user.id,req.body,req.file)
        return res.json(result)
    })

    router.put("/:idTask",isRegular, async (req,res)=>{
        const task = await taskService.update(req.params.idTask,req.body)
        return res.json(task)
    })

    router.delete("/:idTask/removeComment/:idComment",isRegular,async (req,res)=>{

        const comment = await taskService.removeComment(req.params.idTask,req.params.idComment)

        return res.json(comment)
    })
}

module.exports = tasks