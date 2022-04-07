const socketio = require("socket.io")

function connection(server) {
  const io = socketio(server, {
    cors: {
      origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
      methods: ["GET", "POST"],
      credentials: true
    }
  })

  return io
}


module.exports = connection