const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')

const port = 3001

const app = express()

// set database info
const db = mysql.createPool({
    host: '34.65.105.245',
    user: 'root',
    password: 'RootPass123!',
    database: 'roads'
})

// check database connection
db.getConnection((err, connection) => {
    if(err){
        console.error('Error connecting to the database:', err)
    }
    else{
        console.log('Database connected successfully!')
        connection.release()
    }
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// http://localhost:3001/ GET
app.get('/', (req, res) => {
    res.json('Hello world!')
})

// http://localhost:3001/test POST
app.post('/test', (req, res) => {
    const test = req.body.test

    const insertQuery = "INSERT INTO test (name) VALUES (?)"

    db.query(insertQuery, [test], (err, result) => {
        if(err){
            console.error('Error executing INSERT query:', err)
            res.status(500).send('Internal Server Error')
        }
        else{
            res.send(result)
        }
    })
})

// http://localhost:3001/test GET
app.get('/test', (req, res) => {
    const selectQuery = "SELECT name FROM test"

    db.query(selectQuery, (err, result) => {
        if(err){
            console.error('Error executing SELECT query:', err)
            res.status(500).send('Internal Server Error')
        }
        else{
            res.send(result)
        }
    })
})

app.listen(port, ()=> {
    console.log(`Node running on port ${port}`)
})