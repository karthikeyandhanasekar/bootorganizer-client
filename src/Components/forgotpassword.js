
import { Button, Input, Form } from "antd"
import React from "react"
import { useForm, Controller } from "react-hook-form";
import { forgotpassword } from "../apiCalls";
import { ToastContainer, toast } from 'react-toastify';

import { useNavigate } from "react-router-dom";


const ForgotPassword = () => {
    const { handleSubmit, control, reset } = useForm();

    const navigate = useNavigate()

    const onsubmit = async (data) => {
        console.log(data);
        if (data.password === data.cpassword && data.password.length >= 8 && data.password.length <= 12) {
            const result = await forgotpassword({ email: data.email, password: data.password })
            reset({
                email: "",
                password: "",
                cpassword: ""
            })
            result.message === "OK" ? navigate("/userlogin") : toast.error(result.message)

        }
        else {
            toast.error("Password is not match or doesn't have 8-12 characters")
        }
    }

    return (
        <main className="forgetpass">
            <section >
                <h1>Forgot Password</h1>
                <Form layout="vertical" onFinish={handleSubmit(onsubmit)}>
                    {/* email */}
                    <Form.Item label="Email" required tooltip="Email is required" >
                        <Controller control={control}
                            name="email"
                            render={({ field }) =>
                                <Input {...field} placeholder="Email" required />
                            } />
                    </Form.Item>
                    {/* password */}
                    <Form.Item label="Password" required tooltip="Password is required" >
                        <Controller control={control}
                            name="password"
                            render={({ field }) =>
                                <Input.Password {...field} placeholder="password" autoComplete="on" required />
                            } />
                    </Form.Item>
                    {/* confirm password */}
                    <Form.Item label="Confirm Password" required tooltip=" Confirm Password is required" >
                        <Controller control={control}
                            name="cpassword"
                            render={({ field }) =>
                                <Input.Password {...field} placeholder="confirm password" autoComplete="on" required />
                            } />
                    </Form.Item>
                    <Button type="primary" style={{ background: '#FF2853' }} htmlType="submit">
                        Reset Password
                    </Button>
                    <Button type="text" onClick={() => navigate("/userlogin")}>
                        To Login
                    </Button>

                </Form>
                <ToastContainer />
            </section>
        </main>
    )
}


export default ForgotPassword