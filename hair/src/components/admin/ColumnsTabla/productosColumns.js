
import axios from 'axios';
import style from '../index.module.css';
import { toast } from 'react-toastify';
import { MdCheck, MdDelete, MdEdit } from 'react-icons/md';
import { Avatar } from '@mui/material';



export const productosColumns = (abrirCerrarModalDeleteProduct, abrirCerrarModalEditProduct) => [
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
            if (params.row.imagenes?.length > 0) {
                return (
                    <div style={{ display: "flex" }}>
                        {params.row.imagenes.map((imagen, index) => (
                            <Avatar
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