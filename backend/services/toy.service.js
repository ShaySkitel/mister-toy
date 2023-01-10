const fs = require('fs')
let toys = require('../data/toy.json')

module.exports = {
    query,
    get,
    save,
    remove,
    getStockByLabels
}

function query(filterBy) {
    filterBy.onlyInStock = filterBy.onlyInStock === 'false' ? false : true
    let toysCopy = [...toys]
    const nameRegex = new RegExp(filterBy.searchStr, 'i')

    toysCopy = toysCopy.filter(toy => nameRegex.test(toy.name) && toy.labels.join('').includes(filterBy.labels))

    if (filterBy.onlyInStock) toysCopy = toysCopy.filter(toy => toy.inStock)

    if (filterBy.sortBy === 'name') {
        toysCopy = toysCopy.sort((toy1, toy2) => toy1.name.localeCompare(toy2.name))
    } else if (filterBy.sortBy === 'price') {
        toysCopy = toysCopy.sort((toy1, toy2) => toy1.price - toy2.price)
    }

    return Promise.resolve(toysCopy)
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
        toy.createdAt = Date.now()
        toy.inStock = true
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

function getStockByLabels() {
    const toyStockMap = toys.reduce((acc, toy) => {
        if (!toy.inStock) return acc

        toy.labels.forEach(label => {
            if (!acc[label]) acc[label] = 0
            acc[label]++
        })

        return acc
    }, {})

    return Promise.resolve(toyStockMap)
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
        const data = JSON.stringify(toys, null, 2)
        fs.writeFile('data/toy.json', data, (err) => {
            if (err) return rej(err)
            res()
        })
    })
}