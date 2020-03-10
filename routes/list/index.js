require('dotenv').config()
const {connectDB, queryFunctions} = require('../../database')
const {map, pathOr, includes} = require('ramda')
const {checkExistance} = require('../../database/helpers')
const DBName = process.env.DB_NAME

const removeID = data => map(item => ({...item, "_id": undefined}), data)

const getList = async (req, res) =>{
    const list = pathOr(null, ['query','list'], req)
    if(list){
        const {database, close, collection, colFunctions} = await connectDB(DBName)
        const {getCollections} = colFunctions()
        const {find} = queryFunctions(collection(list))
        
        if( await checkExistance(getCollections, col=> col.name)(list) ){
            const data = await find()     
            res.json(removeID(data))
        }
        else res.status(400).send("This list does not exist.")
        close()
    }
    else{ res.status(400).send("'list-name' is not informed in query.") }
}

module.exports = getList
