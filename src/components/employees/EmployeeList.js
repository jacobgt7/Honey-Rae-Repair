import { useState, useEffect } from "react"
import { Empolyee } from "./Employee"
import "./EmployeeList.css"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    useEffect(
        () => {
            fetch("http://localhost:8088/users?isStaff=true")
                .then(res => res.json())
                .then(employeeData => {
                    setEmployees(employeeData)
                })
        },
        []
    )

    return <article className="employees">
        {
            employees.map(employee => <Empolyee
                key={`employee--${employee.id}`}
                id={employee.id}
                fullName={employee.fullName}
                email={employee.email} />)
        }
    </article>

}