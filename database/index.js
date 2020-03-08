const connectDB = require('./connection')
const queryFunctions = require('./queries')

const database = {connectDB, queryFunctions}

module.exports = database
