import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Checkbox, Button, FormControlLabel } from '@mui/material';
import { Link } from 'react-router-dom';

// Define the form data interface
interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

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

  const { control, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false,
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center bg-white min-h-screen p-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
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
          <div 
            className={`transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
          >
            <h2 className="text-2xl font-bold mb-7">{quotes[currentQuoteIndex]}</h2>
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4 flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
              <Controller
                name="lastName"
                control={control}
                rules={{ required: 'Họ và tên là bắt buộc' }}
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
                rules={{ required: 'Tên là bắt buộc' }}
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
                rules={{ required: 'Email là bắt buộc' }}
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
                rules={{ required: 'Mật khẩu là bắt buộc' }}
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
                rules={{ required: 'Xác nhận mật khẩu là bắt buộc' }}
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
                rules={{ required: 'Bạn phải đồng ý với các điều khoản' }}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} />}
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