import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import EventPage from './pages/EventPage'
import CategoryPage from './pages/CategoryPage'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import './styles/global.scss'
import SanityEventDetails from './pages/SanityEventDetails'
import { useEffect, useState } from 'react'
import { fetchAllSanityEvents, fetchAllSanityUsers } from './sanityComponents/fetches'


function App() {
  const [sanityUsers, setSanityUsers] = useState([]);
  const [sanityEvents, setSanityEvents] = useState([]);

  const getAllSanityUsers = async () => {
      const data = await fetchAllSanityUsers();
      setSanityUsers(data);
  };

  const getAllSanityEvents = async () => {
      const data = await fetchAllSanityEvents();
      setSanityEvents(data);
  };

  useEffect(() => {
        getAllSanityUsers();
        getAllSanityEvents();
    }, []);

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event/:slug" element={<EventPage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/dashboard" element={<Dashboard 
            sanityUsers={sanityUsers} 
            sanityEvents={sanityEvents} />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/sanity-event/:id" element={<SanityEventDetails sanityUsers={sanityUsers} />}></Route>
        </Routes>
      </Layout>
    </>
  )
}

export default App
