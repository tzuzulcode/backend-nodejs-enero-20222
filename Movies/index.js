const express = require("express")

const app = express()

//Usando middleware
app.use(express.text())
app.use(express.json())

app.get('/',(req,res)=>{
    return res.status(200).send('Hola, bienvenido')
})
app.get('/otraruta',(req,res)=>{
    return res.status(200).send('Hola, otra ruta')
})
app.post('/guardar',(req,res)=>{
    console.log(req.body)
    return res.status(200).send('Hola, guardar')
})

app.listen(4000,()=>{
    console.log("Servidor: http://localhost:4000")
})