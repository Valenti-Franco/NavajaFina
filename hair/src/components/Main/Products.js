import React from 'react'
import { Pagination, Autoplay, Navigation } from "swiper";
import SlideBarber from '../SlideBarber/SlideBarber';
import style from './index.module.css';
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from '../ProductCard/ProductCard';
import EffectCardProduct from '../EffectCardProduct/EffectCardProduct';
import { FaRegEye } from 'react-icons/fa';


const Products = () => {

    const products = [
        {
            _id: '123163',
            name: 'B-Way Five',
            images: ['https://http2.mlstatic.com/D_NQ_NP_665122-MLA50969950919_082022-O.webp', 'https://http2.mlstatic.com/D_NQ_NP_722620-MLA50970122347_082022-O.webp'],
            price: '$32.900',
        },
        {
            _id: '12314',
            name: 'Cortadora Pelo Profesional Babyliss Big Shot',
            images: ['https://http2.mlstatic.com/D_NQ_NP_665683-MLA31429871436_072019-O.webp', 'https://http2.mlstatic.com/D_NQ_NP_795993-MLA31429890111_072019-O.webp'],
            price: '$32.900',
        },

        {
            _id: '1236515',
            name: 'Set de herramientas Profesionales',
            images: ['https://www.barbershop.com.ar/product_images/z/745/528186__74084_std.jpg', 'https://www.barbershop.com.ar/product_images/z/745/528186__74084_std.jpg'],
            price: '$32.900',
        },

        {
            _id: '123165465',
            name: 'Kit Tijeras',
            images: ['https://www.barbershop.com.ar/product_images/z/745/528186__74084_std.jpg', 'https://www.barbershop.com.ar/product_images/z/745/528186__74084_std.jpg'],
            price: '$32.900',
        },

        {
            _id: '1236464615',
            name: 'Tijera Corte y Pulir Navakin',
            images: ['https://www.barbershop.com.ar/product_images/z/745/528186__74084_std.jpg', 'https://www.barbershop.com.ar/product_images/z/745/528186__74084_std.jpg'],
            price: '$32.900',
        },

        {
            _id: '12365464645fsdf515',
            name: 'Set Herraminetas Tijera de Corte',
            images: ['https://www.barbershop.com.ar/product_images/z/745/528186__74084_std.jpg', 'https://www.barbershop.com.ar/product_images/z/745/528186__74084_std.jpg'],
            price: '$32.900',
        },
        {
            _id: '123654646sdasd45515',
            name: 'Set Herraminetas Tijera de Corte',
            images: ['https://www.barbershop.com.ar/product_images/z/745/528186__74084_std.jpg', 'https://www.barbershop.com.ar/product_images/z/745/528186__74084_std.jpg'],
            price: '$32.900',
        },
        {
            _id: '12365464645423423515',
            name: 'Set Herraminetas Tijera de Corte',
            images: ['https://www.barbershop.com.ar/product_images/z/745/528186__74084_std.jpg', 'https://www.barbershop.com.ar/product_images/z/745/528186__74084_std.jpg'],
            price: '$32.900',
        },


    ];
    return (
        <div className={style.containerPeinados}>

            <h1 className={style.title}>PRODCUTOS</h1>

            <div className={style.containerProduct}>
            <EffectCardProduct />
                <div className={style.ContainertextProduct}>
                    <p className={style.textProduct}>
                        Bienvenidos a la sección de productos de barbería, donde encontrarás una amplia gama de artículos para el cuidado de la barba, el cabello y el afeitado. Nuestra selección incluye productos de alta calidad y herramientas profesionales para ayudarte a lograr un estilo impecable. Explora nuestra variedad y descubre cómo nuestros productos pueden mejorar tu rutina de cuidado personal.
                    </p>
                    <button className={style.icontextProduct}>Ver Productos <FaRegEye/></button>
                </div>
                

            </div>
            <Swiper
                slidesPerView={1}
                spaceBetween={170}
                centeredSlides={true}
                className={style.mySwiper}
                modules={[Autoplay, Pagination, Navigation]}
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
            >
                {products.reduce((acc, product, index) => {
                    if (index % 3 === 0) {
                        acc.push([]);
                    }
                    acc[acc.length - 1].push(product);
                    return acc;
                }, []).map((group, index) => (
                    <SwiperSlide key={index}>
                        <div className={style.sliderGroup}>
                            {group.map((product) => (
                                <div
                                    className={style.productContainer}

                                    tabIndex={0}
                                    key={product._id}
                                >
                                    <ProductCard name={product.name} price={product.price} image={product.images} />
                                </div>
                            ))}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>


        </div>
    )
}

export default Products