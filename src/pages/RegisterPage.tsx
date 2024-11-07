import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Checkbox, Button, FormControlLabel, Typography } from '@mui/material';
import IconifyIcon from '../components/utils/icon';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Link } from 'react-router-dom';

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

const validationSchema = yup.object({
  firstName: yup
    .string()
    .required('Tên là bắt buộc')
    .min(2, 'Tên phải có ít nhất 2 ký tự')
    .max(50, 'Tên không được vượt quá 50 ký tự'),
  lastName: yup
    .string()
    .required('Họ là bắt buộc')
    .min(2, 'Họ phải có ít nhất 2 ký tự')
    .max(50, 'Họ không được vượt quá 50 ký tự'),
  email: yup
    .string()
    .required('Email là bắt buộc')
    .email('Email không hợp lệ')
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      'Email không đúng định dạng'
    ),
  password: yup
    .string()
    .required('Mật khẩu là bắt buộc')
    .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt'
    ),
  confirmPassword: yup
    .string()
    .required('Xác nhận mật khẩu là bắt buộc')
    .oneOf([yup.ref('password')], 'Mật khẩu không khớp'),
  agreeTerms: yup
    .boolean()
    .oneOf([true], 'Bạn phải đồng ý với điều khoản và điều kiện')
});

const RegisterPage = () => {
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

  const { control, handleSubmit, formState: { errors }, reset } = useForm<RegisterFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false,
    },
    resolver: yupResolver(validationSchema) as any,
    mode: 'onChange' // Enable real-time validation
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log('Form submitted:', data);
    // Here you would typically make an API call to register the user
    reset(); // Reset form after successful submission
  };

  return (
    <div className="flex items-center justify-center bg-white min-h-screen p-4">
      <div   style={{
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }} className="w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-lg overflow-hidden">
        <div className="w-full md:w-1/2 bg-blue-500 p-12 text-white flex flex-col">
          <div className="flex items-center mb-8">
            <div className="w-8 h-8 mr-2 border-2 border-white rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <h1 className="text-2xl font-bold">QUẢN LÝ HỌC TẬP</h1>
          </div>
          <div className="flex-grow flex items-center justify-center mb-8">
            <img className="max-w-full max-h-full object-contain" src="https://placehold.co/200" alt="Logo nhóm" />
          </div>
          <div className="h-24 flex items-center justify-center">
            <div 
              className={`transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
            >
              <h2 className="text-xl font-bold text-white text-center">
                {quotes[currentQuoteIndex]}
              </h2>
            </div>
          </div>
          <p className="mb-8">Tham gia ngay - Dễ dàng - Miễn phí.</p>
          
          <div className="flex space-x-2">
            {quotes.map((_, index) => (
              <div 
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentQuoteIndex ? 'bg-white scale-125' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/2 p-12">
          <h2 className="text-2xl font-bold mb-6">Đăng ký tài khoản</h2>
          <p className="mb-8 text-sm text-gray-600">
            Đã có tài khoản? 
            <Link to="/login" className="text-blue-500 ml-1">Đăng nhập</Link>
          </p>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-4 flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Họ"
                    variant="outlined"
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                  />
                )}
              />
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Tên"
                    variant="outlined"
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                  />
                )}
              />
            </div>
            <div className="mb-4">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Email"
                    variant="outlined"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </div>
            <div className="mb-4">
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Mật khẩu"
                    type="password"
                    variant="outlined"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />
            </div>
            <div className="mb-4">
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Xác nhận mật khẩu"
                    type="password"
                    variant="outlined"
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                  />
                )}
              />
            </div>
            <div className="mb-4 w-full">
              <Controller
                name="agreeTerms"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox 
                        {...field}
                        checked={field.value}
                      />
                    }
                    label={
                      <span className="text-sm sm:text-base md:text-base lg:text-base">
                        Tôi đồng ý với {' '}
                        <a 
                          href="/terms-and-conditions" 
                          className="text-blue-600 hover:text-blue-800 underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          điều khoản và điều kiện
                        </a>
                      </span>
                    }
                    classes={{
                      root: 'items-start',
                      label: 'w-full ml-2'
                    }}
                  />
                )}
              />
              {errors.agreeTerms && (
                <p className="text-red-500 text-sm mt-1">{errors.agreeTerms.message}</p>
              )}
            </div>

            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth
              className="mb-4"
            >
              Đăng ký 
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;