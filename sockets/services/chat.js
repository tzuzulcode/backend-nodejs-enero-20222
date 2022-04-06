const uuid = require("uuid").v4

const messages = []
const users = new Map()

class Chat {
  constructor(io, socket) {
    this.io = io
    this.socket = socket

    socket.on("getMessages", () => {
      this.getMessages()
    })

    socket.on("message", (message) => {
      this.handleMessage(message)
    })
  }

  sendMessage(message) {
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
  }
}

module.exports = Chat
