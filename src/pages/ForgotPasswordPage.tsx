import { Button, TextField } from "@mui/material";
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
// import { Resolver } from "dns";
// import { link } from "fs";
// import useTheme from "@mui/material";

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

  // const handleResetPassword = () => {
  //   navigate('/reset-password');
  // }

  const quotes = [
    "Học hỏi là chìa khóa mở ra cánh cửa thành công",
    "Giáo dục là vũ khí mạnh nhất để thay đổi thế giới",
    "Đầu tư vào kiến thức mang lại lợi nhuận tốt nhất",
    "Học tập không có giới hạn về tuổi tác",
    "Tri thức là sức mạnh",
  ];

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const [forgotPasswordError, setForgotPasswordError] = useState<string | null>(null);

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
    resolver: yupResolver(accountEmailSchema),
    mode: 'onChange'
  });

  const onSubmit = (data: AccountEmail) => {
    console.log('Email submitted', data);
    reset();
  }

  return (
    <div className="flex items-center justify-center bg-white min-h-screen p-4">
      {/* Fixed height container */}
      <div
        style={{
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
        className="w-full max-w-4xl h-[600px] flex flex-col md:flex-row bg-white rounded-lg overflow-hidden">
        {/* Left side - fixed height with internal scrolling if needed */}
        <div className="w-full md:w-1/2 bg-blue-500 flex flex-col overflow-hidden">
          {/* Top section with fixed content */}
          <div className="p-8">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 mr-2 border-2 border-white rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <h1 className="text-2xl font-bold text-white">QUẢN LÝ HỌC TẬP</h1>
            </div>
          </div>
          
          {/* Middle section with logo and quote - fixed height */}
          <div className="flex-grow flex flex-col items-center justify-center px-8">
            <div className="w-32 h-32 mb-8">
              <img className="w-full h-full object-contain" src="https://placehold.co/200" alt="Logo nhóm" />
            </div>

            {/* Quote container with fixed height */}
            <div className="h-24 flex items-center justify-center">
              <div
                className={`transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
              >
                <h2 className="text-xl font-bold text-white text-center">
                  {quotes[currentQuoteIndex]}
                </h2>
              </div>
            </div>
          </div>

          {/* Bottom section with fixed content */}
          <div className="p-8">
            <p className="text-white mb-4 text-center">Tham gia ngay - Dễ dàng - Miễn phí.</p>
            <div className="flex justify-center space-x-2">
              {quotes.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentQuoteIndex ? 'bg-white scale-125' : 'bg-white/50'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right side - fixed height with internal scrolling if needed */}
        <div className="w-full md:w-1/2 overflow-y-auto flex flex-col justify-center items-center">
          <div className="p-8 w-[85%]">
            <h2 className="text-2xl font-bold mb-6">Quên mật khẩu</h2>
            <p className="mb-8 text-sm text-gray-600 justify-normal">
              Nhập email của bạn để xác minh.
            </p>

            {forgotPasswordError && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {forgotPasswordError}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="mb-4">
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      sx={{
                        width: "100%",
                      }}
                      label="Email"
                      variant="outlined"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />
              </div>
              
              <Button
                fullWidth
                color="primary"
                type="submit"
                variant="contained"
                className="mb-4 top-10"
              >
                XÁC MINH
              </Button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
