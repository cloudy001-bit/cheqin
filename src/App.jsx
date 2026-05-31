import { Routes, Route, useLocation  } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import NewEvent from './pages/Newevent'
import Checkout from './pages/checkout'

function App() {

    const location = useLocation()

    // List routes where navbar should be hidden
    const hideNavbar = ['/dashboard', '/newevent', "/checkout"]


    
  return (
    <>
        {!hideNavbar.includes(location.pathname.toLowerCase()) && <Navbar />}
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/newevent' element={<NewEvent />} />
        <Route path='/checkout' element={<Checkout />} />
      </Routes>
    </>
  )
}

export default App;