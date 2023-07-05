import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getTickets, reset } from "../features/tickets/ticketSlice"
import Spinner from "../components/spinner"
import BackButton from "../components/BackButton"
import TicketItem from "../components/TicketItem"

function Tickets() {
    const {tickets, isLoading, isSuccess} = useSelector((state) => state.tickets)

    const dispatch = useDispatch();

    useEffect(() =>{
        return () => {
            if(isSuccess){
                dispatch(reset())
            }
        }
    },[dispatch,isSuccess])

    useEffect(() =>{
        dispatch(getTickets())
    },[dispatch])

    if(isLoading){
        return <Spinner/>
    }

    if(tickets === null){
        return <h1>No tickets to display</h1>
    }
  return (
    <>
        <BackButton url='/'/>
        <h1>Tickets</h1>
        <div className="tickets">
            <div className="ticket-headings">
                <div>Date</div>
                <div>Product</div>
                <div>Status</div>
                <div></div>
            </div>
            {tickets?.length ?
                tickets.map((ticket) => (
                    <TicketItem key={ticket._id} ticket={ticket}/>
                ))
                : <h3>No Tickets to display</h3>
            }       
        </div>
    </>
  )
}

export default Tickets