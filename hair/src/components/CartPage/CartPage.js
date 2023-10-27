import React, { useContext, useEffect, useState } from 'react'
import { useCart } from '../../hooks/useCart';
import CartItem from '../Cart/CartItem';
import style from './index.module.css'
import { Scrollbars } from 'react-custom-scrollbars';
import { AuthContext } from '../../context/Auth';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Box, CircularProgress } from '@material-ui/core';
import { MdDelete } from 'react-icons/md';

const CartPage = () => {
    const token = localStorage.getItem("_id");
    const config = {
        headers: {
            'Authorization': `Bearer ${token}` // Agrega el token JWT en la cabecera de autorización
        }
    };

    const { cart, clearCart, addToCart, removeToCart, removeFromCart } = useCart();
    const total = cart.reduce((a, b) => a + b.precio * b.quantity, 0);
    const { modoOscuro } = useContext(AuthContext)
    const { auth } = useContext(AuthContext)
    const navigate = useNavigate();


    const [isLoading, setIsLoading] = useState(false)

    const handlerCrearOrden = async () => {
        try {
            setIsLoading(true)
            const response = await axios.post(
                `https://tpibarbershop20231015224614.azurewebsites.net/api/OrdenCompra/${auth.id}`, {}, config
            );



            // Itera a través de los productos en el carrito y crea detalles para cada uno
            for (const item of cart) {
                await handlerCrearDetalle(item, response.data.id);
            }

            // Notificar éxito

            toast.success('Reserva Realizada Correctamente', {
                position: 'top-right',
                autoClose: 3000,
            });
            setIsLoading(false)
            clearCart();

        } catch (error) {
            toast.error('Debes Iniciar Sesión para Pagar', {
                position: 'top-right',
                autoClose: 3000,
            });
            setIsLoading(false)

            console.error(error);
        }
    };

    const handlerCrearDetalle = async (item, idOrden) => {
        // console.log(item)
        try {
            const response = await axios.post(
                `https://tpibarbershop20231015224614.azurewebsites.net/api/DetalleCompra/${idOrden}/${item.id}/${item.quantity}`, {}, config
            );
            // console.log(response)
        } catch (error) {
            if (error.response.status === 401) {
                toast.error("Debes Iniciar Sesión para comprar", {
                    position: 'top-right', // Puedes personalizar la posición
                    autoClose: 3000, // El tiempo en milisegundos que el toast permanecerá visible
                });
                navigate("/login")
            } else {
                toast.error(error.response.data, {
                    position: 'top-right', // Puedes personalizar la posición
                    autoClose: 3000, // El tiempo en milisegundos que el toast permanecerá visible
                });
            }
            console.error(error);
            // Manejar el error al crear el detalle
        }
    };
    return (

        <div className={style.cart + (!modoOscuro ? ' ' + style.cartDark : '')}>
            {/* {cart.length === 0
                ? <>
                    <h3>VACIO</h3>

                </> */}
            <>
                <div>
                    <Scrollbars style={{ width: 800, height: 800 }}>
                        <ul className={style.containerItems + (!modoOscuro ? ' ' + style.itemsDark : '')}>

                            <h2>CARRITO DE COMPRAS</h2>
                            {cart.length === 0 ? (
                                <h2>Vacio</h2>
                            ) : (

                                cart.map(product => (
                                    <CartItem key={product.id} removeToCart={() => removeToCart(product)} removeFromCart={() => removeFromCart(product)} addToCart={() => addToCart(product)} {...product} />
                                ))

                            )}

                        </ul>

                    </Scrollbars>
                    {cart.length !== 0 ? (
                        <button className={style.btnDelete} onClick={clearCart}>BORRAR  CARRITO <MdDelete /> </button>
                    ) : null}
                </div>
                <div className={style.total}>
                    {cart.length === 0 ? (

                        <h2>Vacio</h2>
                    ) : (
                        <>
                            <h2>TOTAL DEL CARRITO </h2>
                            {/* <p>SUBTOTAL: ${total}</p>
                         */}
                            <div>
                                {cart.map((item) => (
                                    <h5 key={item.id}>
                                        {item.nombre} - {item.precio} x {item.quantity}
                                    </h5>
                                ))}
                            </div>
                            {/* <p>ENVIO: $20</p> */}
                            <p>--------------</p>

                            <h2>TOTAL: ${total}</h2>

                            <div className={style.buttons}>
                                {!isLoading ? (
                                    <>

                                        <button onClick={handlerCrearOrden} className={style.but}>PAGAR</button>
                                        <Link className={style.a} to="/Products"><button className={style.com}>CONTINUAR COMPRANDO</button></Link>
                                    </>


                                ) : (
                                    <Box sx={{ display: 'flex', justifyContent: "center" }}>
                                        <CircularProgress />

                                    </Box>
                                )}
                            </div>

                        </>)}
                </div>
            </>

        </div >
    )
}

export default CartPage