import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createHashRouter, RouterProvider} from "react-router-dom"

import Login from './Login/Login.jsx'
import SingUp from './SingUp/SignUp.jsx'
import Legendary from './Index/Legendary.jsx'
import MiPerfil from './Perfil/Perfil.jsx'
import MisCompras from './Compras/MisCompras.jsx'
import PantallaCoche from './ventanaCompras/PantallaCoche.jsx' 

const router = createHashRouter([
  {
    path: "/",
    element:<Login/>
  },
  {
    path: "/SingUp",
    element:<SingUp/>
  },
  {
    path: "/Index",
    element:<Legendary/>
  },
  {
    path: "/Perfil",
    element:<MiPerfil/>
  },
  {
    path: "/Compras",
    element:<MisCompras/>
  },
  {
    path: "/VentanaCompras",
    element:<PantallaCoche/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
