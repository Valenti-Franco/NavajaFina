import React, { useState } from 'react'
import { useCart } from '../../hooks/useCart';
import style from './index.module.css';
import { FaTimes } from 'react-icons/fa';
import { MdAdd, MdRemove } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Avatar, Fab } from '@material-ui/core';

const CartItem = ({ id, imagenes, precio, nombre, quantity, addToCart, removeToCart, removeFromCart }) => {
    const [hovered, setHovered] = useState(false);

    const handleMouseOver = () => {
        setHovered(true);
    };

    const handleMouseOut = () => {
        setHovered(false);
    };
    const images1 = imagenes
    //   .slice(1, -1) // Eliminar los caracteres de apertura y cierre ({})
    //   .split(",") // Dividir la cadena en elementos individuales
    //   .map((image) => image.trim());

    const variants = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: {
                dutaion: 1
            }
        }
    }
    return (

        <motion.li
            initial='hidden'
            animate='visible'
            variants={variants}
            exit='hidden'
            layoutId={id}
            style={{ color: hovered ? ' #FF0000' : '' }}
        >
            <motion.button
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 700, damping: 10 }}
                name='buton' className={style.removeFromCart} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={removeFromCart}>
                <Fab variant="extended" size="small" color="secondary">

                    <FaTimes />
                </Fab>

            </motion.button>
            <Link to={`/products/${id}`}>
                <img

                    style={{ height: "200px", width: "200px", filter: hovered ? 'grayscale(1)' : '' }} src={images1[0] ? images1[0].url : 'https://res.cloudinary.com/deh35rofi/image/upload/v1698212497/producto-sin-imagen_basarf.png'} alt='' />
            </Link>
            <div>
                <strong >{nombre}</strong>
                <strong >${precio * quantity}</strong>

            </div>
            <footer>


                <Fab size="small" onClick={addToCart} color="primary" aria-label="add">
                    <MdAdd />
                </Fab>
                <h2>{quantity}</h2>
                <Fab size="small" onClick={removeToCart} color="secondary" aria-label="add">
                    <MdRemove />
                </Fab>


            </footer>
        </motion.li>

    )
}

export default CartItem