import { toyService } from "../../services/toy.service.js"

export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const SET_FILTER = 'SET_FILTER'

const initialState = {
    toys: [],
    filterBy: toyService.getDefaultFilter()
}

export function toyReducer(state = initialState, action) {
    let toys
    switch (action.type) {
        case SET_TOYS:
            return { ...state, toys: action.toys }
        case SET_FILTER:
            return { ...state, filterBy: action.filterBy }
        case REMOVE_TOY:
            toys = state.toys.filter(toy => toy._id !== action.toyId)
            return { ...state, toys }
        default:
            return state
    }
}