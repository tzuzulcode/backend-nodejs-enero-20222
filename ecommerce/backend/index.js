const express = require("express")
const cors = require("cors")
const { port, env } = require("./config")
const { connection } = require("./config/db")

connection()


const payments = require("./routes/payments")
const products = require("./routes/products")


const app = express()

app.use("/api/payments/webhook", express.raw({ type: 'application/json' }))
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: ["http://locahost:3000", "http://localhost:63342", "http://127.0.0.1:5500"]
}))


payments(app)
products(app)


app.get("/", (req, res) => {
    return res.json({ hello: "world" })
})

app.listen(port, () => {
    console.log("Modo:", env)
    console.log("listening on: http://localhost:" + port)
})