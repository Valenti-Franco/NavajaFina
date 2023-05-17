import React from 'react'
import { Pagination, Autoplay, Navigation } from "swiper";
import SlideBarber from '../SlideBarber/SlideBarber';
import style from './index.module.css';
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from '../ProductCard/ProductCard';
import EffectCardProduct from '../EffectCardProduct/EffectCardProduct';
import { FaRegEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const Products = () => {

    const products = [
        {
          _id: 12345,
          category: "Machines",
          subcategory: "Clippers",
          name: "Wahl Rinseable",
          price: 200,
          stock: 10,
          images: ["https://www.barbershop.com.ar/product_images/u/975/515789__68760_zoom.jpg","https://www.barbershop.com.ar/product_images/g/618/515789-1__69130_zoom.jpg","https://www.barbershop.com.ar/product_images/l/545/515789-4__43369_zoom.jpg"]
        },
        {
          _id: 23456,
          category: "Machines",
          subcategory: "Clippers",
          name: "MAQ REC 870 GOLD FX BOOST",
          price: 250,
          stock: 20,
          images: ["https://www.barbershop.com.ar/product_images/u/764/15357__31275_zoom.jpg","https://www.barbershop.com.ar/product_images/q/187/15357-2__81838_zoom.jpg"]
        },
        {
          _id: 34567,
          category: "Scissors_Knives",
          subcategory: "Knives",
          name: "Navaja con Mango de Madera Yasaka",
          price: 20,
          stock: 15,
          images: ["https://www.barbershop.com.ar/product_images/q/915/5009-1__22016_zoom.JPG","https://www.barbershop.com.ar/product_images/j/779/5009__02689_zoom.JPG"]
        },
        {
          _id: 45678,
          category: "Tools",
          subcategory: "Peines",
          name: "CARBON ANTIST 4011 LUCYDAN",
          price: 5,
          stock: 150,
          images: ["https://www.barbershop.com.ar/product_images/d/065/534492__97769_zoom.jpg","https://www.barbershop.com.ar/product_images/m/237/534492-3__10656_zoom.jpg"]
        },
        {
          _id: 56789,
          category: "Machines",
          subcategory: "Recortadoras",
          name: "BABYLISS PRO FOIL FX02 GOLD",
          price: 70,
          stock: 8,
          images: ["https://www.barbershop.com.ar/product_images/w/666/14333__08351_zoom.jpg","https://www.barbershop.com.ar/product_images/m/415/14333-6__77434_zoom.jpg"]
        },
        {
          _id: 67890,
          category: "Hair_Care",
          subcategory: "Champús para barba y cabello",
          name: "AC X100 HUILE NUTRITIVE MYTHIC OIL",
          price: 15,
          stock: 30,
          images: ["https://www.barbershop.com.ar/product_images/l/674/2056__68568_zoom.jpg"]
        },
        {
          _id: 78901,
          category: "Hair_Care",
          subcategory: "Acondicionadores para barba y cabello",
          name: "AC X100 OIL MIRACLE BARBARY BONACURE",
          price: 20,
          stock: 25,
          images: ["https://www.barbershop.com.ar/product_images/q/727/2835__46442_zoom.jpg"]
        },
        {
          _id: 89012,
          category: "Hair_Care",
          subcategory: "Aceites y bálsamos para barba",
          name: "Aceite Esencial de Kendi x100ml Teknia Lakme",
          price: 25,
          stock: 18,
          images: ["https://www.barbershop.com.ar/product_images/z/391/5608__02909_zoom.jpg"]
        },
      //   {
      //     _id: 90123,
      //     category: "Productos para el cuidado del cabello",
      //     subcategory: "Ceras y pomadas para peinar",
      //     name: "Cera para peinar con acabado mate",
      //     price: 12,
      //     stock: 40,
      //     images: []
      //   },
      //   {
      //     _id: 11234,
      //     category: "Productos para el cuidado del cabello",
      //     subcategory: "Productos para el cuidado del cuero cabelludo",
      //     name: "Loción anticaspa para cuero cabelludo sensible",
      //     price: 18,
      //     stock: 20,
      //     images: []
      //   },
      
      // {
      //   _id: 98765,
      //   category: "Productos para el afeitado",
      //   subcategory: "Cuchillas de afeitar",
      //   name: "Paquete de cuchillas de afeitar premium",
      //   price: 10,
      //   stock: 50,
      //   images: []
      //   },
      //   {
      //   _id: 87654,
      //   category: "Productos para el afeitado",
      //   subcategory: "Espumas y geles de afeitado",
      //   name: "Espuma de afeitar hidratante",
      //   price: 8,
      //   stock: 40,
      //   images: []
      //   },
      //   {
      //   _id: 76543,
      //   category: "Productos para el afeitado",
      //   subcategory: "Brochas de afeitar",
      //   name: "Brocha de afeitar de cerdas naturales",
      //   price: 15,
      //   stock: 30,
      //   images: []
      //   },
      //   {
      //   _id: 65432,
      //   category: "Productos para el afeitado",
      //   subcategory: "Aftershaves y lociones para después del afeitado",
      //   name: "Loción para después del afeitado con aroma refrescante",
      //   price: 12,
      //   stock: 25,
      //   images: []
      //   },
      //   {
      //   _id: 54321,
      //   category: "Productos para el afeitado",
      //   subcategory: "Productos para el cuidado de la piel",
      //   name: "Crema hidratante facial para hombres",
      //   price: 20,
      //   stock: 20,
      //   images: ["https://www.barbershop.com.ar/product_images/u/975/515789__68760_zoom.jpg","https://www.barbershop.com.ar/product_images/g/618/515789-1__69130_zoom.jpg","https://www.barbershop.com.ar/product_images/l/545/515789-4__43369_zoom.jpg"]
    
      //   }
        ];
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