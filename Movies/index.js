const express = require("express")

const app = express()

app.get('/',(req,res)=>{
    return res.status(200).send('Hola, bienvenido')
})

app.listen(4000,()=>{
    console.log("Servidor: http://localhost:4000")
})