import React from 'react';
import LoginForm from '../components/Login/LoginForm';

const LoginPage: React.FC = () => {
  const handleLogin = (username: string, password: string) => {
    console.log('Login submitted:', { username, password });
    // Here you would typically send the login data to your backend
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  );
};

export default LoginPage;