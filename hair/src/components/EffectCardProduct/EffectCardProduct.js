import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Navigation } from "swiper";

import style from './index.module.css';

const EffectCardProduct = ({ products }) => {

  console.log(products)
  return (
    <Swiper
      effect={"cards"}
      grabCursor={true}

      modules={[EffectCards]}
      className="user__swiper"
      style={{
        backgroundSize: "cover",

        backgroundPosition: "center",
        maxWidth: "180px",
        height: "240px", // Ajustamos la altura para que se ajuste al contenido
        marginTop: "1rem",
        overflow: "visible", // Permitimos que el contenido se muestre fuera del contenedor
        position: "relative",
      }}

    >
      {/* <SwiperSlide className={style.swiperSlide} style={{ backgroundPosition: "center",backgroundSize: "cover", backgroundImage: "url('https://www.barbershop.com.ar/product_images/l/674/2056__68568_zoom.jpg')" }}> */}

      {/* </SwiperSlide> */}
      {products?.map(product => (
        product.imagenes[0]?.url ? (
          <SwiperSlide className={style.swiperSlide} style={{ backgroundPosition: "center", backgroundSize: "cover", backgroundImage: `url(${product.imagenes[0]?.url})` }}>

          </SwiperSlide>

        ) : null
      ))}


    </Swiper >
  );
};

export default EffectCardProduct;