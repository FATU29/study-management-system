import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, FormControlLabel, Checkbox } from '@mui/material';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface LoginFormData {
  email: string;
  password: string;
  remember?: boolean;
}

const validationSchema = yup.object({
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
    .min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
  remember: yup.boolean()
});

const LoginPage = () => {
  const quotes = [
    "Học hỏi là chìa khóa mở ra cánh cửa thành công",
    "Giáo dục là vũ khí mạnh nhất để thay đổi thế giới",
    "Đầu tư vào kiến thức mang lại lợi nhuận tốt nhất",
    "Học tập không có giới hạn về tuổi tác",
    "Tri thức là sức mạnh",
  ];

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const [loginError, setLoginError] = useState<string | null>(null);

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

  const { control, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
    resolver: yupResolver(validationSchema),
    mode: 'onChange'
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoginError(null);
      console.log('Form submitted:', data);
    } catch (error) {
      setLoginError('Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.');
      console.error('Login error:', error);
    }
  };



  return (
    <div className="flex items-center justify-center bg-white min-h-screen p-4">
      {/* Fixed height container */}
      <div className="w-full max-w-4xl h-[600px] flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
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
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentQuoteIndex ? 'bg-white scale-125' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right side - fixed height with internal scrolling if needed */}
        <div className="w-full md:w-1/2 overflow-y-auto">
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Đăng nhập</h2>
            <p className="mb-8 text-sm text-gray-600">
              Bạn chưa có tài khoản? 
              <Link to="/Register" className="text-blue-500 ml-1">Đăng ký</Link>
            </p>

            {loginError && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {loginError}
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
                      fullWidth
                      label="Email"
                      variant="outlined"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      disabled={isSubmitting}
                      autoComplete="email"
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
                      disabled={isSubmitting}
                      autoComplete="current-password"
                    />
                  )}
                />
              </div>
              <div className="flex items-center justify-between mb-4">
                <Controller
                  name="remember"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox 
                          {...field}
                          checked={field.value}
                          disabled={isSubmitting}
                        />
                      }
                      label="Nhớ tên tài khoản"
                    />
                  )}
                />
                <Link 
                  to="/forgot-password" 
                  className="text-blue-500 text-sm hover:text-blue-700"
                >
                  Quên mật khẩu?
                </Link>
              </div>

              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                fullWidth
                className="mb-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;