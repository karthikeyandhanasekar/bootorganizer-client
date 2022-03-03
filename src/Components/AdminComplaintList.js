import React from "react"
import { useNavigate } from "react-router-dom"
import { retrivecomplaints } from "../apiCalls"
import Header from "./Elements/Header"


const AdminComplaintList = () => {
    const navigate = useNavigate()

    const [complaints, getcomplaints] = React.useState()
    document.title = "Complaints"

    React.useEffect(() => {

        if (!sessionStorage.getItem("adminemail"))
            navigate("/adminlogin")
        else
            retrivecomplaints({ id: 0 }).then((res) => {
                getcomplaints(res.value)
            })
    }, [navigate])

    return (
        <React.Fragment>
            <Header active={"complaint"} />
            <main>
                <section className="table">
                    <table className="complaintable">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                                <th>Query</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                complaints?.map((ele, index) =>
                                    <tr className={index % 2 === 0 ? "even" : "odd"}>
                                        <td>{ele._id}</td>
                                        <td>{ele.email}</td>
                                        <td>{ele.query}</td>
                                        <td>{new Date(ele.createdAt).toLocaleString()}</td>
                                    </tr>

                                )
                            }
                        </tbody>
                    </table>
                </section>
            </main>
        </React.Fragment>
    )
}

export default AdminComplaintList