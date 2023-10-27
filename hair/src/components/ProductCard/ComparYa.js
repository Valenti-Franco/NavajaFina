import React from 'react'
import style from './index.module.css';
import { MdAttachMoney } from 'react-icons/md';




const ComparYa = ({ abrirCerrarModalBuy }) => {
    return (
        <button onClick={abrirCerrarModalBuy} className={style.icontextProductMoney}>



            Comprar Ahora <MdAttachMoney />




        </button>
    )
}

export default ComparYa