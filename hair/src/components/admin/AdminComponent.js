import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./index.module.css";
import { AuthContext } from "../../context/Auth";
import axios from "axios";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from "@mui/x-data-grid";
import { MdAttachMoney, MdCheck, MdDelete, MdEdit } from "react-icons/md";
import { Modal, Button, TextField, Avatar } from "@material-ui/core";
import BodyProduct from "./ModalProduct/BodyProduct";
import BodyProductEdit from "./ModalProduct/BodyProductEdit";
import { ToastContainer, toast } from "react-toastify";
import BodyDeleteProduct from "./ModalProduct/BodyDeleteProduct";
import BodyProductImg from "./ModalProduct/BodyProductImg";
import BodyDeleteUser from "./ModalUser/BodyDeleteUser";
import BodyUsuarioEdit from "./ModalUser/BodyUsuarioEdit";

// import config from '../../utils/Config';

import BodyCategory from "./BodyCategory";
import BodyCategoryDelete from "./BodyCategoryDelete";
import BodyCategoryEdit from "./BodyCategoryEdit";
import BodyDeleteSubcategory from "./BodyDeleteSubcategory";
import BodySubCategoryEdit from "./BodySubCategoryEdit";
import BodySubCategory from "./BodySubCategory";

import { createChart } from "lightweight-charts";
import { ChartComponent, processData } from "./GraficaCompra";

import { comprasColumns, obtenerCompras } from "./ColumnsTabla/comprasColumns";
import { usuariosColumns } from "./ColumnsTabla/usuariosComuns";
import { productosColumns } from "./ColumnsTabla/productosColumns";
import { ChartOrdenComponent, processOrdenData } from "./GraficaOrdenCompra";
import {
  obtenerOrdenCompras,
  ordenComprasColumns,
} from "./ColumnsTabla/ordenComprasColumns";
const token = localStorage.getItem("_id");

const config = {
  headers: {
    Authorization: `Bearer ${token}`, // Agrega el token JWT en la cabecera de autorización
  },
};

const AdminComponent = () => {
  const { modoOscuro } = useContext(AuthContext);

  // const [users, setUsers] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [compras, setCompras] = useState([]);
  const [ordenCompras, setOrdenCompras] = useState([]);

  const navigate = useNavigate();

  //CONST PRODUCT
  const [products, setProducts] = useState([]);
  const [usuario, setUsuarios] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [chartOrdenData, setChartOrdenData] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [selectedSubCategory, setSelectedSubcategory] = useState(null);

  const [modalInsertarProduct, setModalInsertarProduct] = useState(false);

  const [modalEditImgProduct, setModalEditImgProduct] = useState(false);

  const [modalEditProduct, setModalEditProduct] = useState(false);
  const [modalEditUsuario, setModalEditUsuario] = useState(false);

  const [modalDeleteProduct, setModalDeleteProduct] = useState(false);
  const [modalDeleteUsuario, setModalDeleteUsuario] = useState(false);

  const [idProducto, setIdProducto] = useState("");
  const [idUsuario, setIdUsuario] = useState("");

  const [productEdit, setProductEdit] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    stock: "",
  });
  const [usuarioEdit, setUsuarioEdit] = useState({
    role: "",
  });

  const [productEditImg, setProductEditImg] = useState({
    imagenes: [],
  });
  const [productAdd, setproductAdd] = useState({
    nombre: "",
    categoryId: "",
    subcategoryId: "",
    precio: "",
    descripcion: "",
    stock: "",
  });
  const [categoryAdd, setCategoryAdd] = useState({
    nombre: "",
    descripcion: "",
    fechaPublicado: "",
    subcategory: "",
    subcategoryId: "",
  });

  const [categoryEdit, setCategoryEdit] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    fechaPublicado: "",
  });
  //edit

  const [modalEditCategory, setModalEditCategory] = useState(false);
  const [id, setId] = useState("");
  const [idCategory, setIdCategory] = useState("");
  //delete

  const [modalDeleteCategory, setModalDeleteCategory] = useState(false);

  const handleChangesubCategoryEdit = (e) => {
    const { name, value } = e.target;

    setsubCategoryEdit((prevState) => ({
      ...prevState,
      [name]: value,
    }));

  };
  const handleChangesubCategory = (e) => {
    const { name, value } = e.target;
    setsubCategoryAdd((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [subCategoryAdd, setsubCategoryAdd] = useState({
    nombre: "",
    categoryId: "",
  });

  const [subCategoryEdit, setsubCategoryEdit] = useState({
    nombre: "",
    categoryId: "",
  });

  const [modalEditsubCategory, setModalEditsubCategory] = useState(false);
  const [modalInsertarsubCategory, setModalInsertarsubCategory] =
    useState(false);
  const [idsubCategory, setIdsubCategory] = useState("");
  const [modalDeletesubCategory, setModalDeletesubCategory] = useState(false);

  const abrirCerrarModalInsertarsubCategory = () => {
    setModalInsertarsubCategory(!modalInsertarsubCategory);
  };

  const abrirCerrarModalDeleteCategory = (categoryId) => {
    setModalDeleteCategory(!modalDeleteCategory);

    setIdCategory(categoryId);
    // Si hay un elemento seleccionado, establece modalEditProduct en función de sus valores
  };



  const abrirCerrarModalDeletesubCategory = (subCategoryId) => {
    setModalDeletesubCategory(!modalDeletesubCategory);

    setIdsubCategory(subCategoryId);
    // Si hay un elemento seleccionado, establece modalEditProduct en función de sus valores
  };

  const abrirCerrarModalEditsubCategory = (subCategoryId) => {
    setModalEditsubCategory(!modalEditsubCategory);
    setSelectedSubcategory(subCategoryId);
    setIdsubCategory(subCategoryId)

    // Si hay un elemento seleccionado, establece modalEditProduct en función de sus valores
    if (subCategoryId) {
      const selectedsubCategoryData = subcategory.find(
        (subCategory) => subCategory.id === subCategoryId
      );

      // console.log(selectedProductData)
      if (selectedsubCategoryData) {
        setsubCategoryEdit({
          nombre: selectedsubCategoryData.nombre,
          categoryId: selectedsubCategoryData.categoryId
        });
      }
    }
  };

  const categoryColumns = [
    {
      field: "Acciones",
      renderCell: (params) => {
        return (
          <div className={style.acciones}>
            <div>
              <MdDelete
                className={style.btnDelete}
                onClick={() => abrirCerrarModalDeleteCategory(params.row.id)}
              />
            </div>
            <div>
              <MdEdit
                className={style.btnEdit}
                onClick={() => openCloseModalEditCategory(params.row.id)}
              />
            </div>
          </div>
        );
      },
    },
    { field: "id", headerName: "ID", width: 90 },

    {
      field: "nombre",
      headerName: "Nombre",

      width: 150,
      editable: false,
    },
    {
      field: "descripcion",
      headerName: "Descripción",

      width: 250,
      editable: false,
    },
  ];

  const subCategoryColumns = [
    {
      field: "Acciones",
      renderCell: (params) => {
        return (
          <div className={style.acciones}>
            <div>
              <MdDelete
                className={style.btnDelete}
                onClick={() => abrirCerrarModalDeletesubCategory(params.row.id)}
              />
            </div>
            <div>
              <MdEdit
                className={style.btnEdit}
                onClick={() => abrirCerrarModalEditsubCategory(params.row.id)}
              />
            </div>
          </div>
        );
      },
    },
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "nombre",
      headerName: "Nombre",
      width: 150,
      editable: false,
    },

    {
      field: "categoryId",
      headerName: "Categoria",
      width: 250,
      editable: false,
    },
  ];

  const handleChangeCategory = (e) => {
    const { name, value } = e.target;
    setCategoryAdd((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeCategoryEdit = (e) => {
    const { name, value } = e.target;
    setCategoryEdit((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [selectedCategory, setSelectedCategory] = useState(null);

  const openCloseModalEditCategory = (idCategory) => {
    setModalEditCategory(!modalEditCategory);
    setSelectedCategory(idCategory);
    setIdCategory(idCategory);
    if (idCategory) {
      const selectedCategoryData = category.find(
        (category) => category.id === idCategory
      );
      // console.log(usuario)

      console.log(selectedCategoryData)
      if (selectedCategoryData) {
        setCategoryEdit({
          nombre: selectedCategoryData.nombre,
          descripcion: selectedCategoryData.descripcion,
        });
      }
    }
  };

  const [modalInsertCategory, setModalInsertCategory] = useState(false);

  const subCategoryPut = async () => {
    console.log(subCategoryEdit)

    try {
      const response = await axios.put(
        `https://tpibarbershop20231015224614.azurewebsites.net/api/SubCategory/${idsubCategory}/Admin`,
        {
          nombre: subCategoryEdit.nombre,
          categoryId: subCategoryEdit.categoryId
        },
        config // Agrega el encabezado con el token JWT
      );
      if (response.status === 204) {
        toast.success("subCategory editado correctamente", {
          position: "top-right", // Puedes personalizar la posición
          autoClose: 3000, // El tiempo en milisegundos que el toast permanecerá visible
        });
      }
      // Luego de realizar la solicitud POST, puedes actualizar la lista de productos
      obtenerSubCategoria(); // Reutiliza la función que ya tienes para obtener productos
      abrirCerrarModalEditsubCategory(); // Reutiliza el product
    } catch (error) {
      console.error(error);
    }
  };

  const subCategoryDelete = async () => {
    try {
      const response = await axios.delete(
        `https://tpibarbershop20231015224614.azurewebsites.net/api/SubCategory/${idsubCategory}/Admin`,
        config // Agrega el encabezado con el token JWT
      );
      if (response.status === 204) {
        toast.success("subCategoria eliminada correctamente", {
          position: "top-right", // Puedes personalizar la posición
          autoClose: 3000, // El tiempo en milisegundos que el toast permanecerá visible
        });
      }
      // Luego de realizar la solicitud POST, puedes actualizar la lista de productos
      obtenerSubCategoria(); // Reutiliza la función que ya tienes para obtener productos
      abrirCerrarModalDeletesubCategory(); // Reutiliza el product
    } catch (error) {
      console.error(error);
    }
  };

  const categoryDelete = async () => {
    try {
      const response = await axios.delete(
        `https://tpibarbershop20231015224614.azurewebsites.net/api/Category/${idCategory}/Admin`,
        config // Agrega el encabezado con el token JWT
      );
      if (response.status === 204) {
        toast.success("Categoria eliminada correctamente", {
          position: "top-right", // Puedes personalizar la posición
          autoClose: 3000, // El tiempo en milisegundos que el toast permanecerá visible
        });
      }
      // Luego de realizar la solicitud POST, puedes actualizar la lista de productos
      obtenerCategoria(); // Reutiliza la función que ya tienes para obtener productos
      abrirCerrarModalDeleteCategory(); // Reutiliza el product
    } catch (error) {
      console.error(error);
    }
  };

  ////////////////////////-----------------------------------------------------CATEGORIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAS----------------------------------------///////////////////////////

  const categoriaPut = async () => {
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
        toast.success("Producto editado correctamente", {
          position: "top-right", // Puedes personalizar la posición
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

  const categoryPost = async () => {
    try {
      const response = await axios.post(
        "https://tpibarbershop20231015224614.azurewebsites.net/api/Category/Admin",
        {
          nombre: categoryAdd.nombre,
          descripcion: categoryAdd.descripcion,
          fechaPublicado: categoryAdd.fechaPublicado,
          subcategory: categoryAdd.subcategory,
          subcategoryId: categoryAdd.subcategoryId,
        },
        config // Agrega el encabezado con el token JWT
      );

      // Luego de realizar la solicitud POST, puedes actualizar la lista de productos
      obtenerCategoria(); // Reutiliza la función que ya tienes para obtener productos
      openCloseModalInsertCategory();
      console.log(response); // Reutiliza el product
    } catch (error) {
      console.error(error);
    }
  };
  const openCloseModalInsertCategory = () => {
    setModalInsertCategory(!modalInsertCategory);
  };

  const categoryPut = async () => {
    try {
      const response = await axios.put(
        `https://tpibarbershop20231015224614.azurewebsites.net/api/Category/${idCategory}`,
        {
          nombre: categoryEdit.nombre,
          descripcion: categoryEdit.descripcion,
        },
        config // Agrega el encabezado con el token JWT
      );
      if (response.status === 204) {
        toast.success("Categoria editado correctamente", {
          position: "top-right", // Puedes personalizar la posición
          autoClose: 3000, // El tiempo en milisegundos que el toast permanecerá visible
        });
      }
      // Luego de realizar la solicitud POST, puedes actualizar la lista de productos
      obtenerCategoria(); // Reutiliza la función que ya tienes para obtener productos
      openCloseModalEditCategory(); // Reutiliza el product
    } catch (error) {
      console.error(error);
    }
  };

  const subcategoryPost = async () => {
    console.log(subCategoryAdd)
    try {
      const response = await axios.post(
        "https://tpibarbershop20231015224614.azurewebsites.net/api/SubCategory/Admin",
        {
          nombre: subCategoryAdd.nombre,
          categoryId: subCategoryAdd.categoryId,
        },
        config // Agrega el encabezado con el token JWT
      );

      // Luego de realizar la solicitud POST, puedes actualizar la lista de productos
      obtenerSubCategoria(); // Reutiliza la función que ya tienes para obtener productos
      abrirCerrarModalInsertarsubCategory(); // Reutiliza el product
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeUsuarioEdit = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setUsuarioEdit((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleChangeProductEdit = (e) => {
    const { name, value } = e.target;
    setProductEdit((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleChangeProduct = (e) => {
    const { name, value } = e.target;
    setproductAdd((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const abrirCerrarModalInsertarProduct = () => {
    setModalInsertarProduct(!modalInsertarProduct);
  };

  const abrirCerrarModalDeleteProduct = (productId) => {
    setModalDeleteProduct(!modalDeleteProduct);

    setIdProducto(productId);
    // Si hay un elemento seleccionado, establece modalEditProduct en función de sus valores
  };
  const abrirCerrarModalDeleteUsuario = (usuarioId) => {
    setModalDeleteUsuario(!modalDeleteUsuario);

    setIdUsuario(usuarioId);
    // Si hay un elemento seleccionado, establece modalEditProduct en función de sus valores
  };

  const abrirCerrarModalEditUsuario = (usuarioId) => {
    setModalEditUsuario(!modalEditUsuario);
    setSelectedUsuario(usuarioId);
    setIdUsuario(usuarioId);
    // Si hay un elemento seleccionado, establece modalEditusuario en función de sus valores
    if (usuarioId) {
      const selectedUsuarioData = usuario.find(
        (usuario) => usuario.id === usuarioId
      );
      // console.log(usuario)

      // console.log(selectedusuarioData)
      if (selectedUsuarioData) {
        setUsuarioEdit({
          role: selectedUsuarioData.role,
        });
      }
    }
  };
  const abrirCerrarModalEditProduct = (productId) => {
    setModalEditProduct(!modalEditProduct);
    setSelectedProduct(productId);
    setIdProducto(productId);
    // Si hay un elemento seleccionado, establece modalEditProduct en función de sus valores
    if (productId) {
      const selectedProductData = products.find(
        (product) => product.id === productId
      );

      // console.log(selectedProductData)
      if (selectedProductData) {
        setProductEdit({
          nombre: selectedProductData.nombre,
          precio: selectedProductData.precio,
          descripcion: selectedProductData.descripcion,
          stock: selectedProductData.stock,
          imagenes: selectedProductData.imagenes,
        });
      }
    }
  };

  const abrirCerrarModalImgProduct = (productId) => {
    setModalEditImgProduct(!modalEditImgProduct);

    const selectedProductDataImg = products.find(
      (product) => product.id === productId
    );

    // console.log(selectedProductData)
    if (selectedProductDataImg) {
      setProductEditImg({
        imagenes: selectedProductDataImg.imagenes,
      });
    }
  };

  const Auth = useContext(AuthContext);

  useEffect(() => {
    if (Auth.auth.role !== "Admin" && Auth.auth?.role !== "Editor") {
      navigate("/");
    }

    obtenerUsuarios();
    obtenerProductos();
    obtenerCategoria();
    obtenerSubCategoria();
    obtenerCompras({
      setCompras, // Asegúrate de que setCompras sea la función apropiada
      processData,
      setChartData,
    });

    obtenerOrdenCompras({
      setOrdenCompras, // Asegúrate de que setCompras sea la función apropiada
      processOrdenData,
      setChartOrdenData,
    });
  }, [Auth]);

  // console.log(usuario)

  //CRUD USER
  const obtenerUsuarios = async () => {
    try {
      const response = await axios.get(
        "https://tpibarbershop20231015224614.azurewebsites.net/api/Usuarios/Admin",
        config
      );

      setUsuarios(response.data);
    } catch (error) {
      if (Auth.auth.role !== "Admin" && Auth.auth?.role !== "Editor") {
        navigate("/");
      }

      console.error(error);
    }
  };
  //CRUD CATEGORY
  const obtenerCategoria = async () => {
    try {
      const response = await axios.get(
        "https://tpibarbershop20231015224614.azurewebsites.net/api/Category",
        config
      );
      const CategoryData = response.data;
      setCategory(CategoryData);
    } catch (error) {
      console.error(error);
    }
  };
  //CRUD SUBCATEGORY
  const obtenerSubCategoria = async () => {
    try {
      const response = await axios.get(
        "https://tpibarbershop20231015224614.azurewebsites.net/api/SubCategory",
        config
      );
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
      const response = await axios.get(
        "https://tpibarbershop20231015224614.azurewebsites.net/api/productos",
        config
      );
      // console.log(response)

      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const productPost = async () => {
    try {
      const response = await axios.post(
        "https://tpibarbershop20231015224614.azurewebsites.net/api/Productos",
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

  const usuarioPutAdmin = async () => {
    try {
      const response = await axios.put(
        `https://tpibarbershop20231015224614.azurewebsites.net/api/Usuarios/CrearAdmin/${idUsuario}`,
        {},
        config // Agrega el encabezado con el token JWT
      );
      if (response.status === 204) {
        toast.success("Usuario Modificado Con Rol Admin!", {
          position: "top-right", // Puedes personalizar la posición
          autoClose: 3000, // El tiempo en milisegundos que el toast permanecerá visible
        });
      }
      // Luego de realizar la solicitud POST, puedes actualizar la lista de productos
      obtenerUsuarios(); // Reutiliza la función que ya tienes para obtener productos
      abrirCerrarModalEditUsuario(); // Reutiliza el product
    } catch (error) {
      console.error(error);
    }
  };
  const usuarioPutEditor = async () => {
    try {
      const response = await axios.put(
        `https://tpibarbershop20231015224614.azurewebsites.net/api/Usuarios/CrearEditor/${idUsuario}`,
        {},
        config // Agrega el encabezado con el token JWT
      );
      if (response.status === 204) {
        toast.success("Usuario Modificado Con Rol Editor!", {
          position: "top-right", // Puedes personalizar la posición
          autoClose: 3000, // El tiempo en milisegundos que el toast permanecerá visible
        });
      }
      // Luego de realizar la solicitud POST, puedes actualizar la lista de productos
      obtenerUsuarios(); // Reutiliza la función que ya tienes para obtener productos
      abrirCerrarModalEditUsuario(); // Reutiliza el product
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
        toast.success("Producto editado correctamente", {
          position: "top-right", // Puedes personalizar la posición
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

  const usuarioDelete = async () => {
    try {
      const response = await axios.delete(
        `https://tpibarbershop20231015224614.azurewebsites.net/api/Usuarios/${idUsuario}/Admin`,
        config // Agrega el encabezado con el token JWT
      );
      if (response.status === 204) {
        toast.success("Usuario eliminado correctamente", {
          position: "top-right", // Puedes personalizar la posición
          autoClose: 3000, // El tiempo en milisegundos que el toast permanecerá visible
        });
      }
      // Luego de realizar la solicitud POST, puedes actualizar la lista de productos
      obtenerUsuarios(); // Reutiliza la función que ya tienes para obtener productos
      abrirCerrarModalDeleteUsuario(); // Reutiliza el product
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
        toast.success("Producto eliminado correctamente", {
          position: "top-right", // Puedes personalizar la posición
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
        toast.success("Producto eliminado correctamente", {
          position: "top-right", // Puedes personalizar la posición
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
        const base64 = reader.result.split(",")[1]; // Remove the prefix
        // console.log(base64);
        try {
          const response = await axios.post(
            "https://tpibarbershop20231015224614.azurewebsites.net/api/Imagenes/Producto/Admin",
            {
              productoId: idProducto, // Asegúrate de que idProducto sea correcto
              base64: base64,
            },
            config // Agrega el encabezado con el token JWT
          );

          if (response.status === 200) {
            toast.success("Imagen Añadida correctamente", {
              position: "top-right",
              autoClose: 3000,
            });

            // Luego de realizar la solicitud POST, puedes actualizar la lista de productos
            obtenerProductos(); // Asegúrate de que esta función sea válida y funcional
          }
        } catch (error) {
          toast.error(
            "El tamaño del archivo Base64 excede el límite de 1 MB.",
            {
              position: "top-right",
              autoClose: 3000,
            }
          );
        }
      };
    } catch (error) {
      console.error(error);
      toast.error("ERROR", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className={style.main + (!modoOscuro ? " " + style.mainDark : "")}>
      <div
        className={
          style.AdminContainer +
          (!modoOscuro ? " " + style.AdminContainerDark : "")
        }
      >
        {Auth.auth?.role !== "Editor" ? (
          <>
            <div className={style.Container}>
              <h1 className={style.title}>USUARIOS</h1>
              {/* <createChart style={{ height: 400, width: '100%' }} /> */}
              <Box sx={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={usuario}
                  columns={usuariosColumns(
                    abrirCerrarModalDeleteUsuario,
                    abrirCerrarModalEditUsuario
                  )}
                  autoPageSize
                  // checkboxSelection
                  disableColumnSelector
                  disableColumnMenu
                />
              </Box>
            </div>
          </>
        ) : null}

        <div className={style.Container}>
          <h1 className={style.title}>PRODUCTOS</h1>
          <Button onClick={abrirCerrarModalInsertarProduct}>Insertar</Button>
          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={products}
              columns={productosColumns(
                abrirCerrarModalDeleteProduct,
                abrirCerrarModalEditProduct
              )}
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

          <Button onClick={openCloseModalInsertCategory}>Insertar</Button>
          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={category}
              columns={categoryColumns}
              autoPageSize
              // checkboxSelection
              disableColumnSelector
              disableColumnMenu
            />
          </Box>
        </div>

        <div className={style.Container}>
          <h1 className={style.title}>SUBCATEGORIAS</h1>
          <Button onClick={abrirCerrarModalInsertarsubCategory}>
            Insertar
          </Button>
          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={subcategory}
              columns={subCategoryColumns}
              autoPageSize
              // checkboxSelection
              disableColumnSelector
              disableColumnMenu
            />
          </Box>
        </div>
        <div className={style.Container}>
          <h1 className={style.title}>COMPRAS</h1>
          {chartData.length ? (
            <ChartComponent
              style={{ height: 400, width: "100%" }}
              data={chartData}
            ></ChartComponent>
          ) : null}
          {/* <ChartComponent style={{ height: 400, width: '100%' }} data={initialData}></ChartComponent> */}
          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={compras}
              columns={comprasColumns}
              autoPageSize
              // checkboxSelection
              disableColumnSelector
              disableColumnMenu
            />
          </Box>
        </div>
        <div className={style.Container}>
          <h1 className={style.title}>ORDEN DE COMPRAS</h1>
          {chartData.length ? (
            <ChartOrdenComponent
              style={{ height: 400, width: "100%" }}
              data={chartOrdenData}
            ></ChartOrdenComponent>
          ) : null}
          {/* <ChartComponent style={{ height: 400, width: '100%' }} data={initialData}></ChartComponent> */}
          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={ordenCompras}
              columns={ordenComprasColumns}
              autoPageSize
              // checkboxSelection
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
      <Modal open={modalEditProduct} OnClose={abrirCerrarModalEditProduct}>
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

      <Modal open={modalEditImgProduct} OnClose={abrirCerrarModalImgProduct}>
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

      <Modal open={modalDeleteProduct} OnClose={abrirCerrarModalDeleteProduct}>
        <BodyDeleteProduct
          productDelete={productDelete}
          productId={idProducto}
          abrirCerrarModalDeleteProduct={abrirCerrarModalDeleteProduct}
        />
      </Modal>

      <Modal open={modalDeleteUsuario} OnClose={abrirCerrarModalDeleteUsuario}>
        <BodyDeleteUser
          usuarioDelete={usuarioDelete}
          usuarioId={idUsuario}
          abrirCerrarModalDeleteUsuario={abrirCerrarModalDeleteUsuario}
        />
      </Modal>

      <Modal open={modalEditUsuario} OnClose={abrirCerrarModalEditUsuario}>
        <BodyUsuarioEdit
          handleChangeUsuario={handleChangeUsuarioEdit}
          abrirCerrarModalUsuario={abrirCerrarModalEditUsuario}
          usuarioEdit={usuarioEdit}
          usuarioPutEditor={usuarioPutEditor}
          usuarioPutAdmin={usuarioPutAdmin}
          idUsuario={idUsuario}
          abrirCerrarModalEditUsuario={abrirCerrarModalEditUsuario}
        />
      </Modal>

      <Modal open={modalInsertCategory} onClose={openCloseModalInsertCategory}>
        <BodyCategory
          handleChangeCategory={handleChangeCategory}
          categoryPost={categoryPost}
          openCloseModalInsertCategory={openCloseModalInsertCategory}
        />
      </Modal>

      <Modal open={modalEditCategory} onClose={openCloseModalEditCategory}>
        <BodyCategoryEdit
          handleChangeCategoryEdit={handleChangeCategoryEdit}
          openCloseModalEditCategory={openCloseModalEditCategory}
          categoryPut={categoryPut}
          categoryEdit={categoryEdit}
          idCategory={idCategory}
          openCloseModalCategory={openCloseModalEditCategory}
        />
      </Modal>

      <Modal
        open={modalDeleteCategory}
        OnClose={abrirCerrarModalDeleteCategory}
      >
        <BodyCategoryDelete
          categoryDelete={categoryDelete}
          categoryId={idCategory}
          abrirCerrarModalDeleteCategory={abrirCerrarModalDeleteCategory}
        />
      </Modal>





      <Modal
        open={modalInsertarsubCategory}
        OnClose={abrirCerrarModalInsertarsubCategory}
      >
        <BodySubCategory
          subCategoryAdd={subCategoryAdd}
          handleChangesubCategory={handleChangesubCategory}
          subCategoryPost={subcategoryPost}
          abrirCerrarModalInsertarsubCategory={
            abrirCerrarModalInsertarsubCategory
          }
        />
      </Modal>
      <Modal
        open={modalEditsubCategory}
        OnClose={abrirCerrarModalEditsubCategory}
      >
        <BodySubCategoryEdit
          handleChangesubCategory={handleChangesubCategoryEdit}
          abrirCerrarModalEditsubCategory={abrirCerrarModalEditsubCategory}
          subcategoryPost={subCategoryPut}
          subCategoryEdit={subCategoryEdit}
          idsubCategory={idsubCategory}
        />
      </Modal>

      <Modal
        open={modalDeletesubCategory}
        OnClose={abrirCerrarModalDeletesubCategory}
      >
        <BodyDeleteSubcategory
          subCategoryDelete={subCategoryDelete}
          subCategoryId={idsubCategory}
          abrirCerrarModalDeletesubCategory={abrirCerrarModalDeletesubCategory}
        />
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default AdminComponent;
