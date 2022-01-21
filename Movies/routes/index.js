const express = require("express")
function prueba(app){
    const router = express.Router()
    app.use("/pruebas",router)

    router.get('/otraruta',(req,res)=>{
        return res.status(200).send('Hola, otra ruta')
    })
    router.post('/guardar',(req,res)=>{
        console.log(req.body)
        return res.status(200).send('Hola, guardar')
    })
    
}


module.exports = prueba