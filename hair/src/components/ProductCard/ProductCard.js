
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import  style  from './index.module.css';
import "swiper/css";
import "swiper/css/navigation";

import { FaRegEye } from 'react-icons/fa';


import BtnCart from './BtnCart';
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import { Link } from 'react-router-dom';


const ProductCard = (product) => {

  
 console.log(product);

    
    return (
    <div className={style.containerProduct}>
       <p className={style.textProduct + ' ' + style.unselectable}>{product.name}</p>

        <Swiper cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]} className={style.mySwiper}>
        {product.images.map((imagesrc, index) => (
          
          <SwiperSlide className={style.swiperSlide} key={index}> <div style={{ backgroundImage: `url(${imagesrc})` }} className={style.slideBackground}> </div> </SwiperSlide>
         ))}
      </Swiper>
      <p className={style.textProduct} >${product.price}</p> 
     <div className={style.ContainertextProduct}>

     
      <Link className={style.icontextProduct} to={`/products/${product._id}`}>
        Ver Producto <FaRegEye/>
      </Link>
     
      <BtnCart product={product}/> 

     </div>
    
 
    
    </div>
  )
}

export default ProductCard
