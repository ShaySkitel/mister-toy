import './assets/style/main.css'

import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { HomePage } from './views/home-page'
import { Provider } from 'react-redux'
import { store } from './store/store'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <main>
          <Routes>
            <Route element={<HomePage />} path='/' />
          </Routes>
        </main>
      </Router>
    </Provider>
  )
}

export default App;
