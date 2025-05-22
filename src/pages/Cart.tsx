
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartItem from '@/components/CartItem';
import { Button } from "@/components/ui/button";
import { ShoppingBag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';

const Cart = () => {
  const { toast } = useToast();
  const { cartItems, getSubtotal, getTotal } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  
  const subtotal = getSubtotal();
  const shipping = cartItems.length > 0 ? 24.99 : 0;
  const total = getTotal();
  
  // Apply coupon code
  const handleApplyCoupon = () => {
    setIsApplyingCoupon(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Kode kupon tidak valid",
        description: "Kode kupon yang Anda masukkan tidak valid atau telah kadaluarsa.",
        variant: "destructive",
      });
      setIsApplyingCoupon(false);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 animate-fade-in-up">Keranjang Belanja</h1>
          
          {cartItems.length > 0 ? (
            <div className="lg:flex lg:space-x-8">
              <div className="lg:w-2/3">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-900">Keranjang Belanja</h2>
                    <p className="text-gray-500">{cartItems.length} item</p>
                  </div>
                  
                  <div className="divide-y">
                    {cartItems.map((item, index) => (
                      <div key={item.product.id} className="p-6 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                        <CartItem item={item} />
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-6 bg-gray-50 flex justify-between items-center">
                    <Link 
                      to="/products"
                      className="text-ocean-600 hover:text-ocean-800 transition-colors flex items-center font-medium"
                    >
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Lanjutkan Belanja
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="lg:w-1/3 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-4">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-900">Ringkasan Pesanan</h2>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-gray-900 font-medium">Rp {subtotal.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pengiriman</span>
                      <span className="text-gray-900 font-medium">Rp {shipping.toLocaleString('id-ID')}</span>
                    </div>
                    
                    <div className="border-t pt-4 flex justify-between">
                      <span className="text-lg font-semibold text-gray-900">Total</span>
                      <span className="text-lg font-bold text-ocean-600">Rp {total.toLocaleString('id-ID')}</span>
                    </div>
                    
                    <div className="pt-4">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="Kode Kupon"
                          className="flex-grow rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ocean-500"
                        />
                        <Button 
                          onClick={handleApplyCoupon}
                          variant="outline"
                          disabled={!couponCode || isApplyingCoupon}
                          className="border-ocean-600 text-ocean-600 hover:bg-ocean-50"
                        >
                          {isApplyingCoupon ? 'Menerapkan...' : 'Terapkan'}
                        </Button>
                      </div>
                    </div>
                    
                    <Link to="/checkout">
                      <Button 
                        className="w-full bg-ocean-600 hover:bg-ocean-700 text-white py-3 h-auto"
                      >
                        Lanjut ke Pembayaran
                      </Button>
                    </Link>
                    
                    <div className="text-center text-sm text-gray-500 mt-4">
                      <p>Kami menerima</p>
                      <div className="flex justify-center space-x-2 mt-2">
                        <div className="w-10 h-6 bg-blue-900 rounded"></div>
                        <div className="w-10 h-6 bg-red-600 rounded"></div>
                        <div className="w-10 h-6 bg-green-600 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 animate-fade-in">
              <div className="mx-auto h-24 w-24 text-gray-400 mb-6">
                <ShoppingBag className="h-full w-full" />
              </div>
              <h3 className="text-2xl font-medium text-gray-900 mb-2">Keranjang Anda kosong</h3>
              <p className="text-gray-500 mb-8">Sepertinya Anda belum menambahkan produk apa pun.</p>
              <Link to="/products">
                <Button size="lg" className="bg-ocean-600 hover:bg-ocean-700 text-white">
                  Jelajahi Produk
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
