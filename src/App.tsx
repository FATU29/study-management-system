import React from 'react';
import { createBrowserRouter, RouterProvider, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import './styles/index.css';
import ErrorPage from "./helpers/Error/error-page";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPassword from './pages/ResetPassword';
import MessagePage from "./pages/MessagePage";
import { ThemeProviderWrapper } from './contexts/ThemeContext';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import DashboardPage from './pages/DashboardPage';

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
              <Route index path="/" element={<DashboardPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/message" element={<MessagePage/>}/>
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
                element: <AppContent />
              }
            ])
          } />
        </div>
      </ThemeProviderWrapper>
  );
};

export default App;