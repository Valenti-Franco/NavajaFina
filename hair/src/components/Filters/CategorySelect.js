import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import styled from '@emotion/styled';
import style from './index.module.css';



const obtenerCategoria = async () => {
    try {
        const response = await axios.get('https://tpibarbershop20231015224614.azurewebsites.net/api/Category');
        return response.data.map((category) => ({
            id: category.id,
            nombre: category.nombre, // Utiliza el nombre de la categoría
        }));
    } catch (error) {
        console.error(error);
        return [];
    }
};



export default function CategorySelect({ handleCategoryChange, handlerCategoryClear }) {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            const categoryData = await obtenerCategoria(); // Obtén las categorías desde la API
            // console.log(categoryData);
            if (active) {
                setOptions(categoryData);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Autocomplete
            onChange={(event, value) => {
                if (value && value?.nombre) {
                    handleCategoryChange(value.id);
                } else {
                    handlerCategoryClear();
                }
            }}
            id="category"
            sx={{ width: 300 }}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            isOptionEqualToValue={(option, value) => option.nombre === value.nombre}
            getOptionLabel={(option) => option.nombre}
            options={options}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    className={style.Textfield}

                    {...params}
                    // label="Categoria"
                    placeholder='Categoria'
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}
