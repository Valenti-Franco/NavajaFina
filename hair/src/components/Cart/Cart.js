import React, { useId } from 'react'
import style from './index.module.css';

import { FaCartPlus } from 'react-icons/fa';

import CartItem from './CartItem';
import { useCart } from '../../hooks/useCart';

const Cart = () => {
    const cartCheckId = useId();
    const {cart, clearCart, addToCart,removeToCart, removeFromCart} = useCart();
  return (
    <>

        <label className={style.cartButton} htmlFor={cartCheckId}>
            <FaCartPlus/>
        </label>
        <input className={style.input} id={cartCheckId} type='checkbox' hidden/> 

        <aside className={style.cart}>
            {cart.length===0
            ? <>
                Carrito Vacio
            
            </>
            : <>
            <ul>
                {cart.map(product => (
                    <CartItem key={product._id} removeToCart={() => removeToCart(product)} removeFromCart={() => removeFromCart(product)} addToCart={() => addToCart(product)} {...product} />
                ))}
            </ul>
            <button onClick={clearCart}>Clear</button>
            </>
            
            }
            
        </aside>
    </>
  )
}

export default Cart