import React from 'react'
import  style  from './index.module.css';

const Main = () => {
  return (
    <div className={style.main}>
        <div className={style.containerPeinados}>

            <p>CORTES</p>

        </div>

        <div className={style.containerTurno}>

            <p>PEDI TU TURNO</p>
            
        </div>
        
    </div>
  )
}

export default Main