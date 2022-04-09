const uuid = require("uuid").v4

const messages = []
const users = new Set()

class Chat {
  constructor(io) {
    this.io = io

    io.on("connection", (socket) => {
      console.log("Conexion realizada")
      socket.on("new user", (data) => {
        socket.userId = data
        users.add(data)
        console.log(users)
        io.emit("new user", [...users])
      })

      socket.on("disconnect", () => {
        users.delete(socket.userId)
        io.emit("user disconnected", socket.userId)
      })


    })

    // socket.on("getMessages", () => {
    //   this.getMessages()
    // })

    // socket.on("message", (message) => {
    //   this.handleMessage(message)
    // })
  }

  /* sendMessage(message) {
    this.io.sockets.emit("message", message)
  }

  getMessages() {
    messages.forEach(message => this.sendMessage(message))
  }

  handleMessage(message) {
    const data = {
      id: uuid(),
      user: users.get(this.socket),
      message,
      time: Date.now()
    }
  } */
}

module.exports = Chat
