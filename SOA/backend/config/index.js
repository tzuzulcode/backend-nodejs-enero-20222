require("../../../WorkflowApp/backend/node_modules/dotenv/lib/main").config()

const config = {
    env:process.env.NODE_ENV,
    port:process.env.PORT,
    jwt_secret:process.env.JWT_SECRET,
}

module.exports = config