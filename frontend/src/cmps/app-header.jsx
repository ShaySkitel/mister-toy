import { NavLink } from 'react-router-dom'

export function AppHeader() {
    return (
        <header className="main-header full main-layout">
            <div className='header-container'>
                <div className="brand"><h1>Tois</h1></div>
                <nav>
                    <NavLink to='/'>Home</NavLink>
                    <NavLink to='/toy'>Toys</NavLink>
                </nav>
            </div>
        </header>
    )
}