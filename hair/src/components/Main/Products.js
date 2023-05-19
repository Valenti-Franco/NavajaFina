import React from 'react'
import { Pagination, Autoplay, Navigation } from "swiper";
import SlideBarber from '../SlideBarber/SlideBarber';
import style from './index.module.css';
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from '../ProductCard/ProductCard';
import EffectCardProduct from '../EffectCardProduct/EffectCardProduct';
import { FaRegEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const Products = ({products}) => {

    
    
    const handleLinkClick = () => {
        window.scrollTo(0, 0);
    }
    return (
        <div className={style.containerPeinados}>

            <h1 className={style.title}>PRODCUTOS</h1>

            <div className={style.containerProduct}>
            <EffectCardProduct />
                <div className={style.ContainertextProduct}>
                    <p className={style.textProduct}>
                        Bienvenidos a la sección de productos de barbería, donde encontrarás una amplia gama de artículos para el cuidado de la barba, el cabello y el afeitado. Nuestra selección incluye productos de alta calidad y herramientas profesionales para ayudarte a lograr un estilo impecable. Explora nuestra variedad y descubre cómo nuestros productos pueden mejorar tu rutina de cuidado personal.
                    </p>
                   
                        <Link onClick={handleLinkClick} className={style.icontextProduct} to='/products'>
                        Ver Productos <FaRegEye/>
                        </Link>
                   
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
                                    <ProductCard id={product._id} name={product.name} price={product.price} image={product.images} />
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