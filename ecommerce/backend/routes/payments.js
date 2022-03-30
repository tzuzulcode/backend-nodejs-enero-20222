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

    router.post("/webhook",express.raw({type: 'application/json'}),async(req,res)=>{
        const sig = req.headers['stripe-signature'];

        console.log(req.body)

        const result = pay.createEvent(req.body,sig)
        console.log(result)
        if(result.success){

            return res.status(200).send()
        }

        return res.status(400).send();
    })
}

module.exports = payments