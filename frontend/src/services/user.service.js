import { httpService } from "./http.service.js"

export const userService = {
    getEmptyUser,
    getLoggedinUser,
    signup,
    logout,
    login
}

const BASE_URL = 'auth/'

async function signup(user) {
    const newUser = await httpService.post(BASE_URL + 'signup', user)
    _saveToSession(newUser)
    return newUser
}

async function login(user) {
    const loggedInUser = await httpService.post(BASE_URL + 'login', user)
    _saveToSession(loggedInUser)
    return loggedInUser
}

async function logout() {
    await httpService.post(BASE_URL + 'logout')
    _clearLoggedinUser()
}

function getEmptyUser() {
    return {
        fullname: '',
        username: '',
        password: ''
    }
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem('currUser') || null)
}

function _saveToSession(user) {
    sessionStorage.setItem('currUser', JSON.stringify(user))
}

function _clearLoggedinUser() {
    sessionStorage.setItem('currUser', null)
}