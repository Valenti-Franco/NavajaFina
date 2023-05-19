import React, { useState, useId } from 'react'
import style from './index.module.css';
import { MdDelete } from "react-icons/md";

const Filters = ({ setFilter }) => {
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

  const deletefilters = (event) => {
  
    setFilter({
      category: 'all',
      price: 0
    })
    setMinPrice(0)
    setCategory('all')
    document.getElementById(priceId).value = '0'
    document.getElementById('category').value = 'all'

  }
  return (
    <div className={style.ContainerFilters}>
     
        <h2>FILTROS</h2>
        <div className={style.container}>
          <label htmlFor='price'>Precio Mínimo:</label>
          <div className={style.filtersItem}>

            <input type='range'
              id={priceId}
              min='0'
              max='1000'
              onChange={handlePriceChange}
            />
            <span>${minPrice}</span>
          </div>

        </div>
        <div className={style.container}>
          <label htmlFor='category'>Categoria:</label>
          <div className={style.filtersItem}>
            <select id='category' onChange={handleCategoryChange}>
              <option value='all'>Todas</option>
              <option value='Tools'>Herraminetas</option>
              <option value='Scissors_Knives'>Tijeras & Navajas</option>
              <option value='Machines'>Maquinas</option>
              <option value='Hair_Care'>Cuidado del Cabello</option>
            </select>
          </div>
        </div>
        <div onClick={deletefilters} className={style.delete}>

        <MdDelete />
        </div>
      


    </div>

  )
}

export default Filters