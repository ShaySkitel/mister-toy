import { toyService } from '../../services/toy.service.js'
import { REMOVE_TOY, SET_TOYS } from '../reducers/toy.reducer.js'
import { store } from '../store.js'

export function loadToys() {
    return toyService.query()
        .then(toys => {
            store.dispatch({ type: SET_TOYS, toys })
        })
}

export function removeToy(toyId) {
    toyService.remove(toyId)
        .then(() => {
            store.dispatch({ type: REMOVE_TOY, toyId })
        })
}