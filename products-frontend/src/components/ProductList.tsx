import { useEffect, useState } from 'react';
import axiosInstance from '../services/axios.ts';
import { ProductInterface } from '../interfaces/product.interface.ts';


export default function ProductList() {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/product');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('error fetching products:', error);
        setError(true);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className='p-8'>
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong!</p>}
      {products && !error && !loading && (
        <div className='p-8'>
          <h1 className='text-2xl font-semibold mb-6'>Products</h1>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
            {products.map((product) => (
              <div key={product.id} className='border rounded-lg p-4 shadow-md hover:scale-105 transition-scale duration-300'>
                <h2 className='text-lg font-semibold'>{product.name}</h2>
                <p className='text-gray-600'>{product.description}</p>
                <p className='mt-2 font-semibold text-green-700'>${product.price}</p>
                <p className='mt-2 text-red-700'>{product.qty} left</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
