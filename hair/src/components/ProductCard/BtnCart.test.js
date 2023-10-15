import { fireEvent, render, screen } from "@testing-library/react";
import BtnCart from "./BtnCart";
import { CartProvider } from '../../context/cart';

describe("BtnCart", () => {
    test("should render", () => {
        const product = {
            id: 1,
            nombre: 'Navaja',
            descripcion: 'Navaja',
            precio: 5,
            stock: 27,
            categoryId: 2,
            subcategoryId: 1,
            imagenes: [
                {
                    id: 2,
                    productoId: 1,
                    url:
                        'https://res.cloudinary.com/deh35rofi/image/upload/v1695597885/morauggtk3ntwlmtdgkg.png'
                }
            ]
        }
        render(
            <CartProvider>
                <BtnCart product={product} />
            </CartProvider>
        )



    });

    test("Que se cambie el valor de boton al ser clickeado por 'Eliminar del Carrito'", () => {
        const product = {
            id: 1,
            nombre: 'Navaja',
            descripcion: 'Navaja',
            precio: 5,
            stock: 27,
            categoryId: 2,
            subcategoryId: 1,
            imagenes: [
                {
                    id: 2,
                    productoId: 1,
                    url:
                        'https://res.cloudinary.com/deh35rofi/image/upload/v1695597885/morauggtk3ntwlmtdgkg.png'
                }
            ]
        }
        render(
            <CartProvider>
                <BtnCart product={product} />
            </CartProvider>
        )

        const buttonElementAdd = screen.getByText(/Añadir al Carrito/i);
        expect(buttonElementAdd).toBeInTheDocument();

        fireEvent.click(buttonElementAdd);
        const buttonElementRemove = screen.getByText(/Elinimar del Carrito/i);
        expect(buttonElementRemove).toBeInTheDocument();


    })
})