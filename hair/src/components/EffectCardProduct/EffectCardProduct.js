import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Navigation } from "swiper";

import style from './index.module.css';

const EffectCardProduct = () => {
  return (
    <Swiper
    effect={"cards"}
    grabCursor={true}
  
    modules={[EffectCards]}
    className="user__swiper"
    style={{
      maxWidth: "180px",
      height: "240px", // Ajustamos la altura para que se ajuste al contenido
      marginTop: "1rem",
      overflow: "visible", // Permitimos que el contenido se muestre fuera del contenedor
      position: "relative",
    }}
    
    >
      <SwiperSlide className={style.swiperSlide} style={{ backgroundColor: "rgb(206, 17, 17)" }}>
        Slide 1
      </SwiperSlide>
      <SwiperSlide className={style.swiperSlide} style={{ backgroundColor: "rgb(0, 140, 255)" }}>
        Slide 2
      </SwiperSlide>
      <SwiperSlide className={style.swiperSlide} style={{ backgroundColor: "rgb(10, 184, 111)" }}>
        Slide 3
      </SwiperSlide>
      <SwiperSlide className={style.swiperSlide} style={{ backgroundColor: "rgb(211, 122, 7)" }}>
        Slide 4
      </SwiperSlide>
      <SwiperSlide className={style.swiperSlide} style={{ backgroundColor: "rgb(118, 163, 12)" }}>
        Slide 5
      </SwiperSlide>
      <SwiperSlide className={style.swiperSlide} style={{ backgroundColor: "rgb(180, 10, 47)" }}>
        Slide 6
      </SwiperSlide>
      <SwiperSlide className={style.swiperSlide} style={{ backgroundColor: "rgb(35, 99, 19)" }}>
        Slide 7
      </SwiperSlide>
      <SwiperSlide className={style.swiperSlide} style={{ backgroundColor: "rgb(0, 68, 255)" }}>
        Slide 8
      </SwiperSlide>
      <SwiperSlide className={style.swiperSlide} style={{ backgroundColor: "rgb(218, 12, 218)" }}>
        Slide 9
      </SwiperSlide>
      <SwiperSlide className={style.swiperSlide} style={{ backgroundColor: "rgb(54, 94, 77)" }}>
        Slide 10
      </SwiperSlide>
    </Swiper>
  );
};

export default EffectCardProduct;