import { Button } from "antd"
import React from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { retrivecomplaints, updatecomplaintstatus } from "../apiCalls"
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


    const complaintresolve = async ({ id, email }) => {
        try {

            const onsuccess = () => {
                toast.success("Resolved")
                window.location.reload()
            }
            const result = await updatecomplaintstatus({
                id: id,
                email: email
            })
            result.message === "OK" ? onsuccess() : toast.error("failed")
        } catch (error) {
            console.error(error.message);
        }
    }

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
                                <th>Status</th>

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
                                        <td><Button type="danger" onClick={() => complaintresolve({ id: ele._id, email: ele.email })} >Resolve</Button></td>
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