require("dotenv").config()

const config = {
    env:process.env.NODE_ENV,
    port:process.env.PORT,
    jwt_secret:process.env.JWT_SECRET,
    db_password: process.env.DB_PASSWORD,
    db_username: process.env.DB_USERNAME,
    db_host:process.env.DD_HOST,
    db_name:process.env.DB_NAME,
}

module.exports = config