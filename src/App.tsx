import React, { useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import "./App.css";
import './styles/index.css';
import ErrorPage from "./helpers/Error/error-page";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage"; // Import the LoginPage component
import themeConfig from './theme/themeConfig';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />, // Use the LoginPage component here
    errorElement: <ErrorPage />,
  },
]);

const App: React.FC = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<'light' | 'dark'>(prefersDarkMode ? 'dark' : 'light');

  const theme = useMemo(() => createTheme(themeConfig(mode)), [mode]);

  const handleModeToggle = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <FormControlLabel
          control={<Switch checked={mode === 'dark'} onChange={handleModeToggle} />}
          label="Dark mode"
        />
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
};

export default App;