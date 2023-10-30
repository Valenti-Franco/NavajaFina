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

export const postDeleteOrdenCompra = async (idOrdenCompra) => {

    try {
        const response = await axios.delete(
            `https://tpibarbershop20231015224614.azurewebsites.net/api/OrdenCompras/${idOrdenCompra}`,
            config // Agrega el encabezado con el token JWT
        );
        if (response.status === 204) {
            toast.success('Orden de Compras eliminada correctamente', {
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
export const obtenerOrdenCompras = async ({ setOrdenCompras, processOrdenData, setChartOrdenData }) => {
    try {
        const response = await axios.get('https://tpibarbershop20231015224614.azurewebsites.net/api/OrdenCompra', config);
        const ComprasData = response.data.map((user, index) => ({
            ...user,

        }));
        setOrdenCompras(ComprasData);
        processOrdenData(ComprasData)
            .then(result => {
                // Hacer algo con el resultado, por ejemplo, pasar los datos a un componente
                setChartOrdenData(result);

            })
            .catch(error => {
                // Manejar cualquier error que pueda ocurrir durante el procesamiento de datos
            });

    } catch (error) {
        console.error(error);
    }
};



const postConfirmarOrdenCompra = async (idOrdencompra) => {

    try {
        const response = await axios.put(

            `https://tpibarbershop20231015224614.azurewebsites.net/api/OrdenCompras/${idOrdencompra}/ConfirmarOrdenCompra/Admin`,
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



export const ordenComprasColumns = [
    {
        field: 'Confirmar',
        renderCell: (params) => {
            // Verifica si el estado es 'confirmado' y deshabilita el botón de cancelación en consecuencia
            const isConfirmado = params.row.estado === 'pendiente';
            return (
                <div className={style.acciones}>
                    <div>
                        {isConfirmado ? (
                            <div className={style.acciones}>

                                <div>
                                    <Fab variant="extended" size="small" color="primary">
                                        <MdEdit className={style.btnMoney}
                                            onClick={() => postConfirmarOrdenCompra(params.row.id)}
                                        />
                                    </Fab>
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
                                onClick={() => postDeleteOrdenCompra(params.row.id)}


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
    {
        field: 'fechaPago',
        headerName: 'Fecha del Pago',
        type: 'number',
        width: 110,
        editable: false,
    },


];