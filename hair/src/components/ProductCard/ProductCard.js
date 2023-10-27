
import React, { useContext, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import style from './index.module.css';
import "swiper/css";
import "swiper/css/navigation";

import { FaInfo, FaRegEye } from 'react-icons/fa';

import 'react-lazy-load-image-component/src/effects/blur.css'
import BtnCart from './BtnCart';
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthContext } from '../../context/Auth';


const ProductCard = ({ product, setListView, listView }) => {
  const Auth = useContext(AuthContext);


  const [descriptionOn, setDescriptionOn] = useState(false)
  const images = product.imagenes
  const firstImageUrls = [];
  for (let i = 0; i < images.length; i++) {
    const imagesrc = images[i];
    if (imagesrc?.url && imagesrc.url.length > 0) {
      firstImageUrls.push(imagesrc.url);
    }
  }
  // console.log(auth)
  const handlerDescription = () => {
    setDescriptionOn(!descriptionOn);
  }

  return (
    <div className={listView === 'grid' ? style.containerProduct : style.containerProductList}>
      <p className={style.textProduct + ' ' + style.unselectable}>{product.nombre}</p>

      <Swiper cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]} className={style.mySwiper}>
        {firstImageUrls.length === 0 ? (

          <SwiperSlide className={style.swiperSlide} >
            <LazyLoadImage
              src={'https://res.cloudinary.com/deh35rofi/image/upload/v1698212497/producto-sin-imagen_basarf.png'}
              width={330}
              height={330}
              placeholderSrc={'https://res.cloudinary.com/deh35rofi/image/upload/v1698212497/producto-sin-imagen_basarf.png'}
              effect="blur"
              className={style.slideBackground}
            />
          </SwiperSlide>
        ) :
          firstImageUrls.map((imagesrc, index) => (
            <SwiperSlide className={style.swiperSlide} key={index}>
              <LazyLoadImage
                src={imagesrc !== [] ? imagesrc : 'https://res.cloudinary.com/deh35rofi/image/upload/v1698212497/producto-sin-imagen_basarf.png'}
                width={330}
                height={330}
                placeholderSrc={imagesrc}
                effect="blur"
                className={style.slideBackground}
              />
            </SwiperSlide>
          ))}

      </Swiper>
      <AnimatePresence>
        {descriptionOn ? (

          <motion.section
            animate={{ y: "0px", height: "150px", opacity: 1 }}
            initial={{ y: "150px", height: "0", opacity: 0 }}
            exit={{ y: "150px", height: "0px", opacity: 0 }}
            transition={{ duration: .5 }}
            className={style.containerDescription}>
            <p style={{ "color": "#fff" }}>{product.descripcion}</p>
          </motion.section>


        ) : null
        }
      </AnimatePresence>

      <p className={style.textProduct} >${product.precio}
        <motion.button
          whileHover={{ scale: 1.15 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          onClick={handlerDescription} className={style.info}><FaInfo />
        </motion.button>
      </p>
      <div className={style.ContainertextProduct}>



        {Auth.auth?.role !== "Admin" && Auth.auth?.role !== "Editor" ? (
          <>

            <Link className={style.icontextProduct} to={`/products/${product.id}`}>
              Ver Producto <FaRegEye />
            </Link>
            <BtnCart product={product} />
          </>
        ) : (
          <Link className={style.icontextProduct2} to={`/products/${product.id}`}>
            Ver Producto <FaRegEye />
          </Link>
        )
        }

      </div>



    </div>
  )
}

export default React.memo(ProductCard)
