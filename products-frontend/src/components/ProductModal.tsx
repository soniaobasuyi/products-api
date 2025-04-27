import { ModalProps } from '../interfaces/modal.interface.ts';

export default function Modal({ isOpen, onClose, children, title }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='bg-white rounded-lg w-full max-w-md'>

        <div className='flex justify-between items-center border-b p-4'>
          <h2 className='text-lg font-bold'>{title}</h2>
          <button onClick={onClose} className='text-gray-500 hover:text-gray-700'>&times;</button>
        </div>

        <div className='p-4'>
          {children}
        </div>

        <div className='flex justify-end gap-2 border-t p-4'>
          <button
            onClick={onClose}
            className='p-2 text-gray-700 hover:bg-gray-100 rounded-lg'
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
