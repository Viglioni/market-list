const {checkExistance} = require('../helpers')

const find = col => async (qry={}) => new Promise((resolve, reject)=>{
    col.find(qry).toArray((err, items)=>{
        if(err) reject(err)
        else resolve(items)
    })})

const insert = col => async (obj) => {
    const alreadyInDB = await checkExistance(
        find(col),
        item=>item.name,
        {name: obj.name})(obj.name)

    return new Promise((resolve, reject)=>{
        col.insertOne(obj, (err, res) =>{
            if(err || alreadyInDB)  reject(err)
            else {
                console.log("Inserted: ", obj)
                resolve(res)
            }})})}

const update = col => async (qry, obj) => new Promise((resolve, reject)=>{
    col.updateOne(qry, {$set : {obj}}, (err, res)=>{
        if(err) reject(err)
        else {
            console.log("Updated: ", qry)
            resolve(res)
        }})})

const remove = col => async (qry) => {
    const existsInDB = await checkExistance(
        find(col),
        item=>item.name,
        {name: qry})(qry)
    
    return new Promise((resolve, reject)=>{
        col.deleteOne(qry, (err, res)=>{
            if(err || !existsInDB) reject(err)
            else {
                console.log("Deleted: ", qry)
                resolve(res)
            }})})}

const queryFunctions = col => ({
    find: find(col),
    insert: insert(col),
    update: update(col),
    remove: remove(col)
})

module.exports = queryFunctions
