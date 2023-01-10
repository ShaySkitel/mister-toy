import { toyService } from '../../services/toy.service.js'
import { REMOVE_TOY, SET_TOYS, ADD_TOY, UPDATE_TOY } from '../reducers/toy.reducer.js'
import { store } from '../store.js'

export function loadToys(filterBy) {
    return toyService.query(filterBy)
        .then(toys => {
            store.dispatch({ type: SET_TOYS, toys })
        })
}

export function removeToy(toyId) {
    return toyService.remove(toyId)
        .then(() => {
            store.dispatch({ type: REMOVE_TOY, toyId })
        })
}

export function saveToy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    return toyService.save(toy)
        .then(toy => {
            store.dispatch({ type, toy })
        })
}