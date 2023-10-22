import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import style from './index.module.css';
import { SlideshowLightbox } from 'lightbox.js-react';
import 'lightbox.js-react/dist/index.css';
import { FaCartPlus } from 'react-icons/fa';
import BtnCart from '../ProductCard/BtnCart';
import { motion } from 'framer-motion';
import axios from 'axios';

const ProductDetail = ({ products }) => {


  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [lightboxKey, setLightboxKey] = useState(0); // Agregar clave única para el componente SlideshowLightbox
  // console.log(products)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://tpibarbershop20231015224614.azurewebsites.net/api/Productos/${id}`);
        setProduct(response.data);
        setSelectedImage('');
        setLightboxKey((prevKey) => prevKey + 1); // Actualizar la clave del componente SlideshowLightbox
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);
  if (!product) {
    return <div className={style.main}>Producto no encontrado</div>;
  }

  const { nombre, precio, descripcion } = product;

  const openLightbox = (image) => {
    setSelectedImage(image);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };
  console.log(product)
  const images = product.imagenes

  const firstImageUrls = [];
  for (let i = 0; i < images.length; i++) {
    const imagesrc = images[i];
    if (imagesrc?.url && imagesrc.url.length > 0) {
      firstImageUrls.push(imagesrc.url);
    }
  }

  console.log(images)
  return (
    <motion.div
      animate={{ x: "0%" }}
      initial={{ x: "100%" }}

      className={style.main}>
      <div className={style.ProductDetail}>
        <div className={style.imagesContainer}>
          <SlideshowLightbox key={lightboxKey} className={style.containerimages}>
            {firstImageUrls.map((image, index) => (
              <img
                key={index}
                className={style.images}
                src={image}
                alt={nombre}
                onClick={() => openLightbox(image)}
              />
            ))}
          </SlideshowLightbox>
        </div>
        <div className={style.detailsContainer}>
          <h2 className={style.name}>{nombre}</h2>
          <p className={style.price}>Precio: ${precio}</p>
          <p className={style.description}>{descripcion}</p>
          <BtnCart product={product} />
        </div>
      </div>

      {lightboxOpen && (
        <div className={style.lightboxContainer} onClick={closeLightbox}>
          <div className={style.lightboxContent}>
            <img src={selectedImage} alt='' />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProductDetail;