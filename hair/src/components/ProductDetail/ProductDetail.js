import React from 'react';
import { useParams } from 'react-router-dom';
import ImageMagnify from 'react-image-magnify';
import style from './index.module.css';

const ProductDetail = ({products}) => {
  const { id } = useParams();

  // Aquí debes obtener el objeto del producto correspondiente al ID
  const product = products.find((product) => product._id === parseInt(id));

  if (!product) {
    return <div className={style.main}>Producto no encontrado</div>;
  }

  const { name, price, description, images } = product;

  return (
    <div className={style.main}>
      <div className={style.imagesContainer}>
        {images.map((image, index) => (
          <ImageMagnify
            key={index}
            {...{
              smallImage: {
                alt: name,
                isFluidWidth: true,
                src: image,
              },
              largeImage: {
                src: image,
                width: 1200,
                height: 1200,
              },
              shouldHideHintAfterFirstActivation: false,
            }}
          />
        ))}
      </div>
      <div className={style.detailsContainer}>
        <h2 className={style.name}>{name}</h2>
        <p className={style.price}>Precio: ${price}</p>
        <p className={style.description}>{description}</p>
        <button className={style.addToCartButton}>Agregar al carrito</button>
      </div>
    </div>
  );
};

export default ProductDetail;