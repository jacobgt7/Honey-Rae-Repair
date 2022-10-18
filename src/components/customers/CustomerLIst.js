import { useEffect, useState } from "react"
import { Customer } from "./Customer"

export const CustomerList = () => {
    const [customers, setCustomers] = useState([])

    useEffect(
        () => {
            fetch("http://localhost:8088/customers?_expand=user")
                .then(res => res.json())
                .then(customersData => {
                    setCustomers(customersData)
                })
        },
        []
    )



    return <>
        <h1>Customers</h1>
        <article className="customers">
            {
                customers.map(
                    (customer) => {
                        return <Customer key={`customer--${customer.id}`} customer={customer} />
                    }
                )
            }
        </article>
    </>
}