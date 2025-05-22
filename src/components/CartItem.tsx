
import React from 'react';
import { Button } from "@/components/ui/button";
import { Product } from './ProductCard';
import { Trash, Plus, Minus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface CartItemProps {
  item: {
    product: Product;
    quantity: number;
  };
}

const CartItem = ({ item }: CartItemProps) => {
  const { product, quantity } = item;
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center py-4 border-b last:border-0 animate-fade-in">
      <div className="w-full sm:w-20 h-20 mb-4 sm:mb-0 sm:mr-6 rounded overflow-hidden flex-shrink-0">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-grow mr-4">
        <h3 className="text-base font-medium text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{product.category}</p>
        <p className="text-ocean-600 font-medium">Rp {product.price.toLocaleString('id-ID')}</p>
      </div>
      
      <div className="flex items-center mt-4 sm:mt-0">
        <div className="flex items-center border border-gray-300 rounded">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-none hover:bg-gray-100"
            onClick={() => updateQuantity(product.id, Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-10 text-center text-sm">{quantity}</span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-none hover:bg-gray-100"
            onClick={() => updateQuantity(product.id, quantity + 1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="ml-4 text-gray-400 hover:text-red-500 hover:bg-transparent"
          onClick={() => removeFromCart(product.id)}
        >
          <Trash className="h-4 w-4" />
          <span className="sr-only">Hapus</span>
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
