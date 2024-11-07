import { Button, TextField } from "@mui/material";
import React, { useState, useEffect } from 'react';
// import { Resolver } from "dns";
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
// import { link } from "fs";
// import useTheme from "@mui/material";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

interface AccountEmail {
  email: string;
}

const accountEmailSchema = yup.object({
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Email không được để trống")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      'Email không hợp lệ'
    )
});

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const handleResetPassword = () => {
    navigate('/reset-password');
  }

  const quotes = [
    "Học hỏi là chìa khóa mở ra cánh cửa thành công",
    "Giáo dục là vũ khí mạnh nhất để thay đổi thế giới",
    "Đầu tư vào kiến thức mang lại lợi nhuận tốt nhất",
    "Học tập không có giới hạn về tuổi tác",
    "Tri thức là sức mạnh",
  ];

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
        setFadeIn(true);
      }, 500);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [quotes.length]);

  const { control, handleSubmit, formState: {errors}, reset } = useForm<AccountEmail>({
    defaultValues:{
      email: '',
    },
    resolver: yupResolver(accountEmailSchema) as any,
    mode: 'onChange'
  });

  const onSubmit = (data: AccountEmail) => {
    console.log('Email submitted', data);
    reset();
  }

  return (
    <div className="flex items-center justify-center bg-white min-h-screen p-4">
      <div
        style={{
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
        className="w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-lg overflow-hidden"
      >
        <div className="p-12 text-white w-full flex flex-col justify-center md:w-1/2 bg-blue-500">
          <div className="flex items-center mb-8">
            <div className="w-8 h-8 mr-2 border-2 border-white rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <h1 className="text-2xl font-bold">QUẢN LÝ HỌC TẬP</h1>
          </div>
          <div className="flex-grow flex items-center justify-center mb-8">
            <img
              className="max-w-full max-h-full object-contain"
              src="https://placehold.co/200"
              alt="Logo nhóm"
            />
          </div>
          <h2 className="text-2xl font-bold mb-7">
            "Học hỏi là chìa khóa mở ra cánh cửa thành công".
          </h2>
          <p className="mb-8">Tham gia ngay - Dễ dàng - Miễn phí.</p>
          
          <div className="flex space-x-2">
            {quotes.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentQuoteIndex ? 'bg-white scale-125' : 'bg-white/50'
                  }`}
              />
            ))}
          </div>

          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
        <div className="text-gray-600 flex flex-col justify-center items-center w-full md:w-1/2 p-12 bg-white">
          <h2 className="text-3xl font-bold mb-6">Quên mật khẩu</h2>
          <p className="mb-8 text-sm text-gray-600 justify-normal">
            Nhập email của bạn để xác minh.
          </p>
          <div className="flex flex-col justify-items-center items-center p-[1rem] rounded-r-lg bg-white">
            <form className="h-full flex flex-col justify-center items-center">
              <div className="flex flex-col justify-center items-center gap-5">
                <div className="w-[20rem]">
                  <form onSubmit = {handleSubmit(onSubmit)} noValidate>
                    <Controller
                      name="email"
                      control={control}
                      render={({field}) => (
                        <TextField
                          {...field}
                          sx={{
                            width: "100%",
                          }}
                          label="Email"
                          variant="outlined"
                          error={errors.email ? true : false}
                          helperText={errors.email?.message}
                        />
                      )}
                    />
                  </form>
                </div>
                <Button
                  onClick={() => {
                    handleResetPassword();
                  }}
                  sx={{
                    width: "20rem",
                  }}
                  type="submit"
                  variant="contained"
                >
                  XÁC MINH
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
