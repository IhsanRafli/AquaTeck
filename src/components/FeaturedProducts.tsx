
import React from 'react';
import ProductCard, { Product } from './ProductCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

// Sample product data
const products: Product[] = [
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
];

// Group products by category
const categories = Array.from(new Set(products.map((product) => product.category)));

const FeaturedProducts = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-ocean-900">Peralatan Unggulan</h2>
          <p className="text-gray-600 mt-2">Produk berkualitas tinggi untuk kebutuhan akuakultur Anda</p>
        </div>
        
        <Tabs defaultValue={categories[0].toLowerCase()} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList>
              {categories.map((category) => (
                <TabsTrigger 
                  key={category}
                  value={category.toLowerCase()}
                  className="data-[state=active]:bg-ocean-100 data-[state=active]:text-ocean-700"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {categories.map((category) => (
            <TabsContent
              key={category}
              value={category.toLowerCase()}
              className="mt-0 animate-fade-in"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products
                  .filter((product) => product.category === category)
                  .map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="mt-12 text-center">
          <Button 
            asChild
            size="lg"
            variant="outline"
            className="border-ocean-600 text-ocean-600 hover:bg-ocean-50"
          >
            <Link to="/products">
              Lihat Semua Produk
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
