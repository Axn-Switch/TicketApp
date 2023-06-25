import {useNavigate} from 'react-router-dom'

function Logoutpage() {
    const navigate = useNavigate()

    const goToHome = () =>{
        navigate('/')
    }

    setTimeout(goToHome, 3000);
  return (
    <section className="heading">
        <h1>Successfully logged out</h1>
    </section>
  )
}

export default Logoutpage