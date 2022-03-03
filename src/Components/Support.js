import React from 'react'
import Header from "./Elements/Header"
import { Button, Input, Form } from "antd"
import { useForm, Controller } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import TextArea from 'antd/lib/input/TextArea';
import { userhelpsupport } from '../apiCalls';

document.title = "Support"

const Support = () => {
    const { handleSubmit, control, reset } = useForm();

    //form submit
    const onsubmit = async (data) => {
        const result = await userhelpsupport({
            email: data.email,
            query: data.query
        })

        result.message === "OK" ? toast.success("Complaint Raised") : toast.error("Error Occured")


        reset({
            email: "",
            query: ""
        })
    }
    return (
        <React.Fragment>
            <Header active={"support"} />
            <main>
                <section className='supportpage'>
                    <div>
                        <blockquote className>
                            <cite>
                                There is no exercise better for the heart than reaching down and lifting people up.
                            </cite>
                            <br />
                            - John Holmes
                        </blockquote>
                    </div>
                    <div className='supportform' >
                        <Form layout="vertical" onFinish={handleSubmit(onsubmit)}>
                            {/* email */}
                            <Form.Item label="Email" required tooltip="Email is required" >
                                <Controller control={control}
                                    name="email"
                                    render={({ field }) =>
                                        <Input {...field} placeholder="Email" style={{ width: 500 }} required />
                                    } />
                            </Form.Item>
                            {/* query */}
                            <Form.Item label="Query" required tooltip="Query is required" >
                                <Controller control={control}
                                    name="query"
                                    render={({ field }) =>
                                        <TextArea showCount maxLength={1000} style={{ width: 500 }} {...field} />
                                    } />
                            </Form.Item>
                            <Button type="primary" style={{ background: '#FF2853' }} htmlType="submit">
                                Send
                            </Button>
                        </Form>
                        <ToastContainer />
                    </div>
                </section>
            </main>
        </React.Fragment>
    )
}

export default Support