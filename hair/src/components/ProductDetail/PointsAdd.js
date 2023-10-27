import React, { useState, useEffect } from 'react'
import { MdStar } from 'react-icons/md'
import style from './index.module.css';
import { motion } from 'framer-motion';

const PointsAdd = ({ puntoUsuario, handlerPointPost, handlerPointPut }) => {
    const [starStates, setStarStates] = useState(Array(5).fill(false));

    // Utiliza useEffect para establecer el estado inicial basado en puntoUsuario.puntos
    useEffect(() => {
        if (puntoUsuario?.puntos) {
            setStarStates((prevStarStates) => {
                const newStarStates = [...prevStarStates];
                for (let i = 0; i < puntoUsuario.puntos; i++) {
                    newStarStates[i] = true;
                }
                return newStarStates;
            });
        }
    }, [puntoUsuario?.puntos]);

    const handleStarHover = (index) => {
        const updatedStates = starStates.map((_, i) => i <= index);
        setStarStates(updatedStates);
    };

    const handleStarNotHover = () => {
        if (puntoUsuario?.puntos < 0) {
            setStarStates(Array(5).fill(false));

        } else {
            const updatedStates = starStates.map((_, i) => i <= puntoUsuario?.puntos - 1);
            setStarStates(updatedStates);
        }
    };

    const handleStarClick = (index) => {
        // console.log(starStates[0] === true)
        if (starStates[0] === true && puntoUsuario?.id >= 0) {
            handlerPointPut(index, puntoUsuario?.id);

        } else {
            handlerPointPost(index);

        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            {[1, 2, 3, 4, 5].map((index) => (
                <motion.div
                    key={"123" + index}

                    whileHover={{ scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >

                    <MdStar
                        className={`${style.estrella} ${starStates[index - 1] ? style.estrellaHover : ''}`}
                        onMouseEnter={() => handleStarHover(index - 1)}
                        onMouseLeave={handleStarNotHover}
                        onClick={() => handleStarClick(index)}
                        key={index}
                    />
                </motion.div>

            ))}
        </div>
    )
}

export default PointsAdd
