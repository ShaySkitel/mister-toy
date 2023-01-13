import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { logout } from '../store/actions/user.action'

export function AppHeader() {

    const user = useSelector(storeState => storeState.userModule.user)
    const navigate = useNavigate()

    function onToggleMenu() {
        document.body.classList.toggle('menu-open')
    }

    function onCloseMenu() {
        document.body.classList.remove('menu-open')
    }

    function handleLogout() {
        logout().then(() => navigate('/login'))
    }

    return (
        <header className="main-header full main-layout">
            <div className='header-container'>
                <div className="brand"><h1>Tois</h1></div>
                <nav className='main-layout'>
                    <NavLink onClick={onCloseMenu} to='/'>Home</NavLink>
                    <NavLink onClick={onCloseMenu} to='/about'>About</NavLink>
                    {user.isAdmin && <NavLink onClick={onCloseMenu} to='/dashboard'>Dashboard</NavLink>}
                    <NavLink onClick={onCloseMenu} to='/toy'>Toys</NavLink>
                    {!user._id && <NavLink onClick={onCloseMenu} to='/login'>Login</NavLink>}
                    {user._id && <NavLink onClick={onCloseMenu} to='/login'>{user.username}</NavLink>}
                    {user._id && <a onClick={() => { onCloseMenu(); handleLogout() }}>Logout</a>}
                </nav>
                <div onClick={onToggleMenu} className="hamburger">☰</div>
            </div>
        </header>
    )
}