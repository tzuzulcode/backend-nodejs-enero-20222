const express = require("express")
const connection = require("./libs/socket")
const app = express()
const cors = require("cors")
const ChatService = require("./services/chat")

app.use(cors({
  origin: ["http://localhost:5500", "http://127.0.0.1:5500/"],
  credentials: true
}))

app.get("/", (req, res) => {
  return res.json({ hola: "mundo" })
})

const server = app.listen(4000, () => {
  console.log("Listening on port 4000")
  console.log("http://localhost:4000")
})


const io = connection(server)

const chatServ = new ChatService(io)
