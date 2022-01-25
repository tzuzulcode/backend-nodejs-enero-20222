const mongoose = require("mongoose")

const connection = async ()=>{
    const conn =  await mongoose.connect("mongodb+srv://tzuzulcode:<password>@backendnodejsenero2022.owb1u.mongodb.net/movies")
    console.log("Mongo DB connected",conn.connection.host)
}

module.exports = {connection,mongoose}