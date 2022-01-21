const express = require("express")

//Importando routers
const prueba = require("./routes/index")

const app = express()

//Usando middleware globales
//app.use(express.text())
app.use(express.json())

// Utilizando las rutas
prueba(app)

app.get('/',(req,res)=>{
    return res.status(200).send('Hola, bienvenido')
})

app.listen(4000,()=>{
    console.log("Servidor: http://localhost:4000")
})