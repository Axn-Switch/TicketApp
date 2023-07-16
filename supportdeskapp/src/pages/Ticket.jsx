import { useSelector, useDispatch } from "react-redux"
import { getTicket, reset, closeTicket} from "../features/tickets/ticketSlice"
import { getNotes, reset as notesReset } from "../features/notes/noteSlice"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import BackButton from "../components/BackButton"
import NoteItem from "../components/NoteItem"
import Spinner from "../components/spinner"
import { toast } from "react-toastify"



function Ticket() {
    const {ticket, isLoading, isSuccess, isError, message} = useSelector((state) => state.tickets)
    const {notes, isLoading: noteIsLoading} = useSelector((state) => state.notes)
    const param = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {ticketId} = useParams()
    useEffect(() => {
        if(isError){
            toast.error(message)
        }
        dispatch(getTicket(ticketId))
        dispatch(getNotes(ticketId))
    }, [isError, message, ticketId])

    const onTicketClose = () => {
        dispatch(closeTicket(ticketId))
        toast.success('ticket has been closed')
        navigate('/tickets')
    }

    if(isLoading || noteIsLoading){
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
                    <h3>{ticket.product}</h3>
                    <h3>Description of the issue</h3>
                    <p>{ticket.description}</p>
                </div>
                <h2>Notes</h2>
            </header>
            {notes.map((note) =>(
                <NoteItem key={note._id} note={note}/>
            ))}
            {ticket.status !== 'closed' &&(<button onClick={onTicketClose}className="btn btn-block btn-danger">Close Ticket</button>)}
        </div>
    </>
  )
}

export default Ticket