import { Button, TextField } from "@mui/material";
import React from "react";
import { useForm, Controller } from 'react-hook-form';


const ForgotPasswordPage = () => {
    return (
        <div className="flex items-center justify-center bg-white min-h-screen p-4">
            <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-12 text-white w-full flex flex-col justify-center md:w-1/2 bg-blue-500">
                    <div className="flex items-center mb-8">
                        <div className="w-8 h-8 mr-2 border-2 border-white rounded-full flex items-center justify-center">
                            <div className="w-4 h-4 bg-white rounded-full"></div>
                        </div>
                        <h1 className="text-2xl font-bold">QUẢN LÝ HỌC TẬP</h1>
                    </div>
                    <div className="flex-grow flex items-center justify-center mb-8">
                        <img className="max-w-full max-h-full object-contain" src="https://placehold.co/200" alt="Logo nhóm" />
                    </div>
                    <h2 className="text-2xl font-bold mb-7">"Học hỏi là chìa khóa mở ra cánh cửa thành công".</h2>
                    <p className="mb-8">Tham gia ngay - Dễ dàng - Miễn phí.</p>

                    <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 p-12 bg-slate-500">
                    <h2 className="text-2xl font-bold mb-6">Quên mật khẩu</h2>
                    <div className="flex flex-col justify-items-center items-center p-[1rem] rounded-r-lg bg-slate-500">
                        <form>
                            <div className="flex flex-col justify-center items-center gap-5">
                                <div className="w-[20rem]">
                                    <TextField sx={{
                                        width: "100%"
                                    }} label="Email" variant="outlined" />
                                </div>
                                <div className="w-[20rem]">
                                    <TextField sx={{
                                        width: "100%"
                                    }} label="Mật khẩu mới" variant="outlined" />
                                </div>
                                <div className="w-[20rem]">
                                    <TextField sx={{
                                        width: "100%"
                                    }} label="Xác nhận mật khẩu mới" variant="outlined" />
                                </div>
                                <Button onClick={() => {
                                    alert("Hello Minh Tý")
                                }} sx={{
                                    width: "20rem"
                                }} type="submit" variant="contained">Xác nhận</Button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
};

export default ForgotPasswordPage;