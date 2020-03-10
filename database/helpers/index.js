const {map, includes} = require('ramda')

const Identity = x => x

const checkExistance =  (getGroup, mapFunc=Identity, param={}) => async element =>
    includes(element, map(mapFunc, await getGroup(param)))


module.exports = {checkExistance}
