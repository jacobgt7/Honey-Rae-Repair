import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const TicketForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [ticket, update] = useState({
        userId: 0,
        description: "",
        emergency: false,
        dateCompleted: ""
    })
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)


    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const ticketObj = {
            userId: honeyUserObject.id,
            description: ticket.description,
            emergency: ticket.emergency,
            dateCompleted: ""
        }

        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticketObj)
        }

        fetch("http://localhost:8088/serviceTickets", fetchOptions)
            .then(res => res.json())
    }


    const handleInputChange = (event) => {
        const newTicket = { ...ticket }

        newTicket[event.target.id] = event.target.value

        update(newTicket)
    }

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        id="description"
                        placeholder="Brief description of problem"
                        value={ticket.description}
                        onChange={handleInputChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input type="checkbox"
                        id="emergency"
                        value={ticket.emergency}
                        onChange={handleInputChange} />
                </div>
            </fieldset>
            <button className="btn btn-primary" onClick={handleSaveButtonClick}>
                Submit Ticket
            </button>
        </form>
    )
}