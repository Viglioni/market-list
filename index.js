const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const getLists = require('./routes/lists')

dotenv.config()
const PORT = process.env.PORT || 5000


express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('routes', path.join(__dirname, 'routes'))
    .get('/', (req,res)=> res.send("Wellcome to larochkk-market-list api"))
    .get('/lists', getLists)
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))
