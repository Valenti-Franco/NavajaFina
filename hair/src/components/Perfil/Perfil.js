import React, { useContext } from 'react'
import style from './index.module.css'
import { FaUser } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { AuthContext } from '../../context/Auth'
import { useNavigate } from 'react-router-dom'

const Perfil = () => {
  
    const Auth = useContext(AuthContext) 
    const navigate = useNavigate();
    if (!Auth.auth._id) {
        navigate('/signin');
        return null; // O cualquier otro elemento para evitar renderizar contenido adicional en la página de perfil
      }
  return (
    <motion.div 
    initial={{opacity:0}}
    animate={{
      opacity:1,
        transition:{
            dutaion:1
        },
    }}
    exit={{opacity:0}}
     className={style.main}>

        
        <div className={style.containerPerfil}>
        <h1 className={style.title}>PERFIL</h1>
            <div className={style.divContainer}>
            <FaUser className={style.User}/>
                <section className={style.sectionUser}>
                    <label>
                    <p>Nombre</p>

                        <input type='text' placeholder={Auth.auth.nombre}/>
                    </label>
                    <label>
                    <p>Usuario</p>

                        <input type='text' placeholder={Auth.auth.usuario}/>
                    </label>
                    <label>
                    <p>Email</p>

                        <input type='text' placeholder={Auth.auth.email}/>
                    </label>
                
                    

                </section>
            </div>

        </div>
    </motion.div>
  )
}

export default Perfil