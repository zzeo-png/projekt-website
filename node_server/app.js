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
    res.json('Hello from Cestometer!')
})

// http://localhost:3001/roads POST
app.post('/roads', (req, res) => {
    const startLat = req.body.startLAT
    const startLng = req.body.startLNG
    const endLat = req.body.endLAT
    const endLng = req.body.endLNG
    const condition = req.body.condition || 1

    const insertQuery = "INSERT INTO `list` (`startPointLAT`, `startPointLNG`, `endPointLAT`, `endPointLNG`, `condition`) VALUES (?, ?, ?, ?, ?)"

    db.query(insertQuery, [startLat, startLng, endLat, endLng, condition], (err, result) => {
        if(err){
            console.error('Error executing INSERT query:', err)
            res.status(500).send('Internal Server Error')
        }
        else{
            res.send(result)
        }
    })
})

// http://localhost:3001/roads GET
app.get('/roads', (req, res) => {
    const selectQuery = "SELECT * FROM `list`"

    db.query(selectQuery, (err, result) => {
        if(err){
            console.error('Error executing SELECT query:', err)
            res.status(500).send('Internal Server Error')
        }
        else{
            res.json(result)
        }
    })
})

// http://localhost:3001/roads/:id DELETE
app.delete('/roads', (req, res) => {
    const id = req.body.id

    const deleteQuery = "DELETE FROM `list` WHERE `id` = ?"

    db.query(deleteQuery, [id], (err, result) => {
        if(err){
            console.error('Error executing DELETE query:', err)
            res.status(500).send('Internal Server Error')
        }
        else{
            res.json(result)
        }
    })

})

app.listen(port, ()=> {
    console.log(`Node running on port ${port}`)
})