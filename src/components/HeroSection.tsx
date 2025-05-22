
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-ocean-100 to-ocean-200 py-16 md:py-24">
      {/* Animated wave background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-30 bg-wave-pattern animate-wave"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-ocean-900 mb-4 animate-fade-in-up">
              Teknologi & Pendidikan Akuakultur Terdepan
            </h1>
            <p className="text-lg text-gray-700 mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Peralatan premium dan kursus untuk budidaya keramba jaring apung. Tingkatkan kualitas budidaya ikan laut Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Button 
                asChild
                size="lg"
                className="bg-ocean-600 hover:bg-ocean-700 text-white"
              >
                <Link to="/products">
                  Lihat Produk
                </Link>
              </Button>
              <Button 
                asChild
                size="lg"
                variant="outline"
                className="border-ocean-600 text-ocean-600 hover:bg-ocean-50"
              >
                <Link to="/courses">
                  Jelajahi Kursus
                </Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="animate-float">
              <img 
                src="https://media.istockphoto.com/id/1759411125/id/foto/turbin-air-di-kolam-renang-digunakan-untuk-meningkatkan-pasokan-oksigen.jpg?s=612x612&w=0&k=20&c=GALaueAWRcyuMcCQMlqe0bn-rC0IZfm4OpvZ209oGfQ=" 
                alt="Budidaya keramba jaring apung" 
                className="rounded-lg shadow-xl max-w-full h-auto"
              />
              <div className="absolute -bottom-6 -right-6 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                <p className="text-ocean-800 font-medium">
                  "Meningkatkan hasil panen sebesar 35% dengan teknologi yang tepat" - Marine Farms Ltd
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
