// src/App.tsx
import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import './styles/index.css';
import ErrorPage from "./helpers/Error/error-page";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage"; // Import the RegisterPage component
import themeConfig from './theme/themeConfig';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import { ThemeProviderWrapper } from './contexts/ThemeContext';


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />, // Add the route for the registration page
    errorElement: <ErrorPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage/>, // Add the route for the registration page
    errorElement: <ErrorPage />,
  }
]);

const App: React.FC = () => {
  return (
    <ThemeProviderWrapper>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </ThemeProviderWrapper>
  );
};

export default App;