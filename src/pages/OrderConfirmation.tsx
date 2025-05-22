import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Check, ChevronRight, Printer, Truck } from 'lucide-react';

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

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};

const OrderConfirmation = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call to fetch the order
    // For now, we'll just get it from localStorage
    const fetchOrder = () => {
      try {
        const orderData = localStorage.getItem(`order_${orderId}`);
        if (orderData) {
          setOrder(JSON.parse(orderData));
        }
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin h-12 w-12 border-4 border-ocean-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <h2 className="text-xl font-medium text-gray-800">Memuat detail pesanan...</h2>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Pesanan Tidak Ditemukan</h1>
            <p className="text-gray-600 mb-6">
              Maaf, kami tidak dapat menemukan pesanan dengan ID tersebut.
            </p>
            <Link to="/">
              <Button className="bg-ocean-600 hover:bg-ocean-700 text-white">
                Kembali ke Beranda
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="print:hidden">
        <Navbar />
      </div>
      <main className="flex-grow py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-green-50 rounded-lg p-6 mb-8 print:bg-white">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Pesanan Berhasil Dibuat!</h1>
                <p className="text-gray-600">
                  Terima kasih telah berbelanja di AquaTech Market. Bukti pemesanan telah dikirim ke email Anda.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Detail Pesanan</h2>
                <div className="flex space-x-2">
                  <Link to="/tracking" className="print:hidden">
                    <Button variant="outline" className="flex items-center">
                      <Truck className="h-4 w-4 mr-2" />
                      Lacak Pesanan
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="print:hidden"
                    onClick={handlePrint}
                  >
                    <Printer className="h-4 w-4 mr-2" />
                    Cetak
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Nomor Pesanan</h3>
                  <p className="text-gray-900 font-medium">{order.orderNumber}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Tanggal Pesanan</h3>
                  <p className="text-gray-900">{formatDate(order.date)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Metode Pembayaran</h3>
                  <p className="text-gray-900">
                    {order.paymentMethod === 'creditCard' && 'Kartu Kredit / Debit'}
                    {order.paymentMethod === 'bankTransfer' && 'Transfer Bank'}
                    {order.paymentMethod === 'eWallet' && 'E-Wallet'}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Status Pesanan</h3>
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Diproses
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="font-medium text-gray-900 mb-4">Item Pesanan</h3>
                <div className="divide-y">
                  {order.products.map((product) => (
                    <div key={product.id} className="flex py-4 items-center">
                      <div className="h-16 w-16 rounded overflow-hidden mr-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-medium">{product.name}</h4>
                        <p className="text-sm text-gray-500">
                          {product.quantity} x Rp {product.price.toLocaleString('id-ID')}
                        </p>
                      </div>
                      <div className="font-medium">
                        Rp {(product.price * product.quantity).toLocaleString('id-ID')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t pt-6 mt-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">Rp {order.subtotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Pengiriman</span>
                  <span className="font-medium">Rp {order.shipping.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between pt-4 border-t mt-4">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-ocean-600">Rp {order.total.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Informasi Pengiriman</h2>
            </div>
            
            <div className="p-6">
              <h3 className="font-medium mb-3">{order.customer.name}</h3>
              <p className="text-gray-600">{order.customer.address}</p>
              <p className="text-gray-600">{order.customer.city}, {order.customer.postalCode}</p>
              <p className="text-gray-600 mt-2">Email: {order.customer.email}</p>
              <p className="text-gray-600">Telepon: {order.customer.phone}</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center print:hidden">
            <Link to="/">
              <Button variant="outline">
                Kembali ke Beranda
              </Button>
            </Link>
            <div className="flex space-x-3">
              <Link to="/tracking">
                <Button variant="outline" className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100">
                  <Truck className="h-4 w-4 mr-2" />
                  Lacak Pesanan
                </Button>
              </Link>
              <Link to="/products">
                <Button className="bg-ocean-600 hover:bg-ocean-700 text-white">
                  Lanjutkan Belanja
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
};

export default OrderConfirmation;
