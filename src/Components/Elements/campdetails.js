import { Button, Form, Input } from "antd"
import Modal from "antd/lib/modal/Modal";
import React from "react";
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';

import upiqr from 'upiqr';
import { updateuserlist } from "../../apiCalls";


const Campdetails = ({ data, isregistered }) => {

    const [qrcode, setqrcode] = React.useState()
    const [qrurl, setqrurl] = React.useState()

    const [isModalVisible, setisModalVisible] = React.useState(false)

    const [transcationid, settranscationid] = React.useState('')
    const [error, seterror] = React.useState('')

    const navigate = useNavigate()

    const currentuser = sessionStorage.getItem("email")

    //navigate to bootcamp details page
    const openuserlist = () => {
        navigate(`/bootcamp/${data._id}`)

    }

    //update details
    const handleOk = async () => {
        try {
            if (transcationid.length !== 0) {
                const result = await updateuserlist({
                    id: data._id,
                    //store in bootcamp collection
                    userdata: {
                        name: sessionStorage.getItem("name"),
                        email: sessionStorage.getItem("email"),
                        phoneno: sessionStorage.getItem("phoneno"),
                        transcationid: transcationid,
                        price: data.price,
                        status: "pending"
                    },
                    //store in userlist collections
                    bootcampdata:
                    {
                        transcationid: transcationid,
                        price: data.price,
                        bootcampid: data._id,
                        name: data.name,
                    }

                })
                console.log(result);

                if (result.message === "OK") {
                    toast.success("Registered")
                    setisModalVisible(false)
                    settranscationid('')
                    window.location.reload();
                }
                else
                    toast.error("failed")
            }
            else {
                seterror("Invalid Transcation ID")
            }
        } catch (error) {
            console.error(error.message);
        }


    }


    //generate qrocode for upi transcation
    const campregistration = async (data) => {
        try {
            if (data.userlists.length <= data.userlimit) {
                upiqr({
                    payeeVPA: 'dkkarthik2000@okaxis',
                    payeeName: "Karthikeyan Dhanasekar",
                    amount: data.price,
                    transactionNote: "Thanks for payment kindly save transcation id & details for futher process",
                    format: "png",
                })
                    .then((upi) => {
                        setqrcode(upi.qr);      // data:image/png;base64,eR0lGODP...
                        setqrurl(upi.intent);  // upi://pay?pa=john@upi&pn=JOHN DOE
                        setisModalVisible(true)

                    })
                    .catch(err => {
                        console.error(err);
                    });
            }
            else
                toast.warn("Registration Completed")
        } catch (error) {
            console.error(error.message);
        }
    }


    return (
        <div key={data._id} className="campcard">
            <div key={data._id + 0} >
                <h4>{data.name}</h4>
                <h6>{`by ${data.company}`}</h6>
            </div>
            <div key={data._id + 1} >
                <p>{`Date : ${data.orgdate}`}</p>
                <p>{`Start : ${data.starttime} & End : ${data.endtime}`}</p>
                {!isregistered ?
                    <React.Fragment>
                        <p>{`Status : ${data.status}`}</p>
                        <p>{`Only ${data.userlimit - data.userlists.length} are remaining`}</p>
                        <p className="price">{`INR ${data.price}`}</p>
                        {
                            sessionStorage.getItem("adminemail") ?
                                <Button type="primary" style={{ background: "#008000", color: "#ffffff" }} onClick={openuserlist}>Open</Button>
                                :
                                currentuser ?
                                    <Button type="primary" style={{ background: "#008000", color: "#ffffff" }} onClick={() => campregistration(data)}     >Pay</Button>
                                    :
                                    <Button type="secondary" style={{ background: "#ffffff" }} onClick={() => navigate("/userlogin")}    >Login</Button>


                        }



                    </React.Fragment>

                    : null}

            </div>
            <Modal title="UPI Payment" visible={isModalVisible} onOk={handleOk} onCancel={() => setisModalVisible(false)}>
                <h4>Warning! Save the transacation details once payment success </h4>
                <img src={qrcode} alt="BootOrganizer Payment Gateway" />
                <br />
                {/* <Button type="Text" onClick={() => navigator.clipboard.writeText(qrurl)}  >Copy payment URL</Button> */}
                <Form>
                    <h4>Enter Transcation ID: </h4>
                    <Input name="transcationid" placeholder="Transcation ID" value={transcationid} onChange={(e) => settranscationid(e.target.value)} />
                    <label style={{ color: "#ff0000" }} >{error}</label>
                </Form>
            </Modal>
            <ToastContainer />

        </div >
    )
}

export default Campdetails

/**
 * company: "AWS"
createdAt: "2022-02-24T06:16:00.619Z"
endtime: "17:03"
name: "AWS Beginner"
organizer: "Prakash"
organizer2: "Karthik"
orgdate: "2022-02-26"
phone1: 1324567890
phone2: 1234567890
price: 2000
starttime: "11:46"
status: "open"
userlimit: 100
userlists: []
__v: 0
_id: "621722f99ff832cecb1265d2"
 */