
import { Route, Routes } from 'react-router-dom';

import Footer from './components/Footer/Footer';

import Main from './components/Main/Main';
import ProductsPage from './components/ProductsPage/ProductsPage';
import Signin from './components/Signin/Signin';
import ProductDetail from './components/ProductDetail/ProductDetail';

import { CartProvider } from './context/cart';
import Header from './components/Header/Header';
import CartPage from './components/CartPage/CartPage';


import { AnimatePresence } from 'framer-motion';
import { FIlterProvider } from './context/filters';
import { AuthProvider } from './context/Auth';
import Perfil from './components/Perfil/Perfil';
import Login from './components/Login/login';

import Admin from './components/admin/Admin';





function App() {
  




  return (
    <CartProvider>
      <AuthProvider>
      <Header />
      <AnimatePresence>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/products' element={
            <FIlterProvider>
              <ProductsPage  />
            </FIlterProvider>
          } />
          <Route path='/login' element={<Login />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/products/:id' element={<ProductDetail  />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/perfil' element={<Perfil />} />
          <Route path='/admin' element={<Admin />} />


        </Routes>
      </AnimatePresence>
      <Footer />
      </AuthProvider>
    </CartProvider>


  );
}

export default App;
