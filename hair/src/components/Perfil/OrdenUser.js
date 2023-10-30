import React, { useContext, useEffect, useState } from 'react'
import style from './index.module.css';
import { MdAttachMoney, MdCheck, MdDelete, MdRefresh } from 'react-icons/md';
import axios from 'axios';
import { AuthContext } from '../../context/Auth';
import { Box, Button } from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';
// { postPaypalCompra, obtenerCompras, compras, setCompras, postDeleteCompra }
const OrdenUser = ({ obtenerOrden, orden, postDeleteOrden, postPaypalOrden }) => {
    const { modoOscuro } = useContext(AuthContext)

    const Auth = useContext(AuthContext);

    // useEffect(() => {
    //   if (Auth.auth.role !== 'Admin') {
    //     navigate('/');
    //   }
    // }, [Auth]);
    // console.log(orden)

    const productosColumns = [
        {
            field: 'PAGAR',
            renderCell: (params) => {
                // Verifica si el estado es 'confirmado' y deshabilita el botón de cancelación en consecuencia
                const isConfirmado = params.row.valorPago === 'null';
                return (
                    <div className={style.acciones}>
                        <div>
                            {isConfirmado ? (
                                <div className={style.acciones}>

                                    <div>
                                        <MdAttachMoney className={style.btnMoney}
                                            onClick={() => postPaypalOrden(params.row.id)}
                                        />
                                    </div>
                                </div>
                            ) : <MdCheck style={{ background: "#fff", padding: "5px", borderRadius: "5px" }} />}

                        </div>
                    </div>
                );
            }
        },
        {
            field: 'Cancelar',
            renderCell: (params) => {
                // Verifica si el estado es 'confirmado' y deshabilita el botón de cancelación en consecuencia
                const isConfirmado = params.row.valorPago === 'null';
                return (
                    <div className={style.acciones}>
                        <div>
                            {isConfirmado ? (
                                <MdDelete
                                    className={style.btnDelete}
                                    onClick={() => postDeleteOrden(params.row.id)}


                                />
                            ) : <MdCheck style={{ background: "#fff", padding: "5px", borderRadius: "5px" }} />}

                        </div>
                    </div>
                );
            }
        },

        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'estado',
            headerName: 'Estado',
            width: 150,
            editable: false,
        },


        {
            field: 'total',
            headerName: 'Total',
            width: 150,
            editable: false,
        },
        {
            field: 'valorPago',
            headerName: 'Tu Pago',
            width: 150,
            editable: false,
        },
        {
            field: 'clientePaypalId',
            headerName: 'Tu Id PayPal',
            width: 150,
            editable: false,
        },
        {
            field: 'fechaPago',
            headerName: 'Fecha del Pago',
            type: 'number',
            width: 110,
            editable: false,
        },

        // {
        //     field: 'imagen',
        //     headerName: 'imagenes',
        //     width: 350,

        //     renderCell: (params) => {
        //         if (params.row.producto.imagenes.length > 0) {
        //             return (
        //                 <div>
        //                     {params.row.producto.imagenes.map((imagen, index) => (
        //                         <img
        //                             key={index}
        //                             src={imagen.url}
        //                             alt={`Imagen de ${params.row.nombre}`}
        //                             style={{ width: 50, height: 50, marginRight: 5 }}
        //                         />
        //                     ))}
        //                 </div>
        //             );
        //         } else {
        //             return <span>No imagen</span>;
        //         }
        //     },
        // },
    ];
    const token = localStorage.getItem("_id");
    const config = {
        headers: {
            'Authorization': `Bearer ${token}` // Agrega el token JWT en la cabecera de autorización
        }
    };



    useEffect(() => {

        obtenerOrden();
        // console.log(compras)
        // console.log(products)

    }, []);

    return (

        <div className={style.Container + (!modoOscuro ? ' ' + style.AdminContainerDark : '')}>
            <h1 className={style.title}>Mis Orden de Compra  <MdRefresh onClick={obtenerOrden} style={{ cursor: "pointer" }} /></h1>
            {/* <Button onClick={abrirCerrarModalInsertarProduct}>Insertar</Button> */}
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={orden}
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
    )
}

export default OrdenUser