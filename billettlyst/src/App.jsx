import { Route, Routes } from 'react-router-dom'

import Layout from './components/Layout'
import Home from './pages/Home'
import EventPage from './pages/EventPage'
import CategoryPage from './pages/CategoryPage'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'

import './styles/global.scss'


function App() {

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event/:slug" element={<EventPage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App
