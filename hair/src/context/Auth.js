import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [modoOscuro, setModoOscuro] = useState(false);

  const autenticarUsuario = async () => {
  
    if (localStorage.getItem("_id") === null) {
     
      setAuth({})
      return;
    }
    const _id = localStorage.getItem("_id");
   
    try {
      const response = await axios.get(
        `http://localhost:4000/api/usuarios/perfil/${_id}`
      );
      const { data } = response;
     
      setAuth(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    autenticarUsuario();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, autenticarUsuario,setModoOscuro,modoOscuro }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };