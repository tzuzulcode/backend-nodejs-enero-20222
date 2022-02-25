require("dotenv").config()

const config = {
    env: process.env.NODE_ENV,
    jwt_secret:process.env.JWT_SECRET,
    port:process.env.PORT,
    session_secret:process.env.SESSION_SECRET,
    db_password: process.env.DB_PASSWORD,
    db_username: process.env.DB_USERNAME,
    db_host:process.env.DD_HOST,
    db_name:process.env.DB_NAME,
    callback_url:process.env.NODE_ENV==="dev"?
    process.env.CALLBACK_URL_DEVELOPMENT+":"+process.env.PORT:
    process.env.CALLBACK_URL,
    oauth_client_id:process.env.OAUTH_CLIENT_ID,
    oauth_client_secret:process.env.OAUTH_CLIENT_SECRET,
    facebook_app_id:process.env.FACEBOOK_APP_ID,
    facebook_app_secret:process.env.FACEBOOK_APP_SECRET,
    github_client_id:process.env.GITHUB_CLIENT_ID,
    github_client_secret:process.env.GITHUB_CLIENT_SECRET,
    twitter_consumer_id:process.env.TWITTER_CONSUMER_ID,
    twitter_consumer_secret:process.env.TWITTER_CONSUMER_SECRET
}
console.log(config.callback_url)
module.exports = config