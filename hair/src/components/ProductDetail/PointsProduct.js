import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import style from './index.module.css';
import Typography from '@mui/material/Typography';
import formatTimeDifference from './formatTimeDifference';
import axios from 'axios';
import config from '../../utils/Config';
import { MdOutlineReportProblem } from 'react-icons/md';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/Auth';

export default function PointsProduscts({ puntos }) {

    const { modoOscuro } = useContext(AuthContext)

    const [userAvatars, setUserAvatars] = useState({});

    const obtenerImagenUsuario = async (usuarioId) => {
        try {
            const response = await axios.get(`https://tpibarbershop20231015224614.azurewebsites.net/api/Imagenes/ImagenesUsuarios/${usuarioId}`);
            const avatarUrl = response.data.url;

            setUserAvatars((prevAvatars) => ({
                ...prevAvatars,
                [usuarioId]: avatarUrl,
            }));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // Fetch avatars for each user
        puntos.forEach((punto) => {
            if (!userAvatars[punto.usuarioId]) {
                obtenerImagenUsuario(punto.usuarioId);
            }
        });
        // console.log(userAvatars)
    }, []);
    // console.log(puntos.length)

    return (
        <List className={style.Lista + (!modoOscuro ? ' ' + style.containerPeinadosDark : '')}>
            <h1>Estrellas Enviadas del Producto </h1>
            {
                puntos.length === 0 ? (
                    <h4 className={style.notStart} >No hay Estrellas disponibles <MdOutlineReportProblem style={{ fontSize: "38px", color: "red" }} />  </h4>

                ) : (
                    puntos.map((punto, index) => (

                        <div key={index}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt={punto.nombre}
                                        src={userAvatars[punto.usuarioId]}
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={<React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body1"
                                            color="text.primary"
                                        >
                                            {"Envío "}
                                            {punto.puntos}
                                            {punto.puntos === 1 ?
                                                " Estrella "
                                                : " Estrellas"
                                            }
                                        </Typography>

                                    </React.Fragment>
                                    }
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline', fontSize: "18px", fontWeight: "600" }}
                                                component="span"
                                                variant="body4"
                                                color="text.primary"

                                            >
                                                {punto.nombre}
                                            </Typography>
                                            {" | hace "}
                                            {formatTimeDifference(punto.fechaPublicado)}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </div>
                    )))}


        </List>
    );
}