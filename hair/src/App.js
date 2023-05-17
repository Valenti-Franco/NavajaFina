
import { Route, Routes, Link} from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import ProductsPage from './components/ProductsPage/ProductsPage';



function App() {
  return (
    <>
     <Header/>
     <nav>
        <ul>
            <li><Link to='/'>Home</Link> </li>
            <li><Link to='/products'>Products</Link></li>
        </ul>
     </nav>
    <Routes> 
      <Route path='/' element={<Main />} />
      <Route path='/products' element={<ProductsPage />} />

    </Routes>

     <Footer/>
    </>
  );
}

export default App;
