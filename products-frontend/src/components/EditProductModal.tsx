import { EditModalProps } from '../interfaces/edit.modal.interface.ts';
import { useEffect, useState } from 'react';
import * as React from 'react';
import axiosInstance from '../services/axios.ts';

export default function EditProductModal({ product, onClose, isOpen, refreshProduct }: EditModalProps) {
  if (!isOpen) return null;

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number>(product.price);
  const [qty, setQty] = useState<number>(product.qty);

  useEffect(() => {
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setQty(product.qty);
  }, [product]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedProduct = {
      name,
      description,
      price,
      qty
    };

    try {
      await axiosInstance.put(`/product/${product.id}`, updatedProduct);
      refreshProduct();
      onClose();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='bg-white rounded-lg w-full max-w-md'>

        <div className='flex justify-between items-center p-4'>
          <h2 className='text-lg font-bold'>Edit Product</h2>
          <button onClick={onClose} className='text-gray-500 hover:text-gray-700'>&times;</button>
        </div>

        <div className='p-4'>
          <form onSubmit={handleUpdate}>
            <div className='mb-4'>
              <label className='block mb-1'>Name</label>
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='w-full border rounded p-2'
              />
            </div>

            <div className='mb-4'>
              <label className='block mb-1'>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='w-full border rounded p-2'
              />
            </div>

            <div className='mb-4'>
              <label className='block mb-1'>Price</label>
              <input
                type='number'
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className='w-full border rounded p-2'
              />
            </div>

            <div className='mb-4'>
              <label className='block mb-1'>Quantity</label>
              <input
                type='number'
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className='w-full border rounded p-2'
              />
            </div>

            <div className='flex justify-end gap-2'>
              <button type='button' onClick={onClose} className='p-2 bg-gray-300 hover:shadow-lg rounded-lg'>Cancel</button>
              <button type='submit' className='px-4 py-2 bg-blue-500 text-white hover:shadow-lg rounded-lg'>Update</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
