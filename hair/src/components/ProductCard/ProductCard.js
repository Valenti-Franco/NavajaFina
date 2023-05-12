
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import  style  from './index.module.css';
import "swiper/css";
import "swiper/css/navigation";
import { FaCartPlus } from 'react-icons/fa';
import { FaRegEye } from 'react-icons/fa';


import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
const ProductCard = (product) => {
    
    return (
    <div className={style.containerProduct}>
       <p className={style.textProduct + ' ' + style.unselectable}>{product.name}</p>

        <Swiper cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]} className={style.mySwiper}>
        {product.image.map((imagesrc, index) => (
          
          <SwiperSlide className={style.swiperSlide} key={index}> <div style={{ backgroundImage: `url(${imagesrc})` }} className={style.slideBackground}> </div> </SwiperSlide>
         ))}
      </Swiper>
      {product.price}
     <div className={style.ContainertextProduct}>

      <button className={style.icontextProduct}>
        Ver Prodcuto <FaRegEye/>
      </button>
      <button className={style.icontextProduct}>
        Añadir al Carrito <FaCartPlus/>
      </button>

     </div>
    
 
    
    </div>
  )
}

export default ProductCard
