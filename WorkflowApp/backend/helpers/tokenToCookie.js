const { env } = require("../config")

function tokenToCookie(res,data){
    if(data.success){
        let date = new Date(new Date().setDate(new Date().getDate()+7))
        return res.cookie("token",data.token,{
            httpOnly:true,
            sameSite:"none",
            // secure:env!=="dev",
            secure:true,
            expires:date
        }).json(data.data)
    }

    return res.json(data)    
}
function tokenToCookieAndRedirect(res,data){
    if(data.success){
        let date = new Date(new Date().setDate(new Date().getDate()+7))
        return res.cookie("token",data.token,{
            httpOnly:true,
            sameSite:"none",
            // secure:env!=="dev",
            secure:true,
            expires:date
        }).redirect("http://localhost:3000")
    }

    return res.json(data)    
}

module.exports = {tokenToCookie,tokenToCookieAndRedirect}