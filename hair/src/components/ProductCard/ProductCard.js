
import React from 'react'
import  style  from './index.module.css';

const ProductCard = (product) => {
    console.log(product)
    console.log(product.name)
    console.log(product.image)

    return (
    <div className={style.containerProduct}>
        {product.name}
    <img className={style.image} src={product.image}  />
    
    </div>
  )
}

export default ProductCard
