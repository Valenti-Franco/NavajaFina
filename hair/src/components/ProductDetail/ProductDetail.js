import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import style from './index.module.css';
import { SlideshowLightbox } from 'lightbox.js-react';
import 'lightbox.js-react/dist/index.css';
import { FaCartPlus } from 'react-icons/fa';
import BtnCart from '../ProductCard/BtnCart';
import { motion } from 'framer-motion';
import axios from 'axios';
import PointsProduscts from './PointsProduct';
import PointsAdd from './PointsAdd';

import { AuthContext } from '../../context/Auth';
import { ToastContainer, toast } from 'react-toastify';
import { MdStars, MdSupervisedUserCircle } from 'react-icons/md';
import ComparYa from '../ProductCard/ComparYa';
import BodyBuyProduct from './BodyBuyProduct';
import { Modal } from '@material-ui/core';

const ProductDetail = ({ products }) => {

  // const token = localStorage.getItem("_id");

  const Auth = useContext(AuthContext);
  const token = localStorage.getItem("_id");
  const config = {
    headers: {
      'Authorization': `Bearer ${token}` // Agrega el token JWT en la cabecera de autorización
    }
  };


  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [lightboxKey, setLightboxKey] = useState(0); // Agregar clave única para el componente SlideshowLightbox
  const [puntoUsuario, setPuntoUsuario] = useState(null)
  const { modoOscuro } = useContext(AuthContext)
  const [cantidad, setCantidad] = useState(1)
  const [modalBuy, setModalBuy] = useState(false)
  const navigate = useNavigate();

  const abrirCerrarModalBuy = () => {

    setModalBuy(!modalBuy);

  }


  const handlerPointPut = async (punto, idPunto) => {

    try {
      const response = await axios.put(
        `https://tpibarbershop20231015224614.azurewebsites.net/api/puntos/${idPunto}`,
        {
          "puntos": punto
        },
        config // Agrega el encabezado con el token JWT
      );
      fetchProduct()
      toast.success('Estrella Editada Correctamente', {
        position: 'top-right', // Puedes personalizar la posición
        autoClose: 3000, // El tiempo en milisegundos que el toast permanecerá visible
      });
      // Luego de realizar la solicitud POST, puedes actualizar la lista de productos

    } catch (error) {
      toast.error('Debes Iniciar Sesión para Enviar Estrellas', {
        position: 'top-right', // Puedes personalizar la posición
        autoClose: 3000, // El tiempo en milisegundos que el toast permanecerá visible
      });
      console.error(error);
    }
  };
  const handlerPointPost = async (punto) => {
    try {
      const response = await axios.post(
        `https://tpibarbershop20231015224614.azurewebsites.net/api/puntos/${product.id}`,
        {
          "puntos": punto
        },
        config // Agrega el encabezado con el token JWT
      );
      fetchProduct()
      toast.success('Estrella Enviada Correctamente', {
        position: 'top-right', // Puedes personalizar la posición
        autoClose: 3000, // El tiempo en milisegundos que el toast permanecerá visible
      });
      // Luego de realizar la solicitud POST, puedes actualizar la lista de productos

    } catch (error) {
      toast.error('Debes Iniciar Sesión para Enviar Estrellas', {
        position: 'top-right', // Puedes personalizar la posición
        autoClose: 3000, // El tiempo en milisegundos que el toast permanecerá visible
      });
      console.error(error);
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`https://tpibarbershop20231015224614.azurewebsites.net/api/Productos/${id}`);
      setProduct(response.data);
      setSelectedImage('');
      setLightboxKey((prevKey) => prevKey + 1); // Actualizar la clave del componente SlideshowLightbox
      const puntoEncontrado = response.data.puntos.find((punto) => punto.usuarioId === Auth.auth.id);
      setPuntoUsuario(puntoEncontrado)


    } catch (error) {
      console.error(error);

    }
  };
  useEffect(() => {


    fetchProduct();

  }, [id]);
  if (!product) {
    return <div className={style.mainNotFound}>Producto no encontrado</div>;
  }

  const { nombre, precio, descripcion, stock } = product;

  const openLightbox = (image) => {
    setSelectedImage(image);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const images = product.imagenes

  const firstImageUrls = [];
  for (let i = 0; i < images?.length; i++) {
    const imagesrc = images[i];
    if (imagesrc?.url && imagesrc.url.length > 0) {
      firstImageUrls.push(imagesrc.url);
    }
  }

  // console.log(images)

  const compraPost = async () => {
    try {
      const response = await axios.post(
        `https://tpibarbershop20231015224614.azurewebsites.net/api/Compras/${product.id}/${cantidad}`,
        {

        },
        config // Agrega el encabezado con el token JWT
      );

      // Luego de realizar la solicitud POST, puedes actualizar la lista de productos
      toast.success('Reserva Realizada Correctamente', {
        position: 'top-right', // Puedes personalizar la posición
        autoClose: 3000, // El tiempo en milisegundos que el toast permanecerá visible
      });
      abrirCerrarModalBuy(); // Reutiliza el product
    } catch (error) {
      abrirCerrarModalBuy()
      if (error.response.status === 401) {
        toast.error("Debes Iniciar Sesión para comprar", {
          position: 'top-right', // Puedes personalizar la posición
          autoClose: 3000, // El tiempo en milisegundos que el toast permanecerá visible
        });
        navigate("/login")
      } else {
        toast.error(error.response.data, {
          position: 'top-right', // Puedes personalizar la posición
          autoClose: 3000, // El tiempo en milisegundos que el toast permanecerá visible
        });
      }

      console.error(error);
    }
  };
  return (

    <div className={style.Containerdetails + (!modoOscuro ? ' ' + style.mainDark : '')}>
      <div className={style.Containerdetails + (!modoOscuro ? ' ' + style.containerPeinadosDark : '')}>
        <div>
          <div
            animate={{ x: "0%" }}
            initial={{ x: "100%" }}

            className={style.main}>
            <div

              className={style.ProductDetail + (!modoOscuro ? ' ' + style.containerPeinadosDark : '')}>
              <div
                className={style.imagesContainer}>

                <SlideshowLightbox key={lightboxKey} className={style.containerimages}>
                  {
                    firstImageUrls.length === 0 ? (
                      <img src='https://res.cloudinary.com/deh35rofi/image/upload/v1698212497/producto-sin-imagen_basarf.png' />
                    ) : (
                      firstImageUrls.map((image, index) => (
                        <img
                          key={index}
                          className={style.images}
                          src={image}
                          alt={nombre}
                          onClick={() => openLightbox(image)}
                        />
                      )))}
                </SlideshowLightbox>
              </div>
              <div className={style.detailsContainer + (!modoOscuro ? ' ' + style.mainDark2 : '')}>
                <div className={style.detailsContainer + (!modoOscuro ? ' ' + style.mainDark2 : '')}>
                  <h2 className={style.name}>{nombre}</h2>
                  <p className={style.price}>Precio: <b>${precio}</b> </p>
                  <p className={style.description}>Descripción: {descripcion}</p>
                  <p className={style.description}>Stock: {stock}</p>

                  {Auth.auth?.role !== "Admin" && Auth.auth?.role !== "Editor" ? (
                    <>

                      <div className={style.containerbtn}>
                        <BtnCart product={product} />



                        <ComparYa abrirCerrarModalBuy={abrirCerrarModalBuy} />

                      </div>


                      <section className={style.sectionStar}>
                        <h3>Agregar Estrellas</h3>

                        <PointsAdd puntoUsuario={puntoUsuario} handlerPointPut={handlerPointPut} handlerPointPost={handlerPointPost} />
                      </section>
                    </>
                  ) : (null)}
                </div>
                <div className={style.containerPuntosUsers}>

                  <p style={{ fontSize: "32px" }}><MdSupervisedUserCircle style={{ fontSize: "40px" }} />{product.cantidadDePuntos}</p>
                  <p style={{ fontSize: "32px" }}><MdStars style={{ fontSize: "40px", color: "yellow", background: "#000", borderRadius: "50%" }} /> {product.sumaDePuntos}</p>

                </div>
              </div>

            </div>


          </div>


          {lightboxOpen && (
            <div className={style.lightboxContainer} onClick={closeLightbox}>
              <div className={style.lightboxContent}>
                <img src={selectedImage} alt='' />
              </div>
            </div>
          )}
        </div>


        <PointsProduscts puntos={product.puntos} />


      </div>
      {/* <ToastContainer /> */}

      <Modal
        open={modalBuy}
        OnClose={abrirCerrarModalBuy}
      >
        <BodyBuyProduct abrirCerrarModalBuy={abrirCerrarModalBuy} setCantidad={setCantidad} compraPost={compraPost} cantidad={cantidad} productoPrecio={precio} />

      </Modal>
    </div >
  );
};

export default ProductDetail;