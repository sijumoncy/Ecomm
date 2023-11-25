import express from 'express'
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import morgan from 'morgan'

dotenv.config()
const app = express()

const apiBaseUrl = process.env.API_URL

// middlewares
app.use(bodyParser.json())
app.use(morgan("tiny"))

// default route
app.get(`${apiBaseUrl}/`, (req, res) => {
    res.send('App is Up and Running')
})

app.listen(8000, () => {
    console.log("App is Running in Port : 8000")
})