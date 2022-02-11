const express = require("express")
const cors = require("cors")
const cookies = require("cookie-parser")
const passport = require("passport")
const config = require("./config")

const GoogleStrategy = require('passport-google-oauth20').Strategy


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
// app.use(passport.initialize())

// passport.use(new GoogleStrategy({
//     clientID:,
//     clientSecret:,
//     callbackURL:'http://localhost:4000',
// }))

// Utilizando las rutas
prueba(app)
movies(app)
users(app)
auth(app)

app.get('/',(req,res)=>{
    return res.status(200).send('Hola, bienvenido')
})

app.listen(config.port,()=>{
    console.log("Servidor: http://localhost:"+config.port)
})

// Presentación de passport:
