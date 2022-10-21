import { Link } from "react-router-dom"

export const Ticket = ({ ticket, currentUser, employees, fetchTickets }) => {

    const currentUserEmployee = employees.find(employee => employee.userId === currentUser.id)

    let assignedEmployee = null

    if (ticket.employeeTickets.length) {
        const employeeTicketObject = ticket.employeeTickets[0]
        assignedEmployee = employees.find(employee => employee.id === employeeTicketObject.employeeId)
    }

    const canClose = () => {
        if (currentUser.staff && currentUserEmployee?.id === assignedEmployee?.id && ticket.dateCompleted === "") {
            return <button onClick={closeTicket} className="ticket__finish">Finish</button>
        } else {
            return ""
        }
    }

    const deleteButton = () => {
        if (!currentUser.staff) {
            return <button onClick={() => {
                fetch(`http://localhost:8088/serviceTickets/${ticket.id}`, {
                    method: "DELETE"
                })
                    .then(fetchTickets)
            }}
                className="ticket__delete" > Delete</button >
        }
        else {
            return ""
        }
    }

    const closeTicket = () => {
        const copy = {
            userId: ticket.userId,
            description: ticket.description,
            emergency: ticket.emergency,
            dateCompleted: new Date()
        }

        return fetch(`http://localhost:8088/serviceTickets/${ticket.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(copy)
        })
            .then(res => res.json())
            .then(fetchTickets)

    }

    const handleClaimButton = () => {
        fetch(`http://localhost:8088/employeeTickets`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                employeeId: currentUserEmployee.id,
                serviceTicketId: ticket.id
            })
        }
        )
            .then(res => res.json())
            .then(() => {
                fetchTickets()
            })

    }

    const claimButtonOrNot = () => {
        if (currentUser.staff) {
            return <button onClick={handleClaimButton}>Claim</button>
        } else {
            return ""
        }
    }

    return <>
        <section className="ticket" key={ticket.id}>
            <header>
                {
                    currentUser.staff ? <h4>Ticket {ticket.id}</h4>
                        : <Link to={`/tickets/${ticket.id}/edit`}>Ticket {ticket.id}</Link>
                }

            </header>
            <div>{ticket.description}</div>
            <div>Emergency: {ticket.emergency ? "Yes" : "No"}</div>
            <footer>
                {
                    ticket.employeeTickets.length
                        ? `Currently being worked on by ${assignedEmployee?.user?.fullName}`
                        : claimButtonOrNot()
                }
                {
                    canClose()
                }
                {
                    deleteButton()
                }
            </footer>
        </section>


    </>
}