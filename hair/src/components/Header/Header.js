import style from "./index.module.css";
import Logo from "./logo/Logo.png";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faUser } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react';
// import BurguerIcons from "./BurguerIcons/BurguerIcons";


const Header = () => {

  const [isScrolled, setIsScrolled] = useState(false);

  // enlace para realizar un seguimiento de si el usuario se ha desplazado hacia abajo en la página o no
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  // Agregamos un detector de eventos al objeto de la ventana para escuchar los eventos de desplazamiento y actualizar el estado.
  window.addEventListener("scroll", handleScroll);

  const [ clicked, setClicked ] = useState(false)

  const handleClick = () => {
    //cuando esta true lo pasa al false y viceversa
    setClicked(!clicked);    

  }

  return (
    <>
    <header className={`${style.header} ${isScrolled ? style.scrolled : ""}`}>
      <div className={style.logo}>
      <a href="/">
        <img src={Logo} alt="logo" />
      </a>
      </div>      
      <nav className={`${style.nav} ${clicked ? style.active : ""}`}>
        <a href="/">Nosotros</a>
        <a href="/">Contacto</a>
        <a href="/">Productos</a>
        <a href="/">Iniciar sesión
        {/* <FontAwesomeIcon className={style.user} icon={faUser} /> */}
        </a>
      </nav>
      <div className={style.burguer}>
        {/* <BurguerIcons clicked={clicked} handleClick={handleClick}/> */}
        </div>
    </header>
    </>
  );
};

export default Header;
