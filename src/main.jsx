import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createHashRouter, RouterProvider} from "react-router-dom"

import Login from './Login/Login.jsx'
import SingUp from './SingUp/SignUp.jsx'

const router = createHashRouter([
  {
    path: "/",
    element:<Login/>
  },
  {
    path: "/SingUp",
    element:<SingUp/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
