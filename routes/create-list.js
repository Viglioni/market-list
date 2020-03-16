require('dotenv').config()
const {connectDB, queryFunctions} = require('../database')
const {map, pathOr, all, not} = require('ramda')
const {checkExistance} = require('../database/helpers')

const DBName = process.env.DB_NAME

const addToList = async (req, res) =>{
    const listName  = pathOr(null, ['body','name'], req)


    if(listName){
        const {database, close, collection, colFunctions} = await connectDB(DBName)
        const {getCollections, createCollection} = colFunctions()

        if(not(await checkExistance(getCollections, col=> col.name)(listName))){
            await createCollection(listName)
                .then(()=> res.status(200).send("List created!"))
                .catch(err => res.send("An error has occured, the list was not created.\n"))
        }
        else res.status(400).send("This list already exists.")
        close()
    }
    else{ res.status(400).send("'name'  is not informed in body.") }
}

module.exports = addToList
