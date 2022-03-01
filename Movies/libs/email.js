const nodemailer = require("nodemailer")
const { email_host, email_port, email_secure, email_user, email_password } = require("../config")

const transporter = nodemailer.createTransport({
    host:email_host,
    port:email_port,
    secure:email_secure,
    auth:{
        user:email_user,
        pass:email_password
    }
})

async function sendEmail(to,subject,text,html){
    let info = await transporter.sendMail({
        from:"prueba@tzuzulcode.com",
        to,
        subject,
        text,html
    })

    console.log(info)

    return {success:true}
}

module.exports = sendEmail