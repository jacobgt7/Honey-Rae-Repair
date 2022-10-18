import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const CustomerDetails = () => {
    const { customerId } = useParams()
    const [customer, setCustomer] = useState({})

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers/${customerId}?_expand=user`)
                .then(res => res.json())
                .then(customerData => {
                    setCustomer(customerData)
                })
        },
        []
    )


    return <>
        <h1>Customer Details</h1>
        <section className="customerDetails">
            <h2>{customer?.user?.fullName}</h2>
            <div>Email: {customer?.user?.email}</div>
            <div>Phone: {customer.phoneNumber}</div>
            <div>Address: {customer.address}</div>
        </section>
    </>
}