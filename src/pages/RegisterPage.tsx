import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Checkbox, Button, FormControlLabel, Typography } from '@mui/material';
import IconifyIcon from '../components/icon';

const RegisterPage = () => {
  const { control, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false,
    },
  });

  const password = watch("password");

  const onSubmit = (data: any) => {
    console.log(data);
    // Handle registration logic here
  };

  return (
    <div className="flex items-center justify-center bg-white min-h-screen p-4">
      <div className="w-full max-w-4xl flex bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-1/2 bg-blue-500 p-12 text-white flex flex-col">
          <div className="flex items-center mb-8">
            <div className="w-8 h-8 mr-2 border-2 border-white rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <h1 className="text-2xl font-bold">WEB QUẢN LÝ HỌC TẬP</h1>
          </div>
          <div className="flex-grow flex items-center justify-center mb-8">
            <img className="max-w-full max-h-full object-contain" src="https://placehold.co/200" alt="Logo nhóm" />
          </div>
          <h2 className="text-2xl font-bold mb-7">"Học hỏi là chìa khóa mở ra cánh cửa thành công".</h2>
          <p className="mb-8">Tham gia ngay - Dễ dàng - Miễn phí.</p>
          
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <div className="w-2 h-2 bg-white opacity-50 rounded-full"></div>
            <div className="w-2 h-2 bg-white opacity-50 rounded-full"></div>
            <div className="w-2 h-2 bg-white opacity-50 rounded-full"></div>
          </div>
        </div>
        <div className="w-1/2 p-12">
          <h2 className="text-2xl font-bold mb-6">Đăng ký tài khoản</h2>
          <p className="mb-8 text-sm text-gray-600">
            Đã có tài khoản? 
            <a href="/login" className="text-blue-500 ml-1">Đăng nhập</a>
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <Controller
                name="fullName"
                control={control}
                rules={{ required: 'Họ và tên là bắt buộc' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Họ và tên"
                    variant="outlined"
                    error={!!errors.fullName}
                    helperText={errors.fullName?.message}
                  />
                )}
              />
            </div>
            <div className="mb-4">
              <Controller
                name="email"
                control={control}
                rules={{ 
                  required: 'Email là bắt buộc',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email không hợp lệ'
                  }
                }}
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
                rules={{ 
                  required: 'Mật khẩu là bắt buộc',
                  minLength: {
                    value: 8,
                    message: 'Mật khẩu phải có ít nhất 8 ký tự'
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="password"
                    label="Mật khẩu"
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
                rules={{ 
                  required: 'Xác nhận mật khẩu là bắt buộc',
                  validate: value => value === password || 'Mật khẩu không khớp'
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="password"
                    label="Xác nhận mật khẩu"
                    variant="outlined"
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                  />
                )}
              />
            </div>
            <div className="flex items-center mb-4">
              <Controller
                name="agreeTerms"
                control={control}
                rules={{ required: 'Bạn phải đồng ý với điều khoản sử dụng' }}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} />}
                    label={
                      <Typography variant="body2">
                        Tôi đồng ý với <a href="#" className="text-blue-500">điều khoản sử dụng</a>
                      </Typography>
                    }
                  />
                )}
              />
            </div>
            {errors.agreeTerms && (
              <p className="text-red-500 text-sm mb-4">{errors.agreeTerms.message}</p>
            )}
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
          <div className="mt-8">
            <p className="text-sm text-center text-gray-600 mb-4">Hoặc đăng ký với</p>
            <div className="flex justify-center space-x-4">
              <button className="p-2 border border-gray-300 rounded-full flex items-center justify-center">
                <IconifyIcon icon="skill-icons:gmail-light" className="w-6 h-6" />
              </button>
              <button className="p-2 border border-gray-300 rounded-full flex items-center justify-center">
                <IconifyIcon icon="logos:facebook" className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;