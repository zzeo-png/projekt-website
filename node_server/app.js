const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')
const multer = require('multer')
const bcrypt = require('bcrypt')

const upload = multer({ dest: 'uploads/' })
const saltRounds = 5

const port = 3001

const app = express()

// informacije db
const db = mysql.createPool({
    host: '34.65.105.245',
    user: 'root',
    password: 'RootPass123!',
    database: 'roads'
})

// preveri povezavo z db
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

// -- test --
// http://localhost:3001/ GET
app.get('/', (req, res) => {
    res.json('Hello from Cestometer!')
})

// -- Dodajanje ceste --
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
            console.error('Error executing INSERT query: ', err)
            res.status(500).send('Internal Server Error')
        }
        else{
            res.send(result)
        }
    })
})

// -- Vračanje vseh cest --
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

// -- Brisanje ceste --
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

// -- Biometriča prijava --
// http://localhost:3001/login POST
app.post('/login', upload.single('imageFile'), (req, res) => {
    // procesiraj sliko

    // pošlji odgovor + uporabnikovo ime

    // obraz se ujema
    // res.json({status: "valid", user: "..."})

    // obraz se ne ujema
    // res.json({status: "invalid"})
    console.log(req.file)
    res.json({status: "invalid"})
})

// -- Registracija uporabnika --
app.post('/register', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const selectQuery = "SELECT `username` FROM `users` WHERE `username` = ?"

    db.query(selectQuery, [username], (err1, result1) => {
        if(result1.length > 0){
            res.json({status: "exists"})
        }
        else{
            bcrypt.genSalt(saltRounds, (err, salt) => {
                bcrypt.hash(password, salt, (error, hash) => {
                    const securePassword = hash
        
                    const insertQuery = "INSERT INTO `users` (`username`, `password`) VALUES (?, ?)"
        
                    db.query(insertQuery, [username, securePassword], (err, result) => {
                        if(err){
                            console.error('Error executing INSERT query: ', err)
                            res.status(500).send('Internal Server Error')
                        }
                        else{
                            res.json({status: "valid", user: username})
                        }
                    })
                })
            })
        }
    })
})

// -- Legacy Prijava --
app.post('/llogin', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const selectQuery = "SELECT `password` FROM `users` WHERE `username` = ?"

    db.query(selectQuery, [username], (err, result) => {
        if(err){
            console.error('Error executing SELECT query: ', err)
            res.status(500).send('Internal Server Error')
        }
        else{
            bcrypt.compare(password, result[0].password, (err, resultB) => {
                if(resultB){
                    res.json({status: "valid", user: username})
                }
                else{
                    res.json({status: "invalid"})
                }
            })
        }
    })

    
})

app.listen(port, ()=> {
    console.log(`Node running on port ${port}`)
})