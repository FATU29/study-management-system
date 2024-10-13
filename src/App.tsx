import React from "react";
import "./App.css";
import './styles/index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./helpers/Error/error-page";
import HomePage from "./pages/HomePage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage></HomePage>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <><div>Hello login</div></>,
    errorElement: <ErrorPage />,
  },
]);



const App = () => {
  return (
    <div className="App">
     <RouterProvider router={router} />
    </div>
  );
};

export default App;
