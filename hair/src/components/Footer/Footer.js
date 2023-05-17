import React from 'react'
import  style  from './index.module.css';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';


const Footer = () => {
  return (
    <div className={style.footer}>
      <div className={style.horarios}>
        <h3>Horarios de atencion:</h3>
        <ul>Lunes a Viernes de  9:00 a 20:00</ul>
        <ul>Sabados de 10:00 a 20:00</ul>
      </div>

      <div className={style.ubication}>
        <h3>Nos encontramos en Zeballos 1341 Rosario, Santa Fe</h3>
        <ul>Telefono fijo 341499999</ul>
        <ul>WhatsApp 3415399999</ul>
        {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5630.319394631225!2d-60.64509618940769!3d-32.95607973477088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b7ab11d0eb49c3%3A0x11f1d3d54f950dd0!2sUniversidad%20Tecnol%C3%B3gica%20Nacional%20%7C%20Facultad%20Regional%20Rosario!5e0!3m2!1ses-419!2sar!4v1684155669260!5m2!1ses-419!2sar" width="600" height="450"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
      </div>

      <div className={style.Social}>
        <h3>Seguinos en nueustras redes</h3>
        <div className={style.logos}>
          <FaFacebook className={style.facebook} />
          <FaTwitter className={style.twitter} />
          <FaInstagram className={style.instagram}/>
        </div>

      </div>
    </div>
  )
}

export default Footer 