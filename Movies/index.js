const express = require("express")
const cors = require("cors")
const cookies = require("cookie-parser")

const {port} = require("./config")

//Trayendo conexión a BD
const {connection} = require("./config/db")
connection()

//Importando routers
const prueba = require("./routes/index")
const movies = require("./routes/movies")
const users = require("./routes/users")
const auth = require("./routes/auth")

const app = express()

//Usando middleware globales
//app.use(express.text())
app.use(express.json())
app.use(cors({
    origin:['http://127.0.0.1:5500','http://localhost:3000'],
    credentials:true
}))

app.use(cookies())

// Utilizando las rutas
prueba(app)
movies(app)
users(app)
auth(app)



app.get('/',(req,res)=>{
    return res.status(200).send('Home')
})

app.listen(port,()=>{
    console.log("Servidor: http://localhost:"+port)
})
