
import { Route, Routes, Navigate } from 'react-router-dom';

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


import AdminComponent from './components/admin/AdminComponent';

import BuyForm from './components/BuyForm/BuyForm';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';

import RegistroEmail from './components/RegistroEmail/RegistroEmail';


import VerificarToken from './components/Perfil/VerificarToken';
import VerificarTokenEmail from './components/Signin/VerificarTokenEmail';








function App() {

  return (
    <CartProvider>
      <AuthProvider>
        <Header />
        <AnimatePresence>
          <Routes>
            <Route path='NavajaFina/' element={<Main />} />
            <Route path='NavajaFina/products' element={
              <FIlterProvider>
                <ProductsPage />
              </FIlterProvider>
            } />

            <Route path='/login' element={<Login />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/products/:id' element={<ProductDetail />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/perfil' element={<Perfil />} />
            <Route path='/VerificarToken/' element={<VerificarToken />} />
            <Route path='/VerificarTokenEmail/:token' element={<VerificarTokenEmail />} />





            <Route path='NavajaFina/admin' element={<AdminComponent />} />
            <Route path='NavajaFina/BuyForm' element={<BuyForm />} />
            <Route path='NavajaFina*' element={<NotFoundPage />} />
            {/* <Route path='NavajaFina/RegistroEmail' element={<RegistroEmail/>} /> */}

            <Route path='NavajaFina/admin' element={<AdminComponent />} />
            <Route path='NavajaFina/BuyForm' element={<BuyForm />} />
            <Route path='NavajaFina/*' element={<NotFoundPage />} />
            <Route path='/*' element={<NotFoundPage />} />







          </Routes>
        </AnimatePresence>
        <Footer />
      </AuthProvider>
    </CartProvider>


  );
}

export default App;
