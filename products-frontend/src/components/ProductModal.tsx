import { ModalProps } from '../interfaces/modal.interface.ts';
import { useState } from 'react';
import * as React from 'react';
import axiosInstance from '../services/axios.ts';
import { useNavigate } from 'react-router-dom';

export default function ProductModal({ isOpen, onClose, title }: ModalProps) {
  if (!isOpen) return null;

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [qty, setQty] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct = {
      name,
      description,
      price: Number(price),
      qty: Number(qty),
    };

    try {
      const response = await axiosInstance.post('/product', newProduct);
      console.log('New product created!', response.data);
      if (onClose) onClose();
      navigate(`/product/${response.data.id}`);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='bg-white rounded-lg w-full max-w-md'>

        <div className='flex justify-between items-center p-4'>
          <h2 className='text-lg font-bold'>{title}</h2>
          <button onClick={onClose} className='text-gray-500 hover:text-gray-700'>&times;</button>
        </div>

        <div className='p-4'>
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label className='block mb-1'>Name</label>
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='w-full border rounded p-2'
                placeholder='Enter product name'
              />
            </div>

            <div className='mb-4'>
              <label className='block mb-1'>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='w-full border rounded p-2'
                placeholder='Enter product description'
              />
            </div>

            <div className='mb-4'>
              <label className='block mb-1'>Price</label>
              <input
                type='number'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className='w-full border rounded p-2'
                placeholder='Enter product price'
              />
            </div>

            <div className='mb-4'>
              <label className='block mb-1'>Quantity</label>
              <input
                type='number'
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                className='w-full border rounded p-2'
                placeholder='Enter product quantity'
              />
            </div>

            <div className='flex justify-end gap-2'>
              <button type='button' onClick={onClose} className='p-2 bg-gray-300 hover:shadow-lg rounded-lg'>Cancel</button>
              <button type='submit' className='px-4 py-2 bg-blue-500 text-white hover:shadow-lg rounded-lg'>Save</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
