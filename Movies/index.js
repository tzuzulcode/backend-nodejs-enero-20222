const express = require("express")
const cors = require("cors")
const cookies = require("cookie-parser")
const passport = require("passport")
const {port,oauth_client_id,oauth_callback_url,oauth_client_secret} = require("./config")

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
app.use(passport.initialize())

passport.use(new GoogleStrategy({
    clientID:oauth_client_id,
    clientSecret:oauth_client_secret,
    callbackURL:oauth_callback_url
},(accessToken,refreshToken,profile,done)=>{
    //console.log({accessToken,refreshToken,profile})
    done(null,{profile})
}))

passport.serializeUser((user,done)=>{
    done(null,user)
})

// Utilizando las rutas
prueba(app)
movies(app)
users(app)
auth(app,passport)



app.get('/',(req,res)=>{
    return res.status(200).send('Home')
})

app.listen(port,()=>{
    console.log("Servidor: http://localhost:"+port)
})
