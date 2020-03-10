require('dotenv').config()
const {connectDB, queryFunctions} = require('../database')
const {map, pathOr, all} = require('ramda')
const {checkExistance} = require('../database/helpers')

const DBName = process.env.DB_NAME

const addToList = async (req, res) =>{
    const checkQuery = (param) => pathOr(null, ['body',param], req)
    const parameters = map(
        param => checkQuery(param),
        ["list", "item", "quantity", "urgency"])
    const [list, item, quantity, urgency] = parameters

    if(all(Boolean)(parameters)){
        const {database, close, collection, colFunctions} = await connectDB(DBName)
        const {getCollections} = colFunctions()
        const {insert} = queryFunctions(collection(list))
        
        if(await checkExistance(getCollections, col=> col.name)(list)){
            await insert({name: item, urgency, quantity})
                .then(()=> res.status(200).send("Item inserted"))
                .catch(err => res.send("An error has occured, the item was not removed.\n"))
        }
        else res.status(400).send("This list does not exist.")
        close()
    }
    else{ res.status(400).send("'list' or 'item' or 'quantity' or 'urgency'  is not informed in body.") }
}

module.exports = addToList
