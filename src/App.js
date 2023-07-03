import React from 'react'
import Home from "./components/Home.jsx"
// import Login from "./components/Login.jsx"
// import Register from "./components/Register.jsx"
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";
const App = () => {
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Home/>,
  //   },
  //   {
  //     path: "/login",
  //     element: <Login/>,
  //   },
  //   {
  //     path: "/register",
  //     element: <Register/>,
  //   },
  // ]);
  return (
    <div>
    <Home/>
         // <RouterProvider router={router} />
    </div>
  )
}

export default App
