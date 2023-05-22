import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import style from './index.module.css';
import { SlideshowLightbox } from 'lightbox.js-react';
import 'lightbox.js-react/dist/index.css';
import { FaCartPlus } from 'react-icons/fa';
import BtnCart from '../ProductCard/BtnCart';

const ProductDetail = ({ products }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    // Aquí debes obtener el objeto del producto correspondiente al ID
    const foundProduct = products.find((product) => product._id === parseInt(id));
    setProduct(foundProduct);
  }, [products, id]);

  if (!product) {
    return <div className={style.main}>Producto no encontrado</div>;
  }


  const { name, price, description, images } = product;
  
  const openLightbox = (image) => {
    setSelectedImage(image);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <div className={style.main}>
      <div className={style.ProductDetail}>
      <div className={style.imagesContainer}>
        <SlideshowLightbox className={style.containerimages}>
          {images.map((image, index) => (
            <img
              key={index}
              className={style.images}
              src={image}
              alt={name}
              onClick={() => openLightbox(image)}
            />
          ))}
        </SlideshowLightbox>
      </div>
        <div className={style.detailsContainer}>
          <h2 className={style.name}>{name}</h2>
          <p className={style.price}>Precio: ${price}</p>
          <p className={style.description}>{description}</p>
          <BtnCart product={product}/> 
        </div>
      </div>

      {lightboxOpen && (
        <div className={style.lightboxContainer} onClick={closeLightbox}>
          <div className={style.lightboxContent}>
            <img src={selectedImage} alt={name} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
