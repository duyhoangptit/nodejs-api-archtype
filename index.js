const express = require('express')
const cors = require('cors')
const proxy = require('express-http-proxy')

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/sample1", proxy("http://localhost:9091"))
app.use("/api/sample1", proxy("http://localhost:9092"))
app.use("/api/sample2", proxy("http://localhost:9093"))

app.listen(8080, () => {
    console.log("Gateway is listening to port 8080")
})
