import { useSelector, useDispatch } from "react-redux"
import { getTicket, reset} from "../features/tickets/ticketSlice"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import BackButton from "../components/BackButton"
import Spinner from "../components/spinner"
import { toast } from "react-toastify"



function Ticket() {
    const {ticket, isLoading, isSuccess, isError, message} = useSelector((state) => state.tickets)
    const param = useParams()
    const dispatch = useDispatch()
    const {ticketId} = useParams()
    useEffect(() => {
        if(isError){
            toast.error(message)
        }
        dispatch(getTicket(ticketId))
    }, [isError, message, ticketId])


    if(isLoading){
        return<Spinner/>
    }

    if(isError){
        return <h2>Something went wrong</h2>
    }
  return (
    <>
        <div className="ticket-page">
            <header className="ticket-header">
                <BackButton url='/tickets'/>
                <h2>Ticket Id: {ticket._id}
                    <span className={`status status-${ticket.status}`}>{ticket.status}  </span>
                </h2>
                <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-uS')}</h3>
                <hr/>
                <div className="ticket-desc">
                    <h3>Description of the issue</h3>
                    <p>{ticket.description}</p>
                </div>
            </header>
        </div>
    </>
  )
}

export default Ticket