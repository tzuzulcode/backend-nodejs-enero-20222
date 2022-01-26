const express = require("express")
const config = require("./config")

//Trayendo conexión a BD
const {connection} = require("./config/db")
connection()

//Importando routers
const prueba = require("./routes/index")
const movies = require("./routes/movies")

const app = express()

//Usando middleware globales
//app.use(express.text())
app.use(express.json())

// Utilizando las rutas
prueba(app)
movies(app)

app.get('/',(req,res)=>{
    return res.status(200).send('Hola, bienvenido')
})

app.listen(config.port,()=>{
    console.log("Servidor: http://localhost:"+config.port)
})