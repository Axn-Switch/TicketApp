import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/home'
import Login from './pages/login'
import Header from './components/header'
import Register from './pages/register'
import LogoutPage from './pages/logoutpage'

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
          </Routes>
        </div>
      </Router>
      <ToastContainer/>

    </>
  );
}

export default App;
