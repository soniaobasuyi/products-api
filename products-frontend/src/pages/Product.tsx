import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ProductInterface } from '../interfaces/product.interface.ts';
import axiosInstance from '../services/axios.ts';
import EditProductModal from '../components/EditProductModal.tsx';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal.tsx';

export default function Product() {
  const params = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductInterface | null>(null);
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await axiosInstance.get(`/product/${params.id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        console.error('Error fetching product:', error);
      }
    }

    fetchProduct();
  }, [params.id]);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/product/${params.id}`);
      navigate('/');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <>
      {loading && <p className='m-7 text-center text-2xl'>Loading...</p>}
      {error && <p className='m-7 text-center text-2xl text-red-500'>Something went wrong!</p>}
      {!loading && !error && product && (
        <div className='max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8'>
          <h2 className='text-2xl font-bold mb-4'>{product.name}</h2>
          <p className='text-gray-700 mb-2'>{product.description}</p>
          <p className='text-green-700 font-semibold mb-2'>${product.price}</p>
          <p className='text-gray-600 mb-6'>Quantity: {product.qty}</p>

          <div className='flex justify-between'>
            <button onClick={() => navigate('/')} className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
              Back to Products
            </button>

            <div>
              <button onClick={() => setIsEditModalOpen(true)} className='p-3 text-gray-600 hover:text-gray-900'>
                Edit
              </button>
              <button onClick={() => setIsDeleteModalOpen(true)} className='p-3 text-red-500 hover:text-red-700'>
                Delete
              </button>
            </div>
          </div>

          {isEditModalOpen && (
            <EditProductModal
              product={product}
              onClose={() => setIsEditModalOpen(false)}
              isOpen={isEditModalOpen}
              refreshProduct={() => window.location.reload()}
            />
          )}

          {isDeleteModalOpen && (
            <ConfirmDeleteModal
              onConfirm={handleDelete}
              onCancel={() => setIsDeleteModalOpen(false)}
            />
          )}
        </div>
      )}
    </>
  );
}
