require("dotenv").config()

const config = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    jwt_secret: process.env.JWT_SECRET,
    stripe_sk: process.env.STRIPE_SK,
    stripe_pk: process.env.STRIPE_PK,
}

module.exports = config