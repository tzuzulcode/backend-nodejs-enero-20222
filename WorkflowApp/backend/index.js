const express = require("express")
const cors = require("cors")
const cookies = require("cookie-parser")
const { port, env } = require("./config")

//Importando routers
const auth = require("./routes/auth")
const teams = require("./routes/teams")
const files = require("./routes/files")
const lists = require("./routes/lists")
const tasks = require("./routes/tasks")
const users = require("./routes/users")

const app = express()

app.use(express.json())
app.use(cors({
    credentials:true,
    origin:["http://localhost:3000"]
}))
app.use(cookies())

const {connection} = require("./config/db")
connection()

// Utilizando las rutas
auth(app)
teams(app)
files(app)
lists(app)
tasks(app)
users(app)


app.get("/",(req,res)=>{
    return res.json({hello:"world"})
})

app.listen(port,()=>{
    console.log("Modo:",env)
    console.log("listening on: http://localhost:"+port)
})