const mongo = require('mongodb').MongoClient
const dotenv = require('dotenv')
const collectionFunctions = require('../collections')

dotenv.config()
const {DB_USER, DB_PSSWD, DB_URL} = process.env
const url = "mongodb+srv://" + DB_USER + DB_PSSWD + DB_URL


const connectDB = async (dbName) => {
    return mongo.connect(
    url, {useUnifiedTopology:true })
      .then(db => {
          console.log("DB connected!")
          const database = db.db(dbName)
          return {
              database,
              close: () => {console.log("DB disconnected!"); db.close()},
              collection: collection(database),
              colFunctions: collectionFunctions(database)
          }})
      .catch(err => console.log(err))}


const db = (database, name) => database.db(name)

const collection = db =>  colName => db.collection(colName)

module.exports = connectDB
