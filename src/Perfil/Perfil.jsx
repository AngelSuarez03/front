// import {Button, TextField, Box} from "@mui/material";
import axios from 'axios'
import { useState } from 'react';
import './Perfil.css'
import { useNavigate } from 'react-router-dom';

function MiPerfil() {
    const navigate = useNavigate();
    //!FUNCIÓN DE PROCESAR FORMULARIO
    const [datosFormulario, setDatosFormulario]=useState({
        correo:'',
        correoOld: window.localStorage.getItem("Usuario"),
        pais:'',
        contrasena:''
    });

    const[habilitaInput, setHabilitaInput]=useState(true);
    const correoUsuario=localStorage.getItem("Usuario");

    //!FUNCIÓN PARA PROCESAR LOS DATOS DE ACTUALIZACIÓN
    const peticionActualizar=async()=>{
        try {
            console.log("correo old: ",datosFormulario.correoOld);
            const respuesta=axios.get("http://localhost:4567/actualizaDatos",{params:datosFormulario});
            return respuesta;
        } catch (error) {
            console.log(error);
        }
    }
    //!METODO PARA OBTENER LOS DATOS DEL USUARIO
    const datosUsuario=async()=>{
        try {
            const respuesta=await axios.get("http://localhost:4567/datosUsuario",{params:{correo: correoUsuario}});
            return respuesta.data;
        } catch (error) {
        console.log(error);
        }
    }
    //!MÉTODO PARA HACER LA PETICIÓN PARA ELIMINAR AL USUARIO
    const peticionEliminar=async()=>{
        try {
            const respuesta= await axios.get("http://localhost:4567/eliminarPerfil",{params:{correo:correoUsuario}});
            return respuesta;
        } catch (error) {
            console.log(error);
        }
    }
//!FUNCIÓN PARA REALIZAR LA PETICIÓN PARA EL CAMBIO DE AVATAR
    const actualizaAvatar=async(Avatar)=>{
        try {
            const respuesta=await axios.get("http://localhost:4567/actualizaAvatar",{params:{correo:correoUsuario,avatar:Avatar}});
            console.log(respuesta);
        } catch (error) {
            console.log(error);
        }
    }

    //!FUNCIÓN PARA OBTENER DATOS DEL USUARIO EN USANDO LA FUNCIÓN ANTERIOR
    const UsuarioData=async()=>{
            try {
                const respuesta=await datosUsuario();
                const nombreUsuarioSesion=respuesta.nombre;
                const apellidosUsuarioSesion=respuesta.apellidos;
                window.localStorage.setItem("Nombre",nombreUsuarioSesion);
                window.localStorage.setItem("Apellidos",apellidosUsuarioSesion);
                window.localStorage.setItem("Pais",respuesta.pais);
            } catch (error) {
                console.log(error);
            }
    }
    UsuarioData();
    const atrasBtn=()=>{
        navigate('/Index')
        // window.location.href = "../Legendary.html";
        // window.open("../#/Legendary.html","_self");
    }
    //!METODO PARA PROCESAR LA ACTUALIZACIÓN
    const procesarActualización=async()=>{
        try {
            const respuesta= await peticionActualizar();
            console.log("DATA DE ACTUALIZACIÓN",respuesta.data);
            navigate('/')
            // window.location.href = "../index.html";
            // window.open("../index.html","_self");
        } catch (error) {
            console.log(error);
        }
    }
    
//!METODO PARA REALIZAR LA ELIMINACIÓN DEL USUARIO
    const procesarEliminacion=async()=>{
        try {
            const respuesta=await peticionEliminar();
            console.log("RESPUESTA DE ELIMINACIÓN", respuesta.data);
            navigate('/')
            // window.open("../index.html","_self");
        } catch (error) {
            console.log(error);
        }
    }
    //!VARIABLES PARA OBTENER DATOS DEL USUARIO DEL LOCALSTORAGE MOSTRADOS EN PANTALLA
    const nombreUsuarioSesion=window.localStorage.getItem("Nombre");
    const apellidoUsuarioSesion=window.localStorage.getItem("Apellidos");

    //!METODO PARA GUARDAR LOS CAMBIOS REALIZADOS EN EL FURMULARIO
    const cambiosFormulario=(evento)=>{
        // console.log(evento.target);
        const {name,value} =evento.target;
        setDatosFormulario({
            ...datosFormulario, //! SE GUARDA LA COPIA DEL VALOR DE LA VARIABLE 
            [name]: value //! Y SE HACE LA ACTUALIZACIÓN DE LOS DATOS
            //? name y value son propiedades de los textfields abajoa
        })
    }
    //!FUNCIÓN PARA HABILITAR LOS INPUTS USANDO UN HOOK
    const editarFormulario=()=>{
        setHabilitaInput(false);
    }
    return(
        <>
        <button className='back_button' onClick={atrasBtn}>Atrás</button>
        <img src="./Imagenes/Legendary.WEBP" alt="" className='container_logo'/>
            <div className='user_container'>
                <h1 className='user_container_title'>Datos del Usuario</h1>
                <div className='user_container_form'>
                    <form action="" className='user_form' onSubmit={procesarActualización}>
                        <input type="email" name="correo" id="correo" placeholder={correoUsuario} onChange={cambiosFormulario} className='input' disabled={habilitaInput}/>
                        <select name="pais" id="pais" className='paises' onChange={cambiosFormulario} disabled={habilitaInput} placeholder='h0pa'>
                        <option value="none" className='pais'>Pais anteior: {window.localStorage.getItem("Pais")}</option>
                        <option value="Mexico" className='pais' name='pais'>Mexico</option>
                        <option value="EU" className='pais' name='pais'>Estados Unidos</option>
                        </select>

                        <input type="password" name="contrasena" id="contrasena" required className='input' placeholder='Contraseña' onChange={cambiosFormulario} disabled={habilitaInput}/>
                        <input type="submit" value="Enviar" className='user_modifybtn' disabled={habilitaInput}/>
                    </form> 
                    <button className='user_modifybtn' onClick={editarFormulario}>Modificar Perfil</button>
                    <button className='user_container_deletebtn' onClick={procesarEliminacion}>Eliminar mi perfil</button>
                </div>

                <div className='user_container_avatar'>
                    <img src="./Imagenes/usuario.png" alt="" className='user_avatar'/>
                    <h3 className='user_container_name'>{nombreUsuarioSesion+" "+apellidoUsuarioSesion}</h3>
                </div>
            </div>
        </>
    )
}
export default MiPerfil;