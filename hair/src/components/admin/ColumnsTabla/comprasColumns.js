import axios from 'axios';
import style from '../index.module.css';
import { toast } from 'react-toastify';
import { MdCheck, MdDelete, MdEdit } from 'react-icons/md';
import { Fab } from '@material-ui/core';


const token = localStorage.getItem("_id");
const config = {
    headers: {
        'Authorization': `Bearer ${token}` // Agrega el token JWT en la cabecera de autorización
    }
};

export const postDeleteCompra = async (idCompra) => {
    console.log(idCompra)
    try {
        const response = await axios.delete(
            `https://tpibarbershop20231015224614.azurewebsites.net/api/Compras/${idCompra}`,
            config // Agrega el encabezado con el token JWT
        );
        if (response.status === 204) {
            toast.success('Compra eliminada correctamente', {
                position: 'top-right', // Puedes personalizar la posición
                autoClose: 3000, // El tiempo en milisegundos que el toast permanecerá visible
            });
        }
        // // Luego de realizar la solicitud POST, puedes actualizar la lista de productos
        //      obtenerCompras({
        //   setCompras, // Asegúrate de que setCompras sea la función apropiada
        //   processData,
        //   setChartData
        // }); // Reutiliza la función que ya tienes para obtener productos
        // // abrirCerrarModalDeleteUsuario(); // Reutiliza el product

    } catch (error) {
        console.error(error);
    }
};

export const obtenerCompras = async ({ setCompras, processData, setChartData }) => {
    try {
        const response = await axios.get('https://tpibarbershop20231015224614.azurewebsites.net/api/Compras/Admin', config);
        const ComprasData = response.data.map((user, index) => ({
            ...user,

        }));
        setCompras(ComprasData);
        processData(ComprasData)
            .then(result => {
                // Hacer algo con el resultado, por ejemplo, pasar los datos a un componente
                setChartData(result);

            })
            .catch(error => {
                // Manejar cualquier error que pueda ocurrir durante el procesamiento de datos
            });

    } catch (error) {
        console.error(error);
    }
};


const postConfirmarCompra = async (idcompra) => {

    try {
        const response = await axios.put(

            `https://tpibarbershop20231015224614.azurewebsites.net/api/Compras/${idcompra}/ConfirmarCompra/Admin`,
            {

            },
            config // Agrega el encabezado con el token JWT
        );

        toast.success('Compra Confirmada', {
            position: 'top-right', // Puedes personalizar la posición
            autoClose: 3000, // El tiempo en milisegundos que el toast permanecerá visible
        });

        // Luego de realizar la solicitud POST, puedes actualizar la lista de productos
        // obtenerCompras(); // Reutiliza la función que ya tienes para obtener productos
        // abrirCerrarModalInsertarProduct(); // Reutiliza el product
    } catch (error) {
        console.error(error);
    }
};



export const comprasColumns = [
    {
        field: 'PAGAR',
        renderCell: (params) => {
            // Verifica si el estado es 'confirmado' y deshabilita el botón de cancelación en consecuencia
            const isConfirmado = params.row.estado === 'pendiente';
            return (
                <div className={style.acciones}>
                    <div>
                        {isConfirmado ? (
                            <div className={style.acciones}>
                                <Fab variant="extended" size="small" color="primary">

                                    <MdEdit className={style.btnMoney}
                                        onClick={() => postConfirmarCompra(params.row.id)}
                                    />
                                </Fab>
                                <div>

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
                                onClick={() => postDeleteCompra(params.row.id)}


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


];