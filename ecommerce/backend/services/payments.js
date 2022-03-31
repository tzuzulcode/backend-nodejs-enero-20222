const { stripe_sk } = require("../config");

const stripe = require("stripe")(stripe_sk)
const endpointSecret = "whsec_5a3835bc94d54c23aefcaab36ea471c6fe46a38fb1f18e087c95a0b21398dd29"

class Payments{
    async createIntent(amount){
        const intent = await stripe.paymentIntents.create({
            amount: amount,//price
            currency:"usd"
        })

        return intent.client_secret
    }


    createEvent(body,sign){
        let event;

        try {
            event = stripe.webhooks.constructEvent(body, sign, endpointSecret);

            if(event.type==="payment_intent.succeeded"){
                console.log(event.data)
                return {success:true}
            }else{
                return {success:true}
            }
            
        } catch (err) {
            return {success:false,message:`Webhook Error: ${err.message}`}

        }
    }
}

module.exports = Payments