import { ProductInterface } from './product.interface.ts';

export interface EditModalProps {
  product: ProductInterface;
  onClose: () => void;
  isOpen: boolean;
  refreshProduct: () => void;
}