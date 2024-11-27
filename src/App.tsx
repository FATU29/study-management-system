import React from 'react';
import { createBrowserRouter, RouterProvider, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import './styles/index.css';
import ErrorPage from "./components/Error/error-page";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPassword from './pages/ResetPassword';
import MessagePage from "./pages/MessagePage";
import ModalPage from './pages/Modal';
import { ThemeProviderWrapper } from './contexts/ThemeContext';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import CourseManagementPage from './components/CourseManagement/CourseManagement';
import DashboardPage from './pages/DashboardPage';
import AuthProvider from './contexts/AuthContext';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import UsersVerifyMailPage from './pages/UsersVerifyMailPage';
import { userVerifyMail, verifyResetPasswordAPI } from './services/auth';

const queryClient = new QueryClient()

const AppContent: React.FC = () => {
  const location = useLocation();

  return (
      <SwitchTransition>
        <CSSTransition
            key={location.pathname}
            timeout={300}
            classNames="page"
            unmountOnExit
        >
          <div className="page">
            <Routes location={location}>
              <Route index path="/" element={<HomePage />} />
              <Route path="/home" element={<DashboardPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/message" element={<MessagePage/>}/>
              <Route path='/admin' element={<CourseManagementPage/>} />
              <Route path='/modal' element={<ModalPage/>}/>
              <Route path='/users/verify-email' element={<UsersVerifyMailPage pageNext='/login' queryKey='verify-register' queryFnc={userVerifyMail}/>}/>
              <Route path='/users/reset-password' element={<UsersVerifyMailPage pageNext='/reset-password' queryKey='verify-forgotPassword' queryFnc={verifyResetPasswordAPI}/>}/>
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </div>
        </CSSTransition>
      </SwitchTransition>
  );
};

const App: React.FC = () => {
  return (
      <ThemeProviderWrapper>
        <div className="App">
          <RouterProvider router={
            createBrowserRouter([
              {
                path: "*",
                element:<QueryClientProvider client={queryClient}>
                  <AuthProvider>
                   <AppContent />
                </AuthProvider>
                <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
              }
            ])
          } />
        </div>
      </ThemeProviderWrapper>
  );
};

export default App;