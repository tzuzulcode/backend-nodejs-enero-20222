const express = require("express")
const Payments = require("../services/payments")

function payments(app){
    const router = express.Router()

    app.use("/api/payments",router)

    const pay = new Payments()


    router.post("/intent",async (req,res)=>{
        const intent = await pay.createIntent(req.body.amount)

        return res.json({
            clientSecret:intent
        })
    })
}

module.exports = payments