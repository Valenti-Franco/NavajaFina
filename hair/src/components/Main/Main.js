import React  from 'react'
import style from './index.module.css';

import "swiper/css";

import "swiper/css/pagination";




import SlideBarber from '../SlideBarber/SlideBarber';
import Products from './Products';
import { motion } from 'framer-motion';


const Main = () => {
  
  return (
    
    <motion.div 
    initial={{opacity:0}}
    animate={{
      opacity:1,
        transition:{
            dutaion:1
        },
    }}
    exit={{opacity:0}}
    
    className={style.main}>
      
       <Products />
      <SlideBarber />
     

      {/* <div className={style.containerTurno}>

        <p>PEDI TU TURNO</p>

      </div> */}

    </motion.div>
  )
}

export default Main