import React from 'react'
import  style  from './index.module.css';
import ProductCard from '../ProductCard/ProductCard';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";



// import required modules
import { FreeMode, Pagination } from "swiper";


const products = [
                    {_id:'123163',
                        name:'Kit Máquina Finisher + Set Tijeras ',
                        images:'https://www.barbershop.com.ar/product_images/z/745/528186__74084_std.jpg'},
                    {_id:'12314',
                      name:'Plancha HCT',
                      images:'https://www.barbershop.com.ar/product_images/k/881/15478__51429_std.jpg'},

                    {_id:'1236515',
                    name:'Set de herramientas Profesionales',
                    images:'https://www.barbershop.com.ar/product_images/v/147/c1534__83513_std.jpg'},

                    {_id:'123165465',
                    name:'Kit Tijeras',
                    images:'https://www.barbershop.com.ar/product_images/j/017/695033__95893_std.jpg'},

                    {_id:'1236464615',
                    name:'Tijera Corte y Pulir Navakin',
                    images:'https://www.barbershop.com.ar/product_images/q/447/c345__52643_std.jpg'},

                    {_id:'12365464645515',
                    name:'Set Herraminetas Tijera de Corte',
                    images:'https://www.barbershop.com.ar/product_images/p/851/c5428__38713_std.jpg'},

                  ];

console.log(products[0].images[0])
const Main = () => {
  return (
    <div className={style.main}>
        <div className={style.containerPeinados}>

            <p>CORTES</p>
        <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className={style.mySwiper}
      >
        {products.map((product) => (
          
             <SwiperSlide className={style.swiperSlide} key={product._id}> <ProductCard name={product.name} image={product.images} /></SwiperSlide>
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