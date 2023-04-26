const express = require('express')
const app = express()

app.get('/', (req, res)=>{
    res.send('Server up')
})

app.listen(3000, ()=>{
    console.log('up in http://localhost:3000')
})