
import React, { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard, { Product } from '@/components/ProductCard';
import CategoryFilter from '@/components/CategoryFilter';
import { useToast } from '@/hooks/use-toast';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';

// Sample product data
const allProducts: Product[] = [
  {
    id: 1,
    name: "Kandang Jaring Apung Premium (5m)",
    description: "Kandang jaring apung HDPE berkualitas tinggi dirancang untuk budidaya ikan di perairan terbuka. Tahan terhadap sinar UV, korosi, dan kondisi laut yang keras.",
    price: 1299.99,
    image: "https://barakudamarine.id/wp-content/uploads/2024/10/Keramba-Apung-4.png",
    category: "Kandang",
    rating: 4.8
  },
  {
    id: 2,
    name: "Sistem Pemantauan Kualitas Air",
    description: "Pemantauan real-time tingkat oksigen, suhu, pH, dan salinitas. Termasuk integrasi aplikasi seluler dan peringatan.",
    price: 899.50,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR17dDROJSEHmFq3zyLr32sprNe7RmfMUpag&s",
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
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlJQXYJeeBNpMNCZmo5ylqrW37YnpYFTdUTw&s",
    category: "Aksesoris",
    rating: 4.3
  },
  {
    id: 5,
    name: "Sistem Kamera Bawah Air",
    description: "Sistem kamera bawah air HD untuk memantau perilaku dan kesehatan ikan. Termasuk kabel 30m dan peralatan perekaman.",
    price: 1249.99,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR17dDROJSEHmFq3zyLr32sprNe7RmfMUpag&s",
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

const Products = () => {
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Extract category from URL if present
  const categoryParam = searchParams.get('category');
  
  // Get all unique categories
  const categories = Array.from(new Set(allProducts.map(p => p.category)));
  
  // State for filters
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? [categoryParam] : []
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);
  
  // Calculate max price for filter
  const maxPrice = Math.max(...allProducts.map(p => p.price));
  
  // Handle category filter change
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  // Handle price range filter change
  const handlePriceChange = (values: [number, number]) => {
    setPriceRange(values);
  };
  
  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, maxPrice]);
    setSearchQuery("");
  };
  
  // Filter products based on selected filters
  const filteredProducts = allProducts.filter(product => {
    // Filter by category if any selected
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
      return false;
    }
    
    // Filter by price range
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  // Handle add to cart
  const handleAddToCart = (product: Product) => {
    toast({
      title: "Ditambahkan ke keranjang",
      description: `${product.name} telah ditambahkan ke keranjang Anda.`,
      duration: 3000,
    });
  };
  
  // Update URL when category filter changes
  useEffect(() => {
    if (selectedCategories.length === 1) {
      searchParams.set('category', selectedCategories[0]);
      setSearchParams(searchParams);
    } else if (categoryParam) {
      searchParams.delete('category');
      setSearchParams(searchParams);
    }
  }, [selectedCategories, categoryParam, searchParams, setSearchParams]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-ocean-700 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-4">Teknologi & Peralatan Akuakultur</h1>
            <p className="text-ocean-100 max-w-3xl">
              Jelajahi pilihan produk berkualitas tinggi kami yang dirancang khusus untuk budidaya ikan keramba jaring apung.
            </p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-64 flex-shrink-0">
              <div className="sticky top-4">
                <CategoryFilter 
                  categories={categories}
                  selectedCategories={selectedCategories}
                  priceRange={priceRange}
                  maxPrice={maxPrice}
                  onCategoryChange={handleCategoryChange}
                  onPriceChange={handlePriceChange}
                  onReset={handleResetFilters}
                />
              </div>
            </div>
            
            <div className="flex-grow">
              <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-gray-600">
                    <span className="font-medium">{filteredProducts.length}</span> produk ditemukan
                  </p>
                  <div className="relative w-full sm:w-64">
                    <Input
                      type="search"
                      placeholder="Cari produk..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  </div>
                </div>
              </div>
              
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada produk ditemukan</h3>
                  <p className="text-gray-500 mb-6">Coba sesuaikan filter atau kata kunci pencarian Anda</p>
                  <Button onClick={handleResetFilters}>
                    Atur Ulang Filter
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
