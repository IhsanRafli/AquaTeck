
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowLeft, Plus, Minus, Star, StarHalf } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';

// Sample product data (same as in Products.tsx with ratings added)
const allProducts = [
  {
    id: 1,
    name: "Kandang Jaring Apung Premium (5m)",
    description: "Kandang jaring apung HDPE berkualitas tinggi dirancang untuk budidaya ikan di perairan terbuka. Tahan terhadap sinar UV, korosi, dan kondisi laut yang keras.",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    category: "Kandang",
    rating: 4.8
  },
  {
    id: 2,
    name: "Sistem Pemantauan Kualitas Air",
    description: "Pemantauan real-time tingkat oksigen, suhu, pH, dan salinitas. Termasuk integrasi aplikasi seluler dan peringatan.",
    price: 899.50,
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    category: "Pemantauan",
    rating: 4.5
  },
  {
    id: 3,
    name: "Sistem Pemberian Pakan Otomatis",
    description: "Sistem pemberian pakan yang dapat diprogram dengan kapasitas 50kg pakan. Mendistribusikan pakan secara merata di seluruh instalasi kandang Anda.",
    price: 749.99,
    image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac",
    category: "Pemberian Pakan",
    rating: 4.7
  },
  {
    id: 4,
    name: "Sistem Jangkar Kelas Laut",
    description: "Sistem jangkar lengkap dirancang untuk instalasi kandang jaring apung dalam berbagai kondisi dasar laut.",
    price: 549.95,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    category: "Aksesoris",
    rating: 4.3
  },
  {
    id: 5,
    name: "Sistem Kamera Bawah Air",
    description: "Sistem kamera bawah air HD untuk memantau perilaku dan kesehatan ikan. Termasuk kabel 30m dan peralatan perekaman.",
    price: 1249.99,
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    category: "Pemantauan",
    rating: 4.6
  },
  {
    id: 6,
    name: "Kandang Jaring Apung Premium (8m)",
    description: "Kandang jaring apung HDPE skala besar untuk budidaya ikan komersial. Termasuk struktur yang diperkuat untuk kondisi laut yang kasar.",
    price: 2299.99,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    category: "Kandang",
    rating: 4.9
  },
  {
    id: 7,
    name: "Kit Uji Air Akuakultur",
    description: "Kit pengujian lengkap untuk memantau parameter kualitas air yang penting untuk kesehatan ikan.",
    price: 129.95,
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    category: "Aksesoris",
    rating: 4.2
  },
  {
    id: 8,
    name: "Sistem Tenaga Surya untuk Akuakultur",
    description: "Panel surya dan sistem baterai dirancang untuk menyalakan sistem pemantauan dan pemberian pakan di lokasi terpencil.",
    price: 1899.99,
    image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac",
    category: "Peralatan",
    rating: 4.4
  },
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  // Find the product with the matching ID
  const product = allProducts.find(p => p.id === Number(id));
  
  // Handle case when product is not found
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Produk Tidak Ditemukan</h1>
            <p className="text-gray-600 mb-6">Maaf, produk yang Anda cari tidak dapat ditemukan.</p>
            <Link to="/products" className="text-ocean-600 hover:text-ocean-700 font-medium flex items-center justify-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Produk
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  // Function to render the star rating
  const renderStarRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const stars = [];
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="h-5 w-5 fill-yellow-400 text-yellow-400" />);
    }
    
    // Add half star if applicable
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="h-5 w-5 fill-yellow-400 text-yellow-400" />);
    }
    
    return (
      <div className="flex items-center">
        {stars}
        <span className="ml-2 text-sm font-medium text-gray-600">({rating.toFixed(1)})</span>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link to="/products" className="text-ocean-600 hover:text-ocean-700 font-medium flex items-center mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Produk
          </Link>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <div className="relative h-72 md:h-full">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-aqua-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    {product.category}
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/2 p-6 md:p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
                {product.rating && (
                  <div className="mb-3">
                    {renderStarRating(product.rating)}
                  </div>
                )}
                <p className="text-2xl text-ocean-600 font-bold mb-6">Rp {product.price.toLocaleString('id-ID')}</p>
                
                <div className="prose prose-sm text-gray-600 mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Deskripsi Produk</h3>
                  <p>{product.description}</p>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Jumlah</h3>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1}
                      className="h-10 w-10"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="mx-4 w-8 text-center font-medium">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={increaseQuantity}
                      className="h-10 w-10"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                  <Button 
                    size="lg" 
                    className="bg-ocean-500 hover:bg-ocean-600 text-white"
                    onClick={handleAddToCart}
                  >
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    Tambahkan ke Keranjang
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-ocean-500 text-ocean-500 hover:bg-ocean-50"
                    onClick={() => {
                      handleAddToCart();
                      window.location.href = '/cart';
                    }}
                  >
                    Beli Sekarang
                  </Button>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Detail Produk</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded">
                      <span className="text-sm font-medium text-gray-500">Kategori</span>
                      <p className="text-gray-800">{product.category}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded">
                      <span className="text-sm font-medium text-gray-500">ID Produk</span>
                      <p className="text-gray-800">{product.id}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Link 
                      to={`/tracking`}
                      className="inline-flex items-center mt-4 px-4 py-2 text-sm font-medium text-ocean-700 bg-ocean-50 rounded-md hover:bg-ocean-100"
                    >
                      <span>Lacak Pesanan</span>
                    </Link>
                  </div>
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

export default ProductDetail;
