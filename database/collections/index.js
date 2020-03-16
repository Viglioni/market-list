const getCollections = db => async () => new Promise((resolve,reject)=>{
    db.listCollections().toArray((err,res)=>{
        if(err) reject(err)
        else  resolve(res)
    })})

const createCollection = db => async colName => new Promise((resolve,reject)=>{
    db.createCollection(colName, {"capped": true, "size": 100000, "max": 5000}, (err, res)=>{
        if(err) {
            console.log(err)
            reject(err)}
        else {
            console.log("Created collection ",colName)
            resolve(res)
        }})})

const removeCollection = col => async () => new Promise((resolve, reject)=>{
    col.drop((err,res)=>{
        if(err) reject(err)
        else {
            console.log("Deleted ", col)
            resolve(res)
        }})})

const renameCollection = col => async (newName) => new Promise((resolve,reject)=>{
    col.rename(newName, (err, res)=>{
        if(err) reject(err)
        else {
            console.log("Renamed to " , newName)
            resolve(res)
        }})})

const collectionFunctions = db => col =>({
    getCollections: getCollections(db),
    createCollection: createCollection(db),
    removeCollection: removeCollection(col),
    renameCollection: renameCollection(col)
})

module.exports = collectionFunctions
