import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './index.module.css';
import { AuthContext } from '../../context/Auth';
import axios from 'axios';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@mui/x-data-grid';
import { MdDelete, MdEdit } from 'react-icons/md';
import { Modal, Button, TextField } from '@material-ui/core';
import BodyProduct from './BodyProduct';
import BodyProductEdit from './BodyProductEdit';
import { ToastContainer, toast } from 'react-toastify';
import BodyDeleteProduct from './BodyDeleteProduct';
import BodyProductImg from './BodyProductImg';
// import config from '../../utils/Config';


const token = localStorage.getItem("_id");
console.log(token)
const config = {
  headers: {
    'Authorization': `Bearer ${token}` // Agrega el token JWT en la cabecera de autorización
  }
};




const usuariosColumns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'nombre',
    headerName: 'Nombre',
    width: 150,
    editable: false,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 200,
    editable: false,
  },
  {
    field: 'role',
    headerName: 'Rol',
    width: 120,
    editable: false,
  },
];

const categoryColumns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'nombre',
    headerName: 'Nombre',
    width: 150,
    editable: false,
  },
  {
    field: 'descripcion',
    headerName: 'Descripción',
    width: 250,
    editable: false,
  },
]

const subcategoryColumns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'nombre',
    headerName: 'Nombre',
    width: 150,
    editable: false,
  },
  {
    field: 'categoryId',
    headerName: 'Descripción',
    width: 250,
    editable: false,
  },
]

const AdminComponent = () => {

  const productosColumns = [
    {
      field: 'Acciones',
      renderCell: (params) => {

        return (
          <div className={style.acciones}>
            <div>
              <MdDelete
                className={style.btnDelete}
                onClick={() => abrirCerrarModalDeleteProduct(params.row.id)}
              />
            </div>
            <div>
              <MdEdit className={style.btnEdit}
                onClick={() => abrirCerrarModalEditProduct(params.row.id)}
              />
            </div>
          </div>
        );
      }
    },
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'nombre',
      headerName: 'Nombre',
      width: 150,
      editable: false,
    },
    {
      field: 'categoryId',
      headerName: 'Categoria',
      width: 80,
      editable: false,
    },
    {
      field: 'subcategoryId',
      headerName: 'Subcategoria',
      width: 80,
      editable: false,
    },
    {
      field: 'precio',
      headerName: 'Precio',
      type: 'number',
      width: 110,
      editable: false,
    },
    {
      field: 'descripcion',
      headerName: 'Descripción',
      width: 250,
      editable: false,
    },
    {
      field: 'stock',
      headerName: 'Stock',
      type: 'number',
      width: 110,
      editable: false,
    },

    {
      field: 'imagen',
      headerName: 'Imagen',
      width: 350,

      renderCell: (params) => {
        if (params.row.imagenes.length > 0) {
          return (
            <div>
              {params.row.imagenes.map((imagen, index) => (
                <img
                  key={index}
                  src={imagen.url}
                  alt={`Imagen de ${params.row.nombre}`}
                  style={{ width: 50, height: 50, marginRight: 5 }}
                />
              ))}
            </div>
          );
        } else {
          return <span>No imagen</span>;
        }
      },
    },
  ];



  const { modoOscuro } = useContext(AuthContext)

  const [users, setUsers] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);

  const navigate = useNavigate();

  //CONST PRODUCT
  const [products, setProducts] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalInsertarProduct, setModalInsertarProduct] = useState(false);

  const [modalEditImgProduct, setModalEditImgProduct] = useState(false);

  const [modalEditProduct, setModalEditProduct] = useState(false);
  const [modalDeleteProduct, setModalDeleteProduct] = useState(false);
  const [idProducto, setIdProducto] = useState("");

  const [productEdit, setProductEdit] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    stock: '',
  });

  const [productEditImg, setProductEditImg] = useState({
    imagenes: []
  });
  const [productAdd, setproductAdd] = useState({

    nombre: '',
    categoryId: '',
    subcategoryId: '',
    precio: '',
    descripcion: '',
    stock: '',


  })


  const handleChangeProductEdit = e => {

    const { name, value } = e.target;
    setProductEdit(prevState => ({
      ...prevState,
      [name]: value
    }))
  }
  const handleChangeProduct = e => {

    const { name, value } = e.target;
    setproductAdd(prevState => ({
      ...prevState,
      [name]: value
    }))

  }
  const abrirCerrarModalInsertarProduct = () => {
    setModalInsertarProduct(!modalInsertarProduct);
  }

  const abrirCerrarModalDeleteProduct = (productId) => {

    setModalDeleteProduct(!modalDeleteProduct);

    setIdProducto(productId)
    // Si hay un elemento seleccionado, establece modalEditProduct en función de sus valores

  };
  const abrirCerrarModalEditProduct = (productId) => {

    setModalEditProduct(!modalEditProduct);
    setSelectedProduct(productId);
    setIdProducto(productId)
    // Si hay un elemento seleccionado, establece modalEditProduct en función de sus valores
    if (productId) {
      const selectedProductData = products.find((product) => product.id === productId);

      // console.log(selectedProductData)
      if (selectedProductData) {
        setProductEdit({
          nombre: selectedProductData.nombre,
          precio: selectedProductData.precio,
          descripcion: selectedProductData.descripcion,
          stock: selectedProductData.stock,
          imagenes: selectedProductData.imagenes
        });
      }
    }
  };

  const abrirCerrarModalImgProduct = (productId) => {
    setModalEditImgProduct(!modalEditImgProduct);

    const selectedProductDataImg = products.find((product) => product.id === productId);

    // console.log(selectedProductData)
    if (selectedProductDataImg) {
      setProductEditImg({
        imagenes: selectedProductDataImg.imagenes,

      });
    }
  }


  const Auth = useContext(AuthContext);

  useEffect(() => {
    if (Auth.auth.role !== 'Admin') {
      navigate('/');
    }
  }, [Auth]);

  useEffect(() => {
    console.log(config)
    obtenerUsuarios();
    obtenerProductos();
    obtenerCategoria();
    obtenerSubCategoria();

    // console.log(products)

  }, []);



  // const token = localStorage.getItem("_id");
  // const config = {
  //   headers: {
  //     'Authorization': `Bearer ${token}` // Agrega el token JWT en la cabecera de autorización
  //   }
  // };


  //CRUD USER
  const obtenerUsuarios = async () => {
    try {
      const response = await axios.get('https://tpibarbershop20231015224614.azurewebsites.net/api/Usuarios/Admin', config);

      setUsers(response.data);

    } catch (error) {


      navigate('/');


      console.error(error);
    }
  };
  //CRUD CATEGORY
  const obtenerCategoria = async () => {
    try {
      const response = await axios.get('https://tpibarbershop20231015224614.azurewebsites.net/api/Category', config);
      const CategoryData = response.data
      setCategory(CategoryData);

    } catch (error) {
      console.error(error);
    }
  };
  //CRUD SUBCATEGORY
  const obtenerSubCategoria = async () => {
    try {
      const response = await axios.get('https://tpibarbershop20231015224614.azurewebsites.net/api/SubCategory', config);
      const SubCategoryData = response.data.map((user, index) => ({
        ...user,

      }));
      setSubCategory(SubCategoryData);

    } catch (error) {
      console.error(error);
    }
  };


  //CRUD PRODUCT
  const obtenerProductos = async () => {

    // Realiza la solicitud GET con el token JWT
    try {
      const response = await axios.get('https://tpibarbershop20231015224614.azurewebsites.net/api/productos', config);
      // console.log(response)
      const productData = response.data.map((product, index) => ({
        ...product,

      }));
      setProducts(productData);
    } catch (error) {
      console.error(error);
    }
  };
  const productPost = async () => {
    try {
      const response = await axios.post(
        'https://tpibarbershop20231015224614.azurewebsites.net/api/Productos',
        {
          nombre: productAdd.nombre,
          categoryId: productAdd.categoryId,
          subcategoryId: productAdd.subcategoryId,
          precio: productAdd.precio,
          descripcion: productAdd.descripcion,
          stock: productAdd.stock,
        },
        config // Agrega el encabezado con el token JWT
      );

      // Luego de realizar la solicitud POST, puedes actualizar la lista de productos
      obtenerProductos(); // Reutiliza la función que ya tienes para obtener productos
      abrirCerrarModalInsertarProduct(); // Reutiliza el product
    } catch (error) {
      console.error(error);
    }
  };
  const productPut = async () => {

    try {
      const response = await axios.put(
        `https://tpibarbershop20231015224614.azurewebsites.net/api/Productos/${idProducto}/Admin`,
        {
          nombre: productEdit.nombre,
          precio: productEdit.precio,
          stock: productEdit.stock,
          descripcion: productEdit.descripcion,
        },
        config // Agrega el encabezado con el token JWT
      );
      if (response.status === 204) {
        toast.success('Producto editado correctamente', {
          position: 'top-right', // Puedes personalizar la posición
          autoClose: 3000, // El tiempo en milisegundos que el toast permanecerá visible
        });
      }
      // Luego de realizar la solicitud POST, puedes actualizar la lista de productos
      obtenerProductos(); // Reutiliza la función que ya tienes para obtener productos
      abrirCerrarModalEditProduct(); // Reutiliza el product

    } catch (error) {
      console.error(error);
    }
  };
  const productDelete = async () => {
    try {
      const response = await axios.delete(
        `https://tpibarbershop20231015224614.azurewebsites.net/api/Productos/${idProducto}/Admin`,
        config // Agrega el encabezado con el token JWT
      );
      if (response.status === 204) {
        toast.success('Imagen eliminada correctamente', {
          position: 'top-right', // Puedes personalizar la posición
          autoClose: 3000, // El tiempo en milisegundos que el toast permanecerá visible
        });
      }
      // Luego de realizar la solicitud POST, puedes actualizar la lista de productos
      obtenerProductos(); // Reutiliza la función que ya tienes para obtener productos
      abrirCerrarModalDeleteProduct(); // Reutiliza el product

    } catch (error) {
      console.error(error);
    }
  };


  const DeleteImgProduct = async (idProductoImagen) => {
    try {
      const response = await axios.delete(
        `https://tpibarbershop20231015224614.azurewebsites.net/api/Imagenes/Producto/${idProductoImagen}`,
        config // Agrega el encabezado con el token JWT
      );
      if (response.status === 204) {
        toast.success('Producto eliminado correctamente', {
          position: 'top-right', // Puedes personalizar la posición
          autoClose: 3000, // El tiempo en milisegundos que el toast permanecerá visible
        });
      }
      // Luego de realizar la solicitud POST, puedes actualizar la lista de productos
      obtenerProductos(); // Reutiliza la función que ya tienes para obtener productos
      abrirCerrarModalImgProduct(); // Reutiliza el product
    } catch (error) {
      console.error(error);
    }
  };

  const productImgPost = async (archivo) => {
    try {
      var reader = new FileReader();

      reader.readAsDataURL(archivo);

      reader.onload = async () => {
        const base64 = reader.result.split(',')[1]; // Remove the prefix
        console.log(base64);
        try {
          const response = await axios.post(
            'https://tpibarbershop20231015224614.azurewebsites.net/api/Imagenes/Producto/Admin',
            {
              productoId: idProducto, // Asegúrate de que idProducto sea correcto
              base64: base64,
            },
            config // Agrega el encabezado con el token JWT
          );

          if (response.status === 200) {
            toast.success('Imagen Añadida correctamente', {
              position: 'top-right',
              autoClose: 3000,
            });

            // Luego de realizar la solicitud POST, puedes actualizar la lista de productos
            obtenerProductos(); // Asegúrate de que esta función sea válida y funcional
          }
        } catch (error) {

          toast.error("El tamaño del archivo Base64 excede el límite de 1 MB.", {
            position: 'top-right',
            autoClose: 3000,
          });

        }
      };
    } catch (error) {
      console.error(error);
      toast.error("ERROR", {
        position: 'top-right',
        autoClose: 3000,
      });
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
          <Button onClick={abrirCerrarModalInsertarProduct}>Insertar</Button>
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={products}
              columns={productosColumns}
              autoPageSize
              // checkboxSelection
              disableColumnSelector
              disableColumnMenu
            // editable={{
            //   onRowAdd: (newRow) => new Promise((resolve, reject) => {
            //     console.log(newRow);
            //   })
            // }}

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
      <Modal
        open={modalInsertarProduct}
        OnClose={abrirCerrarModalInsertarProduct}
      >
        <BodyProduct
          handleChangeProduct={handleChangeProduct}
          productPost={productPost}
          abrirCerrarModalInsertarProduct={abrirCerrarModalInsertarProduct}
        />
      </Modal>
      <Modal
        open={modalEditProduct}
        OnClose={abrirCerrarModalEditProduct}
      >
        <BodyProductEdit
          handleChangeProduct={handleChangeProductEdit}
          abrirCerrarModalProduct={abrirCerrarModalEditProduct}
          abrirCerrarModalImgProduct={abrirCerrarModalImgProduct}

          productPost={productPut}
          productEdit={productEdit}
          idProducto={idProducto}
          abrirCerrarModalEditProduct={abrirCerrarModalEditProduct}
        />
      </Modal>

      <Modal
        open={modalEditImgProduct}
        OnClose={abrirCerrarModalImgProduct}
      >
        <BodyProductImg

          handleChangeProduct={handleChangeProductEdit}
          abrirCerrarModalImgProduct={abrirCerrarModalImgProduct}
          // productPost={productPut}
          DeleteImgProduct={DeleteImgProduct}
          productEdit={productEdit}
          idProducto={idProducto}
          productImgPost={productImgPost}

        />
      </Modal>

      <Modal
        open={modalDeleteProduct}
        OnClose={abrirCerrarModalDeleteProduct}
      >
        <BodyDeleteProduct
          productDelete={productDelete}
          productId={idProducto}
          abrirCerrarModalDeleteProduct={abrirCerrarModalDeleteProduct}

        />
      </Modal>
      <ToastContainer />
    </div>

  );
};

export default AdminComponent;