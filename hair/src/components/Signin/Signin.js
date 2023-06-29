import React, { useState } from 'react'
import style from './index.module.css';
import axios from 'axios';
import Login from './login';
import { motion } from 'framer-motion';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signin = () => {
  



  const [ nombre, setNombre ] = useState('')
  const [usuario, setUsuario ] = useState('')

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ repetirPassword, setRepetirPassword ] = useState('')
    const [ alerta, setAlerta ] = useState({})

    const handleSubmitRegister = async e => {
        e.preventDefault();

        if([nombre,usuario, email, password, repetirPassword].includes('')) {
        
           toast.error('Todos los campos son obligatorios');

           return
        }

        if(password !== repetirPassword ) {
          
            toast.error('Los password no son iguales');

            return
        }

        if(password.length < 6 ) {
           
            toast.error('El Password es muy corto, agrega minimo 6 caracteres');
            return
        }

        setAlerta({})

        // Crear el usuario en la API
        try {
         
            const { data } = await axios.post(`http://localhost:4000/api/usuarios`, {nombre,usuario, email, password} )
            toast.success('Usurio registrado correctamente');
           

            setNombre('')
            setEmail('')
            setPassword('')
            setRepetirPassword('')
        } catch (error) {
            toast.error(error.response.data.msg);
           
        }
    }

    const { msg } = alerta

  return (
    <motion.div 
    initial={{opacity:0}}
    animate={{
      opacity:1,
        transition:{
            dutaion:1
        },
    }}
    exit={{opacity:0}} className={style.main}>

    <Login/>




       <form 
            className="my-10 bg-white shadow rounded-lg p-10"
            onSubmit={handleSubmitRegister}
        >
           <h2>Register</h2>
            <div className="my-5">
                <label 
                    className={style.label}
                    htmlFor="nombre"
                >Nombre</label>
                <input
                    id="nombre"
                    type="text"
                    placeholder="Tu Nombre"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>
            <div className="my-5">
                <label 
                    className={style.label}
                    htmlFor="Usuario"
                >Usuario</label>
                <input
                    id="Usuario"
                    type="text"
                    placeholder="Tu Usuario"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={usuario}
                    onChange={e => setUsuario(e.target.value)}
                />
            </div>

            <div >
                <label 
                    className={style.label}
                    htmlFor="email"
                >Email</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Email de Registro"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className="my-5">
                <label 
                    className={style.label}
                    htmlFor="password"
                >Password</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Password de Registro"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>

            <div className="my-5">
                <label 
                    className={style.label}
                    htmlFor="password2"
                >Repetir Password</label>
                <input
                    id="password2"
                    type="password"
                    placeholder="Repetir tu Password"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={repetirPassword}
                    onChange={e => setRepetirPassword(e.target.value)}
                />
            </div>

            <input 
                type="submit"
                value="Crear Cuenta"
                className={style.button}
            />
            <div >
          
            <ToastContainer />
         </div>
        </form>
        
    </motion.div >
  )
}

export default Signin