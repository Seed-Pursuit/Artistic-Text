import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './mongodb/connect.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json({
    limit: '50mb'
}))

app.get('/', async (req, res) => {
    res.send('Hello World')
})

const startServer = async (req, res) => {
    try {
        connectDB(process.env.MONGODBURL)
        app.listen(8080, () => {
            console.log("server started on 8080")
        })
    } catch (err) {
        console.log(err)
    }

}

startServer();