import { storageService } from "./async-storage.service.js"
import { utilService } from "./util.service.js"

export const toyService = {
    query,
    getById,
    getEmptyToy,
    save
}

const STORAGE_KEY = 'toyDB'
_createDemoToys()

function query() {
    return storageService.query(STORAGE_KEY)
}

function getById(toyId) {
    return storageService.query(STORAGE_KEY).then(toys => {
        const toy = toys.find(toy => toy._id === toyId)
        if (!toy) return Promise.reject('Cannot find toy')
        return { ...toy, msgs: ['hello world', 'much javascript'] }
    })
}

function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        toy.createdAt = Date.now()
        toy.inStock = true
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        name: "",
        price: "",
        labels: []
    }
}

// labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"]

function _createDemoToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = [
            {
                _id: "t101",
                name: "Talking Doll",
                price: 123,
                labels: ["Doll", "Battery Powered", "Baby"],
                createdAt: 1631031801011,
                inStock: true
            },
            {
                _id: "t102",
                name: "Buzz Lightyear",
                price: 420,
                labels: ["Doll", "Battery Powered"],
                createdAt: 1631031801011,
                inStock: true
            },
            {
                _id: "t103",
                name: "Harry Potter puzzle",
                price: 37,
                labels: ["Puzzle"],
                createdAt: 1631031801011,
                inStock: true
            }
        ]
    }
    utilService.saveToStorage(STORAGE_KEY, toys)
}