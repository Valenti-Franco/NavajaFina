const token = localStorage.getItem("_id");
const config = {
    headers: {
        'Authorization': `Bearer ${token}` // Agrega el token JWT en la cabecera de autorización
    }
};

export default config