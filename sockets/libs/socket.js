const socketio = require("socket.io")

function connection(server, service) {
  const io = socketio(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  })

  service(io)
}


module.exports = connection