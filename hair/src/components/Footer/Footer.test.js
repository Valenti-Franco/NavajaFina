import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import React from 'react';
// import '@testing-library/jest-dom/extend-expect'
describe('Footer', () => {
    test('render content', () => {

        render(<Footer />);
        const textHorarios = screen.getByText("Horarios de atencion:");
        const textSociales = screen.getByText("Seguinos en nueustras redes");

        expect(textHorarios).toBeInTheDocument();
        expect(textSociales).toBeInTheDocument();



    })
});