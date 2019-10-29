const mongoose = require('mongoose')

const databaseEntries = {}

const errors = []

const getRandomElement = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)]
}

const generateUniqueNumberList = function(length, min, max, arr) {
    if (!arr) arr = []
    if (arr.length >= length) return arr
    let newNumber
    if (min && max) newNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    else newNumber = Math.floor(Math.random() * length + 1);
    if (arr.indexOf(newNumber) < 0) arr.push(newNumber);
    return generateUniqueNumberList(length, min, max, arr);
}

async function submitDocuments(name, model, jsonData, drop = true) {
    var documents
    try {
        drop && await model.deleteMany()
        documents = await model.create(jsonData)
        databaseEntries[name] = documents
    } catch (err) {
        console.log(err)
        errors.push(`${name} - Could not finish populating documents: ${err.name} - ${err.errmsg}`)
    } finally {
        const count = await model.countDocuments()
        console.log(`${count} ${name} created.`)
    }
}

function seed(cb) {
    console.log('starting to create DB Entries.')
    cb()
        .then(() => {
            console.log('--> Successfully finished populating database.')
        })
        .catch(err => {
            console.log('Error populating the database:  ', err)
        })
        .finally(() => {
            if (errors.length) {
                console.log('\n\nRan into these errors:')
                console.log('\n\t' + errors.join('\n\t') + '\n\n')
            }
            mongoose.disconnect()
        })
}

module.exports = {
    seed,
    submitDocuments,
    getRandomElement,
    generateUniqueNumberList,
    errors,
    databaseEntries
}