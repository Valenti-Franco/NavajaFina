/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from './index.module.css';
import { AuthContext } from '../../context/Auth';
import { ToastContainer, toast } from 'react-toastify';
import { motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';




const Login = () => {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const { autenticarUsuario } = useContext(AuthContext);
  const { modoOscuro } = useContext(AuthContext)


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes('')) {

      console.log(toast.error("Todos los campos son obligatorios"))



      return;

    }


    try {
      const { data } = await axios.post('https://tpibarbershop20231015224614.azurewebsites.net/api/Usuarios/authenticate', {
        nombre: email,
        password: password,
      });


      localStorage.removeItem('_id'); // Elimina el _id del almacenamiento local

      localStorage.setItem('_id', data);
      console.log(data)

      navigate('/');



      autenticarUsuario(); // Llama a autenticarUsuario desde el contexto
    } catch (error) {
      toast.error("Error al Iniciar Sesión");

    }
  };



  return (

    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          dutaion: 1
        },
      }}

      exit={{ opacity: 0 }} className={style.main + (!modoOscuro ? ' ' + style.mainDark : '')}>


      <form
        className=""
        onSubmit={handleSubmit}
      >
        <h2 className={style.tittle}>Inicia sesión</h2>


        <div className={style.divcontainer}>
          <input
            id="email"
            type="text"
            placeholder="Username"
            className={style.inputcontainer}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className={style.divcontainer}>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className={style.inputcontainer}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>


        <div className={style.divcontainer}>
          <input
            type="submit"
            value="Iniciar sesión"
            className={style.button}
          />
        </div>

        <div className={style.divcontainer}>
          <p>¿No tienes una cuenta? Crear <Link className={style.createa} to="/Signin">cuenta nueva
          </Link> </p>
        </div>
        <ToastContainer />
      </form>


      {/* <nav className="lg:flex lg:justify-between">
            <Link 
                className='block text-center my-5 text-slate-500 uppercase text-sm' 
                to="/registrar"
            >¿No tienes una cuenta? Regístrate</Link>

            <Link 
                className='block text-center my-5 text-slate-500 uppercase text-sm'
                to="/olvide-password"
            >Olvide Mi Password</Link>
        </nav> */}

    </motion.div>
  )
}

export default Login