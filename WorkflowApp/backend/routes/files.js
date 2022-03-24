const express = require("express")
const { downloadFile } = require("../libs/storage")

function files(app){
    const router = express.Router()

    app.use("/files",router)

    router.get("/:fileName",(req,res)=>{
        const {fileName} = req.params

        downloadFile(fileName,res)
    })
}


module.exports = files