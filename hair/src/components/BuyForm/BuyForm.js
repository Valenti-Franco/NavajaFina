import React, { useContext, useState } from 'react'
import { ToastContainer,toast } from 'react-toastify';
import style from './index.module.css';
import { motion } from 'framer-motion';
import { AuthContext } from '../../context/Auth';
import { Link } from 'react-router-dom';
import { FaCity, FaTimes } from "react-icons/fa";

const BuyForm = () => {

    const [ name, setName ] = useState ('');
    const [ lastname, setLastName ] = useState ('');
    const [ card, setCard ] = useState ('');
    const [ address, setAddress ] = useState ('');
    const [city,setCity]=useState('');
    const [postalcode,setPostalcode]=useState('');
    const [province,setProvince]=useState('');
    const { modoOscuro } = useContext(AuthContext);
    // const [ alert, setAlert ] = useState = ({})

    const handleSubmit = (e) => {
        e.preventDefault();

        if([ name,lastname, card,province,address,city,postalcode ].includes('')) {
        
           toast.error('Todos los campos son obligatorios');
           
           return
                   
        }

        if(card.length < 16 ) {
           
            toast.error('Tarjeta invalida, minimo son 16 numeros');

            return
        }
        // setAlert({})
    }




  return (
    <motion.div 
    initial={{opacity:0}}
    animate={{
      opacity:1,
        transition:{
            dutaion:10
        },
    }}
    exit={{opacity:0}} className={style.main + (!modoOscuro ? ' ' + style.mainDark : '')}>    


    
       <form 
            className={style.formreg}
            onSubmit={handleSubmit}
        >
            <Link className={style.x} to="/cart"><FaTimes /></Link>
           <h2 className={style.tittle}>Medio de Pago</h2>

            <div className={style.divcontainer}>
                <input
                    id="name"
                    type="text"
                    placeholder="Nombre"
                    className={style.inputcontainer}
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>
            <div className={style.divcontainer}>
                <input
                    id="lastname"
                    type="text"
                    placeholder="Apellido"
                    className={style.inputcontainer}
                    value={lastname}
                    onChange={e => setLastName(e.target.value)}
                />
            </div>

            <div className={style.divcontainer}>
                <input
                    id="card"
                    type="number"
                    placeholder="Tarjeta de credito/debito"
                    className={style.inputcontainer}
                    value={card}
                    onChange={e => setCard(e.target.value)}
                />
            </div  >
            <div className={style.divcontainer}>
                <input
                    id="province"
                    type="text"
                    placeholder="Provincia"
                    className={style.inputcontainer}
                    value={province}
                    onChange={e => setProvince(e.target.value)}   
                />
            </div>
            <div className={style.divcontainer}>
                <input
                    id="city"
                    type="text"
                    placeholder="Ciudad"
                    className={style.inputcontainer}
                    value={city}
                    onChange={e => setCity(e.target.value)}
                />
            </div> 
            <div className={style.divcontainer}>
                <input
                    id="address"
                    type="text"
                    placeholder="Direccion"
                    className={style.inputcontainer}
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                />
            </div> 
            <div className={style.divcontainer}>
                <input
                    id="postalcode"
                    type="number"
                    placeholder="Codigo Postal"
                    className={style.inputcontainer}
                    value={postalcode}
                    onChange={e => setPostalcode(e.target.value)}
                />
            </div>          
            <div className={style.divcontainer}>
            <input 
                type="submit"
                value="Comprar"
                className={style.button}
            />
            <div className={style.buttons}>
            <Link className={style.a} to="/cart"><button className={style.com}>Volver al Carrito</button></Link>
            </div>
            
            </div>
            <div >
            <ToastContainer />
         </div>
        </form>
        
    </motion.div >
  )
}


export default BuyForm