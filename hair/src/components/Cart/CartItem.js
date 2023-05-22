import React from 'react'
import { useCart } from '../../hooks/useCart';


const CartItem = ({images,price,name, quantity, addToCart,removeToCart, removeFromCart}) => {
    
    return (
        <li>
            <button onClick={removeFromCart}>X</button>
            <img src={images[0]} />

            <div>
                <strong>{name}</strong> - ${price * quantity}
            </div>
            <footer>
                <small >
                    Qty: {quantity}
                </small>
                <button onClick={addToCart}>+</button>
                <button onClick={removeToCart}>-</button>

            </footer>
        </li>

    )
}

export default CartItem