const fs = require('fs')
let toys = require('../data/toy.json')

module.exports = {
    query,
    get,
    save,
    remove
}

function query() {
    return Promise.resolve(toys)
}

function get(toyId) {
    const toy = toys.find(toy => toy._id === toyId)
    if (!toy) return Promise.reject('Toy not found')
    return Promise.resolve(toy)
}

function save(toy) {
    if (toy._id) {
        const toyToUpdate = toys.find(currToy => currToy._id === toy._id)
        if (!toyToUpdate) return Promise.reject('Toy not found')

        toyToUpdate.name = toy.name
        toyToUpdate.price = toy.price
    } else {
        toy._id = _makeId()
        toys.unshift(toy)
    }

    return _writeToFile().then(() => toy)
}

function remove(toyId) {
    const toyIdx = toys.findIndex(toy => toy._id === toyId)
    if (toyIdx === -1) return Promise.reject('Toy not found')
    toys.splice(toyIdx, 1)
    return _writeToFile()

}

function _makeId(length = 8) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function _writeToFile() {
    return new Promise((res, rej) => {
        const data = JSON.stringify(cars, null, 2)
        fs.writeFile('data/toy.json', data, (err) => {
            if (err) return rej(err)
            res()
        })
    })
}