import { userService } from "../../services/user.service.js"
import { store } from "../store.js"
import { SET_USER } from "../reducers/user.reducer.js"

export function signup(user) {
    return userService.signup(user)
        .then(newUser => {
            store.dispatch({ type: SET_USER, user: newUser })
        })
}

export function logout() {
    return userService.logout().then(() => {
        store.dispatch({ type: SET_USER, user: {} })
    })
}

export function login(credentials) {
    return userService.login(credentials).then((user) => {
        store.dispatch({ type: SET_USER, user })
    })
}