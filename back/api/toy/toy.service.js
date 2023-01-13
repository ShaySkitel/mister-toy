const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId

const TOY_COLLECTION = 'toy'

async function query(filterBy = { txt: '' }) {
    try {
        filterBy.onlyInStock = filterBy.onlyInStock === 'false' ? false : true
        const criteria = {
            name: { $regex: filterBy.searchStr, $options: 'i' },
            labels: { $regex: filterBy.labels, $options: 'i' },
        }

        if (filterBy.onlyInStock) criteria.inStock = true

        const collection = await dbService.getCollection(TOY_COLLECTION)
        let toys = await collection.find(criteria).toArray()
        toys = toys.reverse()

        if (filterBy.sortBy === 'name') {
            toys = toys.sort((toy1, toy2) => toy1.name.localeCompare(toy2.name))
        } else if (filterBy.sortBy === 'price') {
            toys = toys.sort((toy1, toy2) => toy1.price - toy2.price)
        }

        return toys
    } catch (err) {
        logger.error('cannot find toys', err)
        throw err
    }
}

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection(TOY_COLLECTION)
        const toy = collection.findOne({ _id: ObjectId(toyId) })
        return toy
    } catch (err) {
        logger.error(`while finding toy ${toyId}`, err)
        throw err
    }
}

async function getStockByLabels() {
    const collection = await dbService.getCollection(TOY_COLLECTION)
    let toys = await collection.find().toArray()
    const toyStockMap = toys.reduce((acc, toy) => {
        if (!toy.inStock) return acc

        toy.labels.forEach(label => {
            if (!acc[label]) acc[label] = 0
            acc[label]++
        })

        return acc
    }, {})

    return toyStockMap
}

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection(TOY_COLLECTION)
        await collection.deleteOne({ _id: ObjectId(toyId) })
        return toyId
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}

async function add(toy) {
    try {
        toy.createdAt = Date.now()
        toy.inStock = true
        toy.msgs = []
        const collection = await dbService.getCollection(TOY_COLLECTION)
        await collection.insertOne(toy)
        return toy
    } catch (err) {
        logger.error('cannot insert toy', err)
        throw err
    }
}

async function update(toy) {
    try {
        const toyToUpdate = {
            name: toy.name,
            price: toy.price,
            labels: toy.labels
        }
        const collection = await dbService.getCollection(TOY_COLLECTION)
        await collection.updateOne({ _id: ObjectId(toy._id) }, { $set: toyToUpdate })
        return toy
    } catch (err) {
        logger.error(`cannot update toy ${toyId}`, err)
        throw err
    }
}

async function addToyMsg(toyId, msg) {
    try {
        msg.id = utilService.makeId()
        const collection = await dbService.getCollection(TOY_COLLECTION)
        await collection.updateOne({ _id: ObjectId(toyId) }, { $push: { msgs: msg } })
        return msg
    } catch (err) {
        logger.error(`cannot add toy msg ${toyId}`, err)
        throw err
    }
}

async function removeToyMsg(toyId, msgId) {
    try {
        const collection = await dbService.getCollection(TOY_COLLECTION)
        await collection.updateOne({ _id: ObjectId(toyId) }, { $pull: { msgs: { id: msgId } } })
        return msgId
    } catch (err) {
        logger.error(`cannot add toy msg ${toyId}`, err)
        throw err
    }
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
    addToyMsg,
    removeToyMsg,
    getStockByLabels
}