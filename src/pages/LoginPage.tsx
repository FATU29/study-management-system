import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Checkbox, Button, FormControlLabel } from '@mui/material';
import IconifyIcon from '../components/icon';

const LoginPage = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
    // Handle login logic here
  };

  return (
    <div className="flex items-center justify-center bg-white min-h-screen p-4">
      <div className="w-full max-w-4xl flex bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-1/2 bg-blue-500 p-12 text-white">
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
            <div className="w-2 h-2 bg-white opacity-50 rounded-full"></div>
            <div className="w-2 h-2 bg-white opacity-50 rounded-full"></div>
            <div className="w-2 h-2 bg-white opacity-50 rounded-full"></div>
          </div>
        </div>
        <div className="w-1/2 p-12">
          <h2 className="text-2xl font-bold mb-6">Đăng nhập</h2>
          <p className="mb-8 text-sm text-gray-600">
            Bạn chưa có tài khoản? 
            <a href="/Register" className="text-blue-500 ml-1">Đăng ký</a>
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <Controller
                name="email"
                control={control}
                rules={{ 
                  required: 'Tên đăng nhập là bắt buộc',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Tên đăng nhập không hợp lệ'
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
                    value: 6,
                    message: 'Mật khẩu phải có ít nhất 6 ký tự'
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
            <div className="flex items-center mb-4">
              <Controller
                name="remember"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} />}
                    label="Nhớ tên tài khoản"
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
              Đăng nhập
            </Button>
          </form>
          <p className="mt-4 text-sm text-right">
            <a href="#" className="text-blue-500">Quên mật khẩu?</a>
          </p>
          <div className="mt-8">
            <p className="text-sm text-center text-gray-600 mb-4">Hoặc tiếp tục với</p>
            <div className="flex justify-center space-x-4">
              <button className="p-2 border border-gray-300 rounded-full flex items-center justify-center">
                <IconifyIcon icon="skill-icons:gmail-light" className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;