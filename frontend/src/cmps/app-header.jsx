import { NavLink } from 'react-router-dom'

export function AppHeader() {

    function onToggleMenu(){
        document.body.classList.toggle('menu-open')
    }

    function onCloseMenu() {
        document.body.classList.remove('menu-open')
    }

    return (
        <header className="main-header full main-layout">
            <div className='header-container'>
                <div className="brand"><h1>Tois</h1></div>
                <nav className='main-layout'>
                    <NavLink onClick={onCloseMenu} to='/'>Home</NavLink>
                    <NavLink onClick={onCloseMenu} to='/about'>About</NavLink>
                    <NavLink onClick={onCloseMenu} to='/dashboard'>Dashboard</NavLink>
                    <NavLink onClick={onCloseMenu} to='/toy'>Toys</NavLink>
                </nav>
                <div onClick={onToggleMenu} className="hamburger">☰</div>
            </div>
        </header>
    )
}