
import { Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import ProductsPage from './components/ProductsPage/ProductsPage';
import Signin from './components/Signin/Signin';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Cart from './components/Cart/Cart';
import { CartProvider } from './context/cart';


function App() {
  const products = [
    {
      _id: 12345,
      category: "Machines",
      subcategory: "Clippers",
      name: "Wahl Rinseable",
      price: 200,
      stock: 10,
      images: ["https://www.barbershop.com.ar/product_images/u/975/515789__68760_zoom.jpg", "https://www.barbershop.com.ar/product_images/g/618/515789-1__69130_zoom.jpg", "https://www.barbershop.com.ar/product_images/l/545/515789-4__43369_zoom.jpg"]
    },
    {
      _id: 23456,
      category: "Machines",
      subcategory: "Clippers",
      name: "MAQ REC 870 GOLD FX BOOST",
      price: 250,
      stock: 20,
      images: ["https://www.barbershop.com.ar/product_images/u/764/15357__31275_zoom.jpg", "https://www.barbershop.com.ar/product_images/q/187/15357-2__81838_zoom.jpg"]
    },
    {
      _id: 34567,
      category: "Scissors_Knives",
      subcategory: "Knives",
      name: "Navaja con Mango de Madera Yasaka",
      price: 20,
      stock: 15,
      images: ["https://www.barbershop.com.ar/product_images/q/915/5009-1__22016_zoom.JPG", "https://www.barbershop.com.ar/product_images/j/779/5009__02689_zoom.JPG"]
    },
    {
      _id: 45678,
      category: "Tools",
      subcategory: "Peines",
      name: "CARBON ANTIST 4011 LUCYDAN",
      price: 5,
      stock: 150,
      images: ["https://www.barbershop.com.ar/product_images/d/065/534492__97769_zoom.jpg", "https://www.barbershop.com.ar/product_images/m/237/534492-3__10656_zoom.jpg"]
    },
    {
      _id: 56789,
      category: "Machines",
      subcategory: "Recortadoras",
      name: "BABYLISS PRO FOIL FX02 GOLD",
      price: 70,
      stock: 8,
      images: ["https://www.barbershop.com.ar/product_images/w/666/14333__08351_zoom.jpg", "https://www.barbershop.com.ar/product_images/m/415/14333-6__77434_zoom.jpg"]
    },
    {
      _id: 67890,
      category: "Hair_Care",
      subcategory: "Champús para barba y cabello",
      name: "AC X100 HUILE NUTRITIVE MYTHIC OIL",
      price: 15,
      stock: 30,
      images: ["https://www.barbershop.com.ar/product_images/l/674/2056__68568_zoom.jpg"]
    },
    {
      _id: 78901,
      category: "Hair_Care",
      subcategory: "Acondicionadores para barba y cabello",
      name: "AC X100 OIL MIRACLE BARBARY BONACURE",
      price: 20,
      stock: 25,
      images: ["https://www.barbershop.com.ar/product_images/q/727/2835__46442_zoom.jpg"]
    },
    {
      _id: 89012,
      category: "Hair_Care",
      subcategory: "Aceites y bálsamos para barba",
      name: "Aceite Esencial de Kendi x100ml Teknia Lakme",
      price: 25,
      stock: 18,
      images: ["https://www.barbershop.com.ar/product_images/z/391/5608__02909_zoom.jpg"]
    },
    //   {
    //     _id: 90123,
    //     category: "Productos para el cuidado del cabello",
    //     subcategory: "Ceras y pomadas para peinar",
    //     name: "Cera para peinar con acabado mate",
    //     price: 12,
    //     stock: 40,
    //     images: []
    //   },
    //   {
    //     _id: 11234,
    //     category: "Productos para el cuidado del cabello",
    //     subcategory: "Productos para el cuidado del cuero cabelludo",
    //     name: "Loción anticaspa para cuero cabelludo sensible",
    //     price: 18,
    //     stock: 20,
    //     images: []
    //   },

    // {
    //   _id: 98765,
    //   category: "Productos para el afeitado",
    //   subcategory: "Cuchillas de afeitar",
    //   name: "Paquete de cuchillas de afeitar premium",
    //   price: 10,
    //   stock: 50,
    //   images: []
    //   },
    //   {
    //   _id: 87654,
    //   category: "Productos para el afeitado",
    //   subcategory: "Espumas y geles de afeitado",
    //   name: "Espuma de afeitar hidratante",
    //   price: 8,
    //   stock: 40,
    //   images: []
    //   },
    //   {
    //   _id: 76543,
    //   category: "Productos para el afeitado",
    //   subcategory: "Brochas de afeitar",
    //   name: "Brocha de afeitar de cerdas naturales",
    //   price: 15,
    //   stock: 30,
    //   images: []
    //   },
    //   {
    //   _id: 65432,
    //   category: "Productos para el afeitado",
    //   subcategory: "Aftershaves y lociones para después del afeitado",
    //   name: "Loción para después del afeitado con aroma refrescante",
    //   price: 12,
    //   stock: 25,
    //   images: []
    //   },
    //   {
    //   _id: 54321,
    //   category: "Productos para el afeitado",
    //   subcategory: "Productos para el cuidado de la piel",
    //   name: "Crema hidratante facial para hombres",
    //   price: 20,
    //   stock: 20,
    //   images: ["https://www.barbershop.com.ar/product_images/u/975/515789__68760_zoom.jpg","https://www.barbershop.com.ar/product_images/g/618/515789-1__69130_zoom.jpg","https://www.barbershop.com.ar/product_images/l/545/515789-4__43369_zoom.jpg"]

    //   }
  ];
  return (
    <CartProvider>
      <Header />
      <Cart />
      <Routes>

        <Route path='/' element={<Main products={products} />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/products/:id' element={<ProductDetail products={products} />} />

      </Routes>

      <Footer />
    </CartProvider>
  );
}

export default App;
