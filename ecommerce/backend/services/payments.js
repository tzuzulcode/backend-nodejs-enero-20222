const { stripe_sk } = require("../config");

const stripe = require("stripe")(stripe_sk)
const endpointSecret = "whsec_2d849de04e6aa72abd49bf02b669777334504a448b75a97e166203f8fb714ffe"

class Payments {
    async createIntent(amount) {
        const intent = await stripe.paymentIntents.create({
            amount: amount,//price
            currency: "usd"
        })

        return intent.client_secret
    }


    createEvent(body, sign) {
        let event;

        try {
            event = stripe.webhooks.constructEvent(body, sign, endpointSecret);

            if (event.type === "payment_intent.succeeded") {
                console.log(event.data)
                return { success: true }
            } else {
                return { success: true }
            }

        } catch (err) {
            return { success: false, message: `Webhook Error: ${err.message}` }

        }
    }
}

module.exports = Payments