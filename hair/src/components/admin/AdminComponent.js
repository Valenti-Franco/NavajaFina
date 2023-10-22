import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './index.module.css';
import { AuthContext } from '../../context/Auth';

import axios from 'axios';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const usuariosColumns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'nombre',
    headerName: 'Nombre',
    width: 150,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 200,
    editable: true,
  },
  {
    field: 'role',
    headerName: 'Rol',
    width: 120,
    editable: true,
  },
];

const productosColumns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'nombre',
    headerName: 'Nombre',
    width: 150,
    editable: true,
  },
  {
    field: 'categoryId',
    headerName: 'Categoria',
    width: 150,
    editable: true,
  },
  {
    field: 'subcategoryId',
    headerName: 'Subcategoria',
    width: 150,
    editable: true,
  },
  {
    field: 'precio',
    headerName: 'Precio',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'descripcion',
    headerName: 'Descripción',
    width: 250,
    editable: true,
  },
  {
    field: 'stock',
    headerName: 'Stock',
    type: 'number',
    width: 110,
    editable: true,
  },  
];

const categoryColumns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'nombre',
    headerName: 'Nombre',
    width: 150,
    editable: true,
  },
  {
    field: 'descripcion',
    headerName: 'Descripción',
    width: 250,
    editable: true,
  },
]

const subcategoryColumns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'nombre',
    headerName: 'Nombre',
    width: 150,
    editable: true,
  },
  {
    field: 'categoryId',
    headerName: 'Descripción',
    width: 250,
    editable: true,
  },
]

const AdminComponent = () => {
  const {modoOscuro}= useContext(AuthContext) 
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const  [subcategory, setSubCategory] = useState([]);
  const Auth = useContext(AuthContext);

  useEffect(() => {
    if (Auth.auth.role !== 'Admin') {
      navigate('/');
    }
  }, [Auth]);

  useEffect(() => {

    obtenerUsuarios();
    obtenerProductos();
    obtenerCategoria();
    obtenerSubCategoria();
  }, []);



  const token = localStorage.getItem("_id");
  const config = {
    headers: {
      'Authorization': `Bearer ${token}` // Agrega el token JWT en la cabecera de autorización
    }
  };
 
  const obtenerProductos = async () => {

    // Realiza la solicitud GET con el token JWT
    try {
      const response = await axios.get('https://tpibarbershop20231015224614.azurewebsites.net/api/productos', config);
      console.log(response)
      const productData = response.data.map((product, index) => ({
        ...product,
        id: index + 1,
      }));
      setProducts(productData);
    } catch (error) {
      console.error(error);
    }
  };

  const obtenerUsuarios = async () => {
    try {
      const response = await axios.get('https://tpibarbershop20231015224614.azurewebsites.net/api/usuarios/admin', config);
      const userData = response.data.map((user, index) => ({
        ...user,
        id: index + 1,
      }));
      setUsers(userData);
 
    } catch (error) {
      console.error(error);
    }
  };

  const obtenerCategoria = async () => {
    try {
      const response = await axios.get('https://tpibarbershop20231015224614.azurewebsites.net/api/Category', config);
      const CategoryData = response.data.map((user, index) => ({
        ...user,
        id: index + 1,
      }));
      setCategory(CategoryData);
 
    } catch (error) {
      console.error(error);
    }
  };

  const obtenerSubCategoria = async () => {
    try {
      const response = await axios.get('https://tpibarbershop20231015224614.azurewebsites.net/api/SubCategory', config);
      const SubCategoryData = response.data.map((user, index) => ({
        ...user,
        id: index + 1,
      }));
      setSubCategory(SubCategoryData);
 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={style.main + (!modoOscuro ? ' ' + style.mainDark : '')}>
      <div className={style.AdminContainer + (!modoOscuro ? ' ' + style.AdminContainerDark : '')}>
        <div className={style.Container}>
          <h1 className={style.title}>USUARIOS</h1>
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={users}
              columns={usuariosColumns}
              autoPageSize
              checkboxSelection
              disableColumnSelector
              disableColumnMenu
            />
          </Box>
        </div>

        <div className={style.Container}>
          <h1 className={style.title}>PRODUCTOS</h1>
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={products}
              columns={productosColumns}
              autoPageSize
              checkboxSelection
              disableColumnSelector
              disableColumnMenu
        
            />
          </Box>
        </div>

        <div className={style.Container}>
          <h1 className={style.title}>CATEGORIAS</h1>
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={category}
              columns={categoryColumns}
              autoPageSize
              checkboxSelection
              disableColumnSelector
              disableColumnMenu
        
            />
          </Box>
        </div>

        <div className={style.Container}>
          <h1 className={style.title}>SUBCATEGORIAS</h1>
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={subcategory}
              columns={subcategoryColumns}
              autoPageSize
              checkboxSelection
              disableColumnSelector
              disableColumnMenu
        
            />
          </Box>
        </div>

      </div>
    </div>
  );
};

export default AdminComponent;