import React, { useContext, useState } from 'react';
import style from './index.module.css';
import { FaEdit, FaRegEye, FaUser } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { AuthContext } from '../../context/Auth';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import Products from '../Main/Products';
import EffectCardProduct from '../EffectCardProduct/EffectCardProduct';

const Perfil = () => {
  const { modoOscuro } = useContext(AuthContext)
  const [editIndex, setEditIndex] = useState(null);
  const [editedValue, setEditedValue] = useState('');
  const Auth = useContext(AuthContext);

  const navigate = useNavigate();





  // const [usuario, setUsuario] = useState(Auth.auth?.Nombre);
  // const [nombre, setNombre] = useState(Auth.auth?.nombre);
  // const [email, setEmail] = useState(Auth.auth?.email);
  const [imagen, setSetImagen] = useState(Auth.auth?.imagen.url);
  console.log(imagen)
  if (!Auth.auth.id) {
    navigate('/signin');
    return null;
  }


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



      </div>
      <ToastContainer />

    </motion.div>
  );
};

export default Perfil;