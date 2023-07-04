import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/home'
import Login from './pages/login'
import Header from './components/header'
import Register from './pages/register'
import LogoutPage from './pages/logoutpage'
import NewTicket from './pages/NewTicket'
import Tickets from './pages/Tickets'
import PrivateRoute from './components/PrivateRoute'
import Ticket from './pages/Ticket'

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header></Header>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/logout' element={<LogoutPage/>}/>
            <Route path='/new-ticket' element={<PrivateRoute/>}>
              <Route path='/new-ticket' element={<NewTicket/>}/>
            </Route>
            <Route path='/tickets' element={<PrivateRoute/>}>
              <Route path='/tickets' element={<Tickets/>}/>
            </Route>
            <Route path='/ticket/:ticketId' element={<PrivateRoute/>}>
              <Route path='/ticket/:ticketId' element={<Ticket/>}/>
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer/>

    </>
  );
}

export default App;
