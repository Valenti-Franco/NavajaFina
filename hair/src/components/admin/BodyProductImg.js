import React from 'react'
import { Modal, Button, TextField, Card } from '@material-ui/core';
import style from './index.module.css';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import { MdDelete } from 'react-icons/md';



const BodyProductImg = ({ idProducto, productEdit, productImgPost, productPost, DeleteImgProduct, abrirCerrarModalImgProduct }) => {

    // console.log(productEdit)

    return (
        <div div className={style.modal} >

            <h3>Editar Imagenes</h3>

            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Swiper cssMode={true}
                        navigation={true}
                        pagination={true}
                        mousewheel={true}
                        keyboard={true}
                        modules={[Navigation, Pagination, Mousewheel, Keyboard]} className={style.mySwiper}>


                        {
                            productEdit.imagenes.length > 0 ? (
                                productEdit.imagenes.map(imagen => (
                                    <SwiperSlide className={style.swiperSlide}>


                                        <img style={{ height: "300px" }} src={imagen.url} key={imagen.id} />


                                        <MdDelete
                                            className={style.btnDelete}
                                            onClick={() => DeleteImgProduct(imagen.id)}
                                        />
                                    </SwiperSlide>
                                ))) : null}

                        <label htmlFor="image-input">
                            <h2
                                className={style.inputMaterial}
                                style={{ padding: " 50px 20px 15px" }}
                            >
                                Agregar Imagenes
                            </h2>


                            <input
                                type="file"
                                onChange={(e) => productImgPost(e.target.files[0])}
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="image-input"
                            />

                        </label>
                        {/* {selectedImage && <img src={selectedImage} alt="Vista previa de la imagen" />} */}
                        {/* onClick={handleUploadClick} */}
                        {/* <Button>SUBIR IMAGEN</Button> */}




                    </Swiper>


                </CardContent>
                <CardActions>

                </CardActions>
            </Card>
            <br /><br />

            <div align="right">
                {/* <Button color="primary" onClick={() => abrirCerrarModalImgProduct()}>Guardar Cambios</Button> */}
                <Button onClick={() => abrirCerrarModalImgProduct()}>Cancelar</Button>
            </div>
        </div >

    )
}

export default BodyProductImg