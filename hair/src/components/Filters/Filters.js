import React, { useState, useId } from 'react'
import  style  from './index.module.css';

const Filters = ({setFilter}) => {
    const [minPrice, setMinPrice] = useState(0)
    const [category, setCategory] = useState('all')

    const priceId = useId()
    const handlePriceChange = (event) => {
    
        setMinPrice(event.target.value)
        setFilter(prevState => ({
        ...prevState,
        price: event.target.value
        }))
    }
    const handleCategoryChange = (event) => {
    
      setCategory(event.target.value)
      setFilter(prevState => ({
      ...prevState,
      category: event.target.value
      }))
  }
    
  return (
    <div className={style.ContainerFilters}>
      <div className={style.filtros}>
      <h2>FILTROS</h2>
        <label htmlFor='price'>Precio Mínimo:</label>
        <input type='range'
        id={priceId}
        min='0'
        max='1000'
        onChange={handlePriceChange}
        /> 
        <span>${minPrice}</span>


        <label htmlFor='category'>Categoria:</label>
        <select id='category' onChange={handleCategoryChange}>
            <option value='all'>Todas</option>
            <option value='Tools'>Herraminetas</option>
            <option value='Scissors_Knives'>Tijeras & Navajas</option>
            <option value='Machines'>Maquinas</option>
            <option value='Hair_Care'>Cuidado del Cabello</option>
        </select>

      </div>
     
       
    </div>
    
  )
}

export default Filters