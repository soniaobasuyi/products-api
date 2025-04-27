import ProductList from './components/ProductList.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Product from './pages/Product.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProductList />}/>
        <Route path='/product/:id' element={<Product />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
