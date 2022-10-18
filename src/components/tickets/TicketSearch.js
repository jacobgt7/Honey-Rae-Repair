

export const TicketSearch = ({ setSearchTerms }) => {


    return (
        <div>
            <input
                onChange={
                    (e) => {
                        setSearchTerms(e.target.value)
                    }
                }
                type="text" placeholder="Enter search terms" />
        </div>

    )
}