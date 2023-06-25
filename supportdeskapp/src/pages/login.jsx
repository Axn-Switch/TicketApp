import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {FaSignInAlt} from 'react-icons/fa'
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import {login, reset} from '../features/auth/authSlice'
import Spinner from '../components/spinner'

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const {user, isLoading, isSuccess, isError, message} = useSelector(state => state.auth)

    const {email, password} = formData
    
    const navigate = useNavigate()
    
    const dispatch = useDispatch() 

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    useEffect(() => {
        if(isError){
            toast.error(message)
        }

        //Redirect if login is successful
        if(isSuccess || user){
            navigate('/')
        }
        dispatch(reset())
    }, [isError, isSuccess,user, message, navigate, dispatch])

    const onSubmit = (e) =>{
        e.preventDefault()

        const userData = {
            email, 
            password
        }
        dispatch(login(userData))
    }

    if(isLoading){
        return <Spinner/>
    }
  return (
    <>
        <section className="heading">
            <h1>
                <FaSignInAlt/>Login
            </h1>
            <p>Login to your account</p>
        </section>
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="email" className="form-control" id='email' name='email' value={email} onChange={onChange} placeholder='Enter your email' required/>
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" id='password' name='password' value={password} onChange={onChange} placeholder='Enter your password' required/>
                </div>
                <div className="form-group">
                    <button className="btn btn-block">Submit</button>
                </div>
            </form>
        </section>
    </>
  )
}

export default Login