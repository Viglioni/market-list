require('dotenv').config()
const {connectDB} = require('../../database')
const {map} = require('ramda')

const DBName = process.env.DB_NAME


const getLists = async (req, res) =>{
    const {database, close, colFunctions} = await connectDB(DBName)
    const {getCollections} = colFunctions()
    const collections = await getCollections()

    res.json(map( col => ({name: col.name}), collections))
    close()
}

module.exports = getLists
