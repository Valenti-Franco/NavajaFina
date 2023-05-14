import React, { useState } from 'react'
import style from './index.module.css';
import ProductCard from '../ProductCard/ProductCard';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import "swiper/css/pagination";



// import required modules
import { Pagination, Autoplay, Navigation } from "swiper";
import SlideBarber from '../SlideBarber/SlideBarber';
import Products from './Products';


const Main = () => {

  return (
    <div className={style.main}>
      <SlideBarber />
      <Products />

      <div className={style.containerTurno}>

        <p>PEDI TU TURNO</p>

      </div>

    </div>
  )
}

export default Main