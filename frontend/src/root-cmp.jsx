import './assets/style/main.css'

import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'

import { HomePage } from './views/home-page'
import { ToyIndex } from './views/toy-index'
import { ToyDetails } from './views/toy-details'
import { ToyEdit } from './views/toy-edit'
import { AppHeader } from './cmps/app-header'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppHeader />
        <main>
          <Routes>
            <Route element={<HomePage />} path='/' />
            <Route element={<ToyIndex />} path='/toy' />
            <Route element={<ToyDetails />} path='/toy/:toyId' />
            <Route element={<ToyEdit />} path='/toy/edit/:toyId' />
          </Routes>
        </main>
      </Router>
    </Provider>
  )
}

export default App;
