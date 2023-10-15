import React from 'react'

import { MdRemoveShoppingCart } from 'react-icons/md';
import { FaCartPlus } from 'react-icons/fa';
import style from './index.module.css';
import { useCart } from '../../hooks/useCart';

const BtnCart = ({ product }) => {
  // console.log(product)
  const { addToCart, removeFromCart, cart } = useCart();
  const checkProductInCart = product => {
    // console.log(product.id)
    return cart.some(item => item.id === product.id)
  }
  const isProductInCart = checkProductInCart(product);



  return (
    <button onClick={() => isProductInCart ? removeFromCart(product) : addToCart(product)} className={isProductInCart ? style.icontextProductRemove : style.icontextProduct}>

      {
        isProductInCart
          ? <> Elinimar del Carrito <MdRemoveShoppingCart /></>
          : <> Añadir al Carrito <FaCartPlus /></>
      }

    </button>
  )
}

export default BtnCart


