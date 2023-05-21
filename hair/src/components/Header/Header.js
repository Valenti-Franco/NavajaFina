import React from 'react'
import  style  from './index.module.css';
import { Link } from 'react-router-dom';



const Header = () => {
 
  return (
    <div className={style.header}>NAVAJAFINAs
    <nav>
        <ul>
            <li><Link to='/'>Home</Link> </li>
            <li><Link to='/products'>Products</Link></li>
        </ul>
     </nav>
    </div>
  )
}

export default Header