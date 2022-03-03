import { Button, Table } from "antd";
import Column from "antd/lib/table/Column";
import ColumnGroup from "antd/lib/table/ColumnGroup";
import React from "react";
import { useParams } from "react-router"
import { retirvespecificbootcamp, verifytranscationdetails } from "../apiCalls";
import Header from "./Elements/Header";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const AdminUserList = () => {
    const [bootcampdata, setbootcampdata] = React.useState()
    const params = useParams()
    const id = params.id
    const navigate = useNavigate()

    React.useEffect(() => {
        if (!sessionStorage.getItem("adminemail"))
            navigate("/")
        retirvespecificbootcamp({ id: id }).then((res) => {
            setbootcampdata(res.bootlist)
        })

    }, [id, navigate])

    const verifytranscation = async ({ data, text }) => {
        console.log(data);
        try {
            const success = () => {
                toast.success("Verified")
                window.location.reload()
            }
            const result = await verifytranscationdetails({ email: data.email, bname: bootcampdata.name, id: id, name: data.name })
            result.message === "OK" ? success() : toast.error("Error Received")
        } catch (error) {
            console.error(error.message);
        }
    }

    document.title = bootcampdata?.name
    return (
        <React.Fragment>
            <Header active={"home"} />
            <main>
                <section className="bootcampdata">
                    <div className="bootcampdetails">
                        <h1>{bootcampdata?.name}</h1>

                        <h3>{bootcampdata?.orgdate}</h3>
                        <h3>{bootcampdata?.starttime + "-" + bootcampdata?.endtime}</h3>
                        <p>{`Only ${bootcampdata?.userlimit - bootcampdata?.userlists.length} are remaining`}</p>

                    </div>
                    <div className="usertablelist">
                        <Table dataSource={bootcampdata?.userlists}>
                            <ColumnGroup>
                                <Column title="Name" dataIndex="name" key="name" responsive={['sm']} />
                                <Column title="Phone Number" dataIndex="phoneno" key="phoneno" responsive={['sm']} />
                                <Column title="Transcation ID" dataIndex="transcationid" key="transctionid" />
                                {/* <Column title="Status" dataIndex="status" key="status" responsive={["sm"]} /> */}
                                <Column title="Status" dataIndex="email" key="verify" render={
                                    (text, row) => {
                                        if (row.status === "verified")
                                            return (<p style={{ color: "darkgreen" }}>Verified</p>)
                                        else
                                            return <Button type="primary" onClick={() => verifytranscation({
                                                data: row,
                                                text: text
                                            })}   >Verify</Button>

                                    }

                                } />


                            </ColumnGroup>
                        </Table>
                    </div>
                </section>
                <ToastContainer />
            </main>
        </React.Fragment>
    )
}

export default AdminUserList