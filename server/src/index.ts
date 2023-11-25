import express from 'express'

const app = express()

// default route
app.get('/', (req, res) => {
    res.send('App is Up and Running')
})

app.listen(8000, () => {
    console.log("App is Running in Port : 8000")
})