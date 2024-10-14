// src/App.tsx
import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import './styles/index.css';
import ErrorPage from "./helpers/Error/error-page";
import HomePage from "./pages/HomePage";
import { ThemeProviderWrapper } from './contexts/ThemeContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <div>Hello login</div>,
    errorElement: <ErrorPage />,
  },
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