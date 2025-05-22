
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from '@/contexts/CartContext';

interface OrderData {
  id: string;
  orderNumber: string;
  date: string;
  products: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: string;
}

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getSubtotal, getTotal, clearCart } = useCart();
  const subtotal = getSubtotal();
  const shipping = cartItems.length > 0 ? 24.99 : 0;
  const total = getTotal();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'creditCard'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handlePaymentMethodChange = (value: string) => {
    setFormData(prevData => ({
      ...prevData,
      paymentMethod: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Generate random order ID
    const orderId = Math.random().toString(36).substring(2, 12).toUpperCase();
    
    // Create order data
    const orderData: OrderData = {
      id: orderId,
      orderNumber: `AQ${Date.now().toString().slice(-8)}`,
      date: new Date().toISOString(),
      products: cartItems.map(item => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image
      })),
      customer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode
      },
      subtotal,
      shipping,
      total,
      paymentMethod: formData.paymentMethod
    };

    // In a real app, this would be saved to a database
    // For now, we'll just save it to localStorage
    localStorage.setItem(`order_${orderId}`, JSON.stringify(orderData));
    
    // Simulate payment processing
    setTimeout(() => {
      // Clear shopping cart
      clearCart();
      // Redirect to order confirmation page
      navigate(`/order-confirmation/${orderId}`);
    }, 2000);
  };
  
  // Redirect if cart is empty
  React.useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
          
          <div className="lg:flex lg:space-x-8">
            <div className="lg:w-2/3">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-900">Informasi Pengiriman</h2>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nama Lengkap</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Nomor Telepon</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Alamat</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">Kota</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="postalCode">Kode Pos</Label>
                        <Input
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-900">Metode Pembayaran</h2>
                  </div>
                  
                  <div className="p-6">
                    <RadioGroup 
                      value={formData.paymentMethod} 
                      onValueChange={handlePaymentMethodChange}
                      className="space-y-4"
                    >
                      <div className="flex items-center space-x-3 border p-4 rounded-lg">
                        <RadioGroupItem value="creditCard" id="creditCard" />
                        <Label htmlFor="creditCard" className="flex-grow cursor-pointer">
                          Kartu Kredit / Debit
                        </Label>
                        <div className="flex space-x-2">
                          <div className="w-8 h-5 bg-blue-900 rounded"></div>
                          <div className="w-8 h-5 bg-red-600 rounded"></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 border p-4 rounded-lg">
                        <RadioGroupItem value="bankTransfer" id="bankTransfer" />
                        <Label htmlFor="bankTransfer" className="flex-grow cursor-pointer">
                          Transfer Bank
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-3 border p-4 rounded-lg">
                        <RadioGroupItem value="eWallet" id="eWallet" />
                        <Label htmlFor="eWallet" className="cursor-pointer">
                          E-Wallet
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-900">Pesanan Anda</h2>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-4">
                      {cartItems.map(item => (
                        <div key={item.product.id} className="flex items-center py-2">
                          <div className="w-12 h-12 rounded overflow-hidden mr-4">
                            <img 
                              src={item.product.image} 
                              alt={item.product.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <p className="font-medium">{item.product.name}</p>
                            <p className="text-sm text-gray-500">{item.quantity} x Rp {item.product.price.toLocaleString('id-ID')}</p>
                          </div>
                          <p className="font-medium">Rp {(item.product.price * item.quantity).toLocaleString('id-ID')}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </form>
            </div>
            
            <div className="lg:w-1/3 mt-8 lg:mt-0">
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
                  
                  <Button 
                    onClick={handleSubmit}
                    disabled={isProcessing}
                    className="w-full bg-ocean-600 hover:bg-ocean-700 text-white py-3 h-auto mt-4"
                  >
                    {isProcessing ? 'Memproses...' : 'Selesaikan Pesanan'}
                  </Button>
                  
                  <p className="text-sm text-gray-500 text-center mt-4">
                    Dengan menyelesaikan pesanan ini, Anda menyetujui Ketentuan Layanan dan Kebijakan Privasi kami.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
