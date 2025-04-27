import { ConfirmDeleteModalProps } from '../interfaces/confirm.delete.modal.interface.ts';

export default function ConfirmDeleteModal({ onConfirm, onCancel }: ConfirmDeleteModalProps) {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='bg-white rounded-lg w-full max-w-sm p-6'>
        <h3 className='text-xl font-semibold mb-4'>Are you sure you want to delete this product?</h3>
        <div className='flex justify-end gap-4'>
          <button
            onClick={onCancel}
            className='p-2 bg-gray-300 hover:bg-gray-400 rounded-lg'>
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className='p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg'>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
