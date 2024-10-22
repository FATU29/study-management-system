import { Button, TextField } from "@mui/material";
import React from "react";
import { useForm, Controller } from 'react-hook-form';


const ForgotPasswordPage = () => {
    return (
        <>
            <div className="w-screen h-screen flex bg-white justify-center items-center">
                <div className="bg-slate-200 w-[70%] h-[50%] flex justify-center items-center">

                 
                        <div className="flex flex-col justify-center items-center p-[1rem] rounded-l-lg w-1/2 bg-blue-500 h-full">
                            hello
                    </div>   
                 

                    
                        <div className="flex flex-col justify-center items-center p-[1rem] rounded-r-lg w-1/2 bg-slate-500 h-full">
                        <form>
                            <div className="flex flex-col justify-center items-center gap-5">
                                <div className="w-[20rem]">
                                    <TextField sx={{
                                        width:"100%"
                                    }} label="Email" variant="outlined" />
                                </div>
                                <div className="w-[20rem]">
                                    <TextField sx={{
                                        width:"100%"
                                    }} label="Mật khẩu mới" variant="outlined" />
                                </div>
                                <div className="w-[20rem]">
                                    <TextField sx={{
                                        width:"100%"
                                    }} label="Xác nhận mật khẩu mới" variant="outlined" />
                                </div>
                                <Button onClick={() => {
                                    alert("Hello Minh Tý")
                                }} sx={{
                                    width:"20rem"
                                }} type="submit" variant="contained">Xác nhận</Button>
                            </div>


                        </form>
                   

                    </div>
                </div>
            </div>


        </>
    )
};

export default ForgotPasswordPage;