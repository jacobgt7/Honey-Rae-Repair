import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Ticket } from "./Ticket"
import "./tickets.css"

export const TicketList = ({ searchTerms }) => {
    const [tickets, setTickets] = useState([])
    const [filteredTickets, setFilteredTickets] = useState([])
    const [emergency, setEmergency] = useState(false)
    const [openOnly, setOpenOnly] = useState(false)
    const [employees, setEmployees] = useState([])
    const navigate = useNavigate()

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    const fetchTickets = () => {
        fetch("http://localhost:8088/serviceTickets?_embed=employeeTickets")
            .then(res => res.json())
            .then((fethcedTickets) => {
                setTickets(fethcedTickets)
            })

    }

    useEffect(
        () => {

            fetchTickets()

            fetch(`http://localhost:8088/employees?_expand=user`)
                .then(res => res.json())
                .then((employeeData) => {
                    setEmployees(employeeData)
                })

        },
        []
    )

    useEffect(
        () => {
            const searchResults = tickets.filter(ticket => ticket.description.toLowerCase().includes(searchTerms.toLowerCase()))
            setFilteredTickets(searchResults)
        },
        [searchTerms]
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
                    return <Ticket ticket={ticket}
                        currentUser={honeyUserObject}
                        employees={employees}
                        fetchTickets={fetchTickets} />
                })
            }
        </article>
    </>)
}