import './assets/style/main.scss'

import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'

import { HomePage } from './views/home-page'
import { ToyIndex } from './views/toy-index'
import { ToyDetails } from './views/toy-details'
import { ToyEdit } from './views/toy-edit'
import { AppHeader } from './cmps/app-header'
import { Dashboard } from './views/dashboard'
import { AboutPage } from './views/about-page'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppHeader />
        <main>
          <Routes>
            <Route element={<HomePage />} path='/' />
            <Route element={<AboutPage />} path='/about' />
            <Route element={<Dashboard />} path='/dashboard' />
            <Route element={<ToyIndex />} path='/toy' />
            <Route element={<ToyDetails />} path='/toy/:toyId' />
            <Route element={<ToyEdit />} path='/toy/edit' />
            <Route element={<ToyEdit />} path='/toy/edit/:toyId' />
          </Routes>
        </main>
      </Router>
      <div onClick={() => document.body.classList.remove('menu-open')} className="overlay"></div>
    </Provider>
  )
}

export default App;
