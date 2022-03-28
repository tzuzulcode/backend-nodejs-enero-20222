const http = require('http')

const server = http.createServer()

server.on('request',(request,response)=>{
    if(request.method==="POST" && request.url=="/stream"){
        let body = []
        request.on("data",(chunk)=>{
            body.push(chunk)
        })
        .on("end",()=>{
            response.writeHead(200,{"Content-Type":"application/json"})
            body = Buffer.concat(body).toString()
            response.end(body)
        })
    }else{
        response.statusCode = '200'
        response.setHeader('Content-Type','text-plain')
        return response.end('Hola, bienvenido')
    }
})

server.listen(4000)
console.log("Servidor: http://localhost:4000")