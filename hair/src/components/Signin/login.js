import axios from 'axios';
import { useContext, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import style from './index.module.css';
import {AuthContext} from '../../context/Auth';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const Login = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const {  autenticarUsuario } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes('')) {
      toast.error('Todos los campos son obligatorios');
     
      return;
    }

    try {
      const { data } = await axios.post(`http://localhost:4000/api/usuarios/login`, { email, password });

      
      localStorage.setItem('_id', data._id);

      navigate('/');

      

      autenticarUsuario(); // Llama a autenticarUsuario desde el contexto
    } catch (error) {
      toast.error(error.response.data.msg);
     
    }
  };

  

  return (
    <>
        

        
    
        <form 
            className="my-10 bg-white shadow rounded-lg p-10"
            onSubmit={handleSubmit}
        >
            <h2 className="text-sky-600 font-black text-6xl capitalize">Inicia sesión 
            
        </h2>
            <div className="my-5">
                <label 
                    className="uppercase text-gray-600 block text-xl font-bold"
                    htmlFor="email"
                >Email</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Email de Registro"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={email}
                    onChange={ e => setEmail(e.target.value)}
                />
            </div>
            <div className="my-5">
                <label 
                    className="uppercase text-gray-600 block text-xl font-bold"
                    htmlFor="password"
                >Password</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Password de Registro"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={password}
                    onChange={ e => setPassword(e.target.value)}
                />
            </div>

            <input 
                type="submit"
                value="Iniciar Sesión"
                className={style.button}
            />
         
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
    
    </>
  )
}

export default Login