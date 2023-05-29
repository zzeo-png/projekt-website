const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')

const port = 3001

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.json('Hello world!')
})

app.post('/test', (req, res) => {
    const test = req.body.test

    console.log(test)
    res.json(test)
})

app.listen(port, ()=> {
    console.log(`Node running on port ${port}`)
})