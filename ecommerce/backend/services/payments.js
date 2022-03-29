const { stripe_sk } = require("../config");

const stripe = require("stripe")(stripe_sk)

class Payments{
    async createIntent(amount){
        const intent = await stripe.paymentIntents.create({
            amount: amount,//price
            currency:"usd"
        })

        return intent.client_secret
    }
}

module.exports = Payments