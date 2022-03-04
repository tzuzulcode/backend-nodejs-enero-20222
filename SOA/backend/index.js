const express = require("express")
const cors = require("cors")
const { port, env } = require("./config")


const app = express()

app.use(express.json())
app.use(cors({
    credentials:true,
    origin:["http://locahost:3000"]
}))


app.get("/",(req,res)=>{
    return res.json({hello:"world"})
})

app.listen(port,()=>{
    console.log("Modo:",env)
    console.log("listening on: http://localhost:"+port)
})