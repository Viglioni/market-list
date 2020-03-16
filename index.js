require('dotenv').config()
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const getLists = require('./routes/lists')
const getList = require('./routes/list')
const addToList = require('./routes/add-to-list')
const removeFromList = require('./routes/remove-from-list')
const cors = require('cors')
const createList = require('./routes/create-list')

const PORT = process.env.PORT || 5000


express()
    .use(cors())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(express.static(path.join(__dirname, 'public')))
    .set('routes', path.join(__dirname, 'routes'))
    .get('/', (req,res)=> res.send("Wellcome to larochkk-market-list api"))
    .get('/lists', getLists)
    .get('/list', getList)
    .post('/create-list', createList)
    .post('/add-to-list', addToList)
    .post('/remove-from-list', removeFromList)
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))
