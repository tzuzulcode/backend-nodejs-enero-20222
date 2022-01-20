const http = require('http')

const server = http.createServer()

server.on('request',(request,response)=>{
    response.statusCode = '200'
    response.setHeader('Content-Type','text-plain')
    response.end('Hola, bienvenido')
})

server.listen(4000)
console.log("Servidor: http://localhost:4000")