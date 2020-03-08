const {connectDB} = require('../../database')
const dotenv = require('dotenv')
const {map} = require('ramda')

dotenv.config()
const DBName = process.env.DB_NAME


const getLists = async (req, res) =>{
    console.log(DBName)
    const {database, close, colFunctions} = await connectDB(DBName)
    const {getCollections} = colFunctions()
    const collections = await getCollections()

    res.json(map( col => ({name: col.name}), collections))
    close()
}

module.exports = getLists
