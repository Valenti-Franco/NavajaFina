import React, { useState } from 'react'
import  style  from './index.module.css';
import ProductCard from '../ProductCard/ProductCard';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import "swiper/css/pagination";



// import required modules
import {  Pagination, Autoplay, Navigation  } from "swiper";


const Main = () => {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };
  
  const products = [
                      {_id:'123163',
                          name:'B-Way Five',
                          images:['https://http2.mlstatic.com/D_NQ_NP_665122-MLA50969950919_082022-O.webp','https://http2.mlstatic.com/D_NQ_NP_722620-MLA50970122347_082022-O.webp'],
                          price:'$32.900',
                      },
                          {_id:'12314',
                        name:'Cortadora Pelo Profesional Babyliss Big Shot',
                        images:['https://http2.mlstatic.com/D_NQ_NP_665683-MLA31429871436_072019-O.webp','https://http2.mlstatic.com/D_NQ_NP_795993-MLA31429890111_072019-O.webp'],
                        price:'$32.900',
                      },
  
                      {_id:'1236515',
                      name:'Set de herramientas Profesionales',
                      images:['https://www.barbershop.com.ar/product_images/z/745/528186__74084_std.jpg','https://www.barbershop.com.ar/product_images/z/745/528186__74084_std.jpg'],
                      price:'$32.900',
                      },
  
                      {_id:'123165465',
                      name:'Kit Tijeras',
                      images:['https://www.barbershop.com.ar/product_images/z/745/528186__74084_std.jpg','https://www.barbershop.com.ar/product_images/z/745/528186__74084_std.jpg'],
                      price:'$32.900',
                      },
  
                      {_id:'1236464615',
                      name:'Tijera Corte y Pulir Navakin',
                      images:['https://www.barbershop.com.ar/product_images/z/745/528186__74084_std.jpg','https://www.barbershop.com.ar/product_images/z/745/528186__74084_std.jpg'],
                      price:'$32.900',
                      },
  
                      {_id:'12365464645fsdf515',
                      name:'Set Herraminetas Tijera de Corte',
                      images:['https://www.barbershop.com.ar/product_images/z/745/528186__74084_std.jpg','https://www.barbershop.com.ar/product_images/z/745/528186__74084_std.jpg'],
                      price:'$32.900',
                      },
                      {_id:'123654646sdasd45515',
                      name:'Set Herraminetas Tijera de Corte',
                      images:['https://www.barbershop.com.ar/product_images/z/745/528186__74084_std.jpg','https://www.barbershop.com.ar/product_images/z/745/528186__74084_std.jpg'],
                      price:'$32.900',
                      },
                      {_id:'12365464645423423515',
                      name:'Set Herraminetas Tijera de Corte',
                      images:['https://www.barbershop.com.ar/product_images/z/745/528186__74084_std.jpg','https://www.barbershop.com.ar/product_images/z/745/528186__74084_std.jpg'],
                      price:'$32.900',
                      },
                      
  
                    ];
  
  
      const [selectedSlide, setSelectedSlide] = useState(null);
    
      const handleSlideClick = (index) => {
        console.log(index)
        setSelectedSlide(index);
      };
    
      const handleSlideBlur = () => {
        setSelectedSlide(null);
      };
  
                
  return (
    <div className={style.main}>
        <div className={style.containerPeinados}>

            <h1 className={style.title}>PRODCUTOS</h1>
        <Swiper
        slidesPerView={4}
        spaceBetween={170}
        centeredSlides={true}
        className={style.mySwiper}
        modules={[Autoplay, Pagination, Navigation]} // Agrega el módulo Pagination
        pagination={{ clickable: true }} // Configura la paginación
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {products.map((product) => (
          
             <SwiperSlide className={style.swiperSlide + (selectedSlide === product._id ? ' ' + style.selectedSlide : '')}
            onMouseEnter={() => handleSlideClick(product._id)}
            onMouseLeave={handleSlideBlur}
            tabIndex={0}
             key={product._id}> <ProductCard name={product.name} price={product.price} image={product.images} /></SwiperSlide>
            ))}
       
      </Swiper>
            

        </div>

        <div className={style.containerTurno}>

            <p>PEDI TU TURNO</p>
            
        </div>
        
    </div>
  )
}

export default Main