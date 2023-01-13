import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { userService } from "../services/user.service.js"
import { login, signup } from "../store/actions/user.action.js"

export function LoginSignup() {

    const [isSignUp, setIsSignUp] = useState(false)
    const [user, setUser] = useState(userService.getEmptyUser())
    const navigate = useNavigate()

    function handleChange({ target }) {
        const { value, name: field } = target
        setUser(prevUser => ({ ...prevUser, [field]: value }))
    }

    function handleToggleSignUp() {
        setUser(userService.getEmptyUser())
        setIsSignUp(prevSignUp => !prevSignUp)
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        if (isSignUp) {
            signup(user).then(() => navigate('/toy'))
                .catch(err => {
                    console.log('Cant signup ', err)
                })
        } else {
            login(user)
                .then(() => navigate('/toy'))
                .catch(err => {
                    console.log('Cant login ', err)
                })
        }
    }

    return (
        <section className="login-signup">
            <h2>{isSignUp ? 'Signup' : 'Login'}</h2>
            <form onSubmit={handleSubmit}>
                {isSignUp && <input value={user.fullname} name="fullname" onChange={handleChange} required type="text" placeholder="Fullname" />}
                <input value={user.username} name="username" onChange={handleChange} required type="text" placeholder="Username" />
                <input value={user.password} name="password" onChange={handleChange} required type="password" placeholder="Password" />
                <button className="btn">{isSignUp ? 'Signup' : 'Login'}</button>
            </form>
            <button className="btn" onClick={handleToggleSignUp}>{isSignUp ? 'Already a member? Login' : 'New user? Signup'}</button>
        </section>
    )
}