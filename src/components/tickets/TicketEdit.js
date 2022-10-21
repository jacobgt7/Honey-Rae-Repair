import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const TicketEdit = () => {
    const { ticketId } = useParams()

    const navigate = useNavigate()

    const [ticket, setTicket] = useState({
        userId: 0,
        description: "",
        emergency: false,
        dateCompleted: ""
    })

    useEffect(() => {
        fetch(`http://localhost:8088/serviceTickets/${ticketId}`)
            .then(res => res.json())
            .then((ticketData) => {
                setTicket(ticketData)
            })
    }, [])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        fetch(`http://localhost:8088/serviceTickets/${ticketId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticket)
        })
            .then(res => res.json())
            .then(() => {
                navigate("/tickets")
            })
    }


    return <form className="ticketForm">
        <h2 className="ticketForm__title">Service Ticket</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                    required autoFocus
                    type="text"
                    style={{
                        height: "10rem"
                    }}
                    className="form-control"
                    value={ticket.description}
                    onChange={
                        (evt) => {
                            const copy = { ...ticket }
                            copy.description = evt.target.value
                            setTicket(copy)
                        }
                    }>{ticket.description}</textarea>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="name">Emergency:</label>
                <input type="checkbox"
                    checked={ticket.emergency}
                    onChange={
                        (evt) => {
                            const copy = { ...ticket }
                            copy.emergency = evt.target.checked
                            setTicket(copy)
                        }
                    } />
            </div>
        </fieldset>
        <button
            onClick={handleSaveButtonClick}
            className="btn btn-primary">
            Save Edits
        </button>
    </form>
}
