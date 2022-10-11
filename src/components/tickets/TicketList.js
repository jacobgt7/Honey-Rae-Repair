import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./tickets.css"

export const TicketList = () => {
    const [tickets, setTickets] = useState([])
    const [filteredTickets, setFilteredTickets] = useState([])
    const [emergency, setEmergency] = useState(false)
    const [openOnly, setOpenOnly] = useState(false)
    const navigate = useNavigate()

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    useEffect(
        () => {
            fetch("http://localhost:8088/serviceTickets")
                .then(res => res.json())
                .then((fethcedTickets) => {
                    setTickets(fethcedTickets)
                })
        },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            if (honeyUserObject.staff) {
                setFilteredTickets(tickets)
            } else {
                const userTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFilteredTickets(userTickets)
            }
        },
        [tickets]
    )

    useEffect(
        () => {
            if (emergency) {
                const emergencyTickets = tickets.filter(ticket => ticket.emergency === true)
                setFilteredTickets(emergencyTickets)
            } else {
                setFilteredTickets(tickets)
            }
        },
        [emergency]
    )


    useEffect(
        () => {
            if (openOnly) {

                const openTicketArray = tickets.filter(ticket => {
                    return ticket.userId === honeyUserObject.id && ticket.dateCompleted === ""

                })
                setFilteredTickets(openTicketArray)
            } else {
                const userTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFilteredTickets(userTickets)
            }
        },
        [openOnly]
    )


    return (<>
        {
            honeyUserObject.staff ?
                <>
                    <button onClick={() => { setEmergency(true) }} >Emergency Only</button>
                    <button onClick={() => { setEmergency(false) }} >Show All</button>
                </>
                : <>
                    <button onClick={() => navigate("/ticket/create")}>Create Ticket</button>
                    <button onClick={() => setOpenOnly(true)}>Open Tickets</button>
                    <button onClick={() => setOpenOnly(false)}>All My Tickets</button>
                </>
        }

        <h2>List of Tickets</h2>

        <article className="tickets">
            {
                filteredTickets.map(ticket => {
                    return <section className="ticket" key={ticket.id}>
                        <header>{ticket.description}</header>
                        <footer>Emergency: {ticket.emergency ? "Yes" : "No"}</footer>
                    </section>
                })
            }
        </article>
    </>)
}