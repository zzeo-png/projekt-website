const express = require('express')
const app = express()
const port = 3000

app.get("/", (req, res) => {
    res.json({"response": "OK"})
})

app.listen(port, ()=> {
    console.log(`Node running on port ${port}`)
})