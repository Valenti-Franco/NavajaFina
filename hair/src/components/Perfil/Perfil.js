import React, { useContext, useEffect, useState } from 'react';
import style from './index.module.css';
import { FaEdit, FaRegEye, FaUser } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { AuthContext } from '../../context/Auth';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import Products from '../Main/Products';
import EffectCardProduct from '../EffectCardProduct/EffectCardProduct';
import ComprasUser from './ComprasUser';
import axios from 'axios';

const Perfil = () => {
  const { modoOscuro } = useContext(AuthContext)
  const [editIndex, setEditIndex] = useState(null);
  const [editedValue, setEditedValue] = useState('');
  const Auth = useContext(AuthContext);
  const navigate = useNavigate();

  let token = localStorage.getItem("_id");
  let config = {
    headers: {
      'Authorization': `Bearer ${token}` // Agrega el token JWT en la cabecera de autorización
    }
  };
  useEffect(() => {
    if (!Auth.auth.id) {
      navigate('/');
    }

    token = localStorage.getItem("_id");
    config = {
      headers: {
        'Authorization': `Bearer ${token}` // Agrega el token JWT en la cabecera de autorización
      }
    };
  }, [Auth, navigate]);





  const postPaypalCompra = async (compraId) => {
    console.log(compraId)

    if (!token) {
      console.log("Token JWT no encontrado en localStorage");
      // Puedes manejar esta situación, como redirigir al usuario al inicio de sesión.
    }
    try {
      const response = await axios.post(
        `https://tpibarbershop20231015224614.azurewebsites.net/Paypal/Compra/${compraId}`,
        {},
        config // Agrega el encabezado con el token JWT
      );

      const paypalUrl = response.data.links[1].href;
      const popup = window.open(paypalUrl, '_blank', 'width=600, height=400');
      if (popup) {
        // Puedes agregar más acciones aquí si es necesario
      } else {
        // Si la ventana emergente se bloqueó, puedes mostrar un mensaje al usuario.
        alert('La ventana emergente se bloqueó. Por favor, habilite las ventanas emergentes en su navegador.');
      }

      // Luego de realizar la solicitud POST, puedes actualizar la lista de productos

    } catch (error) {
      console.error(error);
    }
  };
  const postDeleteCompra = async (compraId) => {
    console.log(config);
    try {
      const response = await axios.delete(
        `https://tpibarbershop20231015224614.azurewebsites.net/api/Compras/${compraId}`,
        config // Aquí config ya contiene el encabezado 'Authorization'
      );
      if (response.status === 204) {
        toast.success('Compra eliminada correctamente', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
      obtenerCompras();
    } catch (error) {
      console.error(error);
    }
  };


  // const [usuario, setUsuario] = useState(Auth.auth?.Nombre);
  // const [nombre, setNombre] = useState(Auth.auth?.nombre);
  // const [email, setEmail] = useState(Auth.auth?.email);
  // const [imagen, setSetImagen] = useState(Auth.auth?.imagen.url);
  const obtenerCompras = async () => {

    // Realiza la solicitud GET con el token JWT
    try {
      const response = await axios.get(`https://tpibarbershop20231015224614.azurewebsites.net/api/Compras/usuario/${Auth.auth.id}`, config);
      // console.log(response)
      const compraData = response.data.map((compra, index) => ({
        ...compra,

      }));
      setCompras(compraData);
    } catch (error) {
      console.error(error);
    }
  };

  const [compras, setCompras] = useState([]);

  const imagen = Auth.auth?.imagen?.url || "https://res.cloudinary.com/deh35rofi/image/upload/v1698237266/blank-profile-picture-973460_1280_rvjszn.jpg";

  const handleInputChange = (event) => {
    setEditedValue(event.target.value);
  };

  const handleEditClick = (index) => {
    setEditedValue(Auth.auth[index]);
    setEditIndex(index);
  };


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1 } }}
      exit={{ opacity: 0 }}
      className={style.main + (!modoOscuro ? ' ' + style.mainDark : '')}>

      <div className={style.containerPerfil + (!modoOscuro ? ' ' + style.containerPerfilDark : '')}>
        <h1 className={style.title}>PERFIL</h1>
        <div className={style.divContainer}>
          {/* <FaUser  /> */}
          <img className={style.User + (!modoOscuro ? ' ' + style.UserDark : '')} src={imagen !== undefined ? imagen : "https://res.cloudinary.com/deh35rofi/image/upload/v1698237266/blank-profile-picture-973460_1280_rvjszn.jpg"} />
          <section className={style.sectionUser + (!modoOscuro ? ' ' + style.sectionUserDark : '')}>
            <label>
              <p>Usuario:</p>
              <div className={style.containerEdit}>

                {Auth.auth.nombre}


                {/* {editIndex === 0 && (
                  // <FaEdit className={style.btnEdit} onClick={handleSaveClick} />
                )} */}
              </div>
            </label>

            <label>
              <p>Email:</p>
              <div className={style.containerEdit}>

                {Auth.auth.email}



                {/* {editIndex === 2 && (
                  <FaEdit className={style.btnEdit} onClick={handleSaveClick} />
                )} */}
              </div>
            </label>
          </section>
        </div>

        <ComprasUser postPaypalCompra={postPaypalCompra} postDeleteCompra={postDeleteCompra} obtenerCompras={obtenerCompras} compras={compras} setCompras={setCompras} />



      </div>
      <ToastContainer />

    </motion.div>
  );
};

export default Perfil;