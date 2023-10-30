import axios from 'axios';
import style from '../index.module.css';
import { toast } from 'react-toastify';
import { MdCheck, MdDelete, MdEdit } from 'react-icons/md';
import { Avatar } from '@mui/material';


const token = localStorage.getItem("_id");
const config = {
    headers: {
        'Authorization': `Bearer ${token}` // Agrega el token JWT en la cabecera de autorización
    }
};




export const usuariosColumns = (abrirCerrarModalDeleteUsuario, abrirCerrarModalEditUsuario) => [
    {
        field: 'Acciones',
        renderCell: (params) => {

            return (
                <div className={style.acciones}>
                    <div>
                        <MdDelete
                            className={style.btnDelete}
                            onClick={() => abrirCerrarModalDeleteUsuario(params.row.id)}
                        />
                    </div>
                    <div>
                        <MdEdit className={style.btnEdit}
                            onClick={() => abrirCerrarModalEditUsuario(params.row.id)}
                        />
                    </div>
                </div>
            );
        }
    },
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'imagen',
        headerName: 'Imagen',
        width: 150,

        renderCell: (params) => {
            // console.log(params.row)
            if (params.row.imagen !== null) {
                return (
                    <div>

                        <Avatar
                            key={params.row.imagen.id}
                            src={params.row.imagen.url}
                            alt={`Imagen de ${params.row.nombre}`}
                            style={{ width: 50, height: 50, marginRight: 5 }}
                        />

                    </div>
                );
            } else {
                return (
                    <Avatar
                        key={params.row.id}
                        // src={params.row.imagen.url}
                        alt={`Imagen de ${params.row.nombre}`}
                        style={{ width: 50, height: 50 }}
                    />
                )
            }
        },
    },

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