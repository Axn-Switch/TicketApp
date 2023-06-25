import { Link } from "react-router-dom"
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa"

function Home() {
  

 const user = JSON.parse(localStorage.getItem('user'));
  return (
    <>
        <section className="heading">
            <h1>What do you need help with {user !== null ? user.name : ''}?</h1>
            <p>Please choose from an option below</p>
        </section>
        <Link to='/new-ticket' className="btn btn-reverse btn-block">
            <FaQuestionCircle/> Create new Ticket
        </Link>
        <Link to='/ticket' className="btn  btn-block">
            <FaTicketAlt/> View my tickets
        </Link>
    </>
  )
}

export default Home