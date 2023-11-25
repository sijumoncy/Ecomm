import express from 'express'
import dotenv from 'dotenv';

dotenv.config()
const app = express()

const apiBaseUrl = process.env.API_URL

// default route
app.get(apiBaseUrl+'/', (req, res) => {
    res.send('App is Up and Running')
})

app.listen(8000, () => {
    console.log("App is Running in Port : 8000")
})