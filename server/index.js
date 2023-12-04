const express = require('express')
require('dotenv').config();
const PORT = process.env.PORT || 5000
const authRouter = require('./routers/routers')
const errorHandler = require('./middleware/ErrorMiddleware')
const cors = require('cors')

const app = express()


app.use(express.json())
app.use(cors())
app.use("/auth", authRouter)


app.use(errorHandler)

const start = () => {
    try {
        app.listen(PORT, () => console.log(`server started on port ${PORT}...`))
    } catch (e) {
        console.log(e)
    }
}
start()