import React from "react";
import "./App.css";
import './styles/index.css'
import { Counter } from "./Counter";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./helpers/Error/error-page";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Counter></Counter>,
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
