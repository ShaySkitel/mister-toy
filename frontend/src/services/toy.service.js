import { httpService } from "./http.service.js"
import { utilService } from "./util.service.js"

export const toyService = {
    query,
    getById,
    getEmptyToy,
    save,
    remove,
    getDefaultFilter,
    getLabels
}

const STORAGE_KEY = 'toyDB'
const BASE_URL = 'toy/'
_createDemoToys()

function query(filterBy) {
    const queryParams = `?onlyInStock=${filterBy.onlyInStock}&searchStr=${filterBy.searchStr}&sortBy=${filterBy.sortBy}&labels=${filterBy.labels}`
    return httpService.get(BASE_URL + queryParams)
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {
        console.log(toy)
        return httpService.put(BASE_URL, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function getEmptyToy() {
    return {
        name: "",
        price: "",
        labels: []
    }
}

function getDefaultFilter() {
    return {
        searchStr: '',
        onlyInStock: false,
        labels: [],
        sortBy: 'date'
    }
}

function getLabels(asObject = false) {
    if (asObject) {
        return [
            { value: 'on wheels', label: 'On wheels' },
            { value: 'box game', label: 'Box game' },
            { value: 'art', label: 'Art' },
            { value: 'baby', label: 'Baby' },
            { value: 'doll', label: 'Doll' },
            { value: 'puzzle', label: 'Puzzle' },
            { value: 'outdoor', label: 'Outdoor' },
            { value: 'battery powered', label: 'Battery Powered' }
        ]
    }
    return ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"]
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
                inStock: false
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