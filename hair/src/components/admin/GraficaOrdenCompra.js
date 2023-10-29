import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';


export async function processOrdenData(compras) {
    const initialData = compras.map(compra => ({
        time: formatDate(compra.fechaPublicado),
        value: compra.total
    }));

    //se cambia el formato de la fecha
    function formatDate(dateString) {
        const fecha = new Date(dateString);
        const year = fecha.getFullYear();
        const month = String(fecha.getMonth() + 1).padStart(2, '0');
        const day = String(fecha.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    //se ordena por fecha
    initialData.sort((a, b) => new Date(a.time) - new Date(b.time));

    //
    const dataWithSum = [];
    let currentDay = null;
    let total = 0;

    for (const data of initialData) {
        if (data.time !== currentDay) {
            if (currentDay !== null) {
                dataWithSum.push({ time: currentDay, value: total });
            }
            currentDay = data.time;
            total = data.value;
        } else {
            total += data.value;
        }
    }

    if (currentDay !== null) {
        dataWithSum.push({ time: currentDay, value: total });
    }

    return dataWithSum;
}

export const ChartOrdenComponent = props => {

    const {
        data,
        colors: {
            backgroundColor = 'white',
            lineColor = '#ff2929',
            textColor = 'black',
            areaTopColor = '#ff2929',
            areaBottomColor = 'rgba(255, 41, 41, 0.28)',
        } = {},
    } = props;
    // console.log(data)
    const chartContainerRef = useRef();

    useEffect(
        () => {
            const handleResize = () => {
                chart.applyOptions({ width: chartContainerRef.current.clientWidth });
            };

            const chart = createChart(chartContainerRef.current, {
                layout: {
                    background: { type: ColorType.Solid, color: backgroundColor },
                    textColor,
                },
                width: chartContainerRef.current.clientWidth,
                height: 300,
            });
            chart.timeScale().fitContent();

            const newSeries = chart.addAreaSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor });
            newSeries.setData(data);

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);

                chart.remove();
            };
        },
        [data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
    );

    return (
        <div
            ref={chartContainerRef}
        />
    );
};

