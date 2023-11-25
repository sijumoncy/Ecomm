import express from 'express'
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import morgan from 'morgan'
import connectDB from './db/conn';
import productRoute from './routes/products'

dotenv.config()
const app = express()

const apiBaseUrl = process.env.API_URL
const port = process.env.PORT || 8000;

// middlewares
app.use(bodyParser.json())
app.use(morgan("tiny"))


// default route
app.get(`${apiBaseUrl}/`, (req, res) => {
    res.send('App is Up and Running')
})


// connect to db
connectDB()

//routes
app.use(`${apiBaseUrl}/products`, productRoute)

app.listen(port, () => {
    console.log(`App is Running in Port : 8000 ${port}`)
})