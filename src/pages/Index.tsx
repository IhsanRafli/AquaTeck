
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import FeaturedCourses from '@/components/FeaturedCourses';
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        
        <section className="py-16 bg-gradient-to-b from-white to-ocean-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-ocean-900 mb-6">Mengapa Memilih AquaTech Market?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 animate-fade-in-up">
                <div className="h-12 w-12 bg-ocean-100 text-ocean-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-ocean-900 mb-2">Kualitas Premium</h3>
                <p className="text-gray-600">Semua produk kami bersumber dari produsen terkemuka, memastikan daya tahan di lingkungan laut.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="h-12 w-12 bg-ocean-100 text-ocean-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-ocean-900 mb-2">Dukungan Ahli</h3>
                <p className="text-gray-600">Tim kami mencakup spesialis akuakultur yang siap memberikan saran teknis dan solusi.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="h-12 w-12 bg-ocean-100 text-ocean-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-ocean-900 mb-2">Pengiriman Cepat</h3>
                <p className="text-gray-600">Jaringan logistik yang efisien memastikan peralatan Anda tiba tepat waktu untuk meminimalkan waktu henti.</p>
              </div>
            </div>
          </div>
        </section>
        
        <FeaturedProducts />
        <FeaturedCourses />
        
        <section className="py-16 bg-ocean-900 text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h2 className="text-3xl font-bold mb-4">Siap untuk meningkatkan operasi akuakultur Anda?</h2>
                <p className="text-ocean-100 mb-6">
                  Bergabunglah dengan ratusan pembudidaya ikan yang puas yang telah mentransformasikan operasi mereka dengan teknologi dan keahlian kami.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    asChild
                    className="bg-white text-ocean-900 hover:bg-gray-100"
                  >
                    <Link to="/products">Belanja Peralatan</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-white text-white hover:bg-ocean-800"
                  >
                    <Link to="/contact">Dapatkan Saran Ahli</Link>
                  </Button>
                </div>
              </div>
              <div className="md:w-1/3">
                <div className="bg-ocean-800 p-6 rounded-lg animate-float">
                  <div className="text-xl font-bold mb-4">Berlangganan newsletter kami</div>
                  <p className="text-ocean-100 mb-4">Dapatkan update produk terbaru dan wawasan akuakultur.</p>
                  <form className="space-y-3">
                    <input
                      type="email"
                      placeholder="Alamat email Anda"
                      className="w-full px-4 py-2 rounded border border-ocean-700 bg-ocean-800 text-white placeholder-ocean-300 focus:outline-none focus:ring-2 focus:ring-ocean-500"
                    />
                    <Button
                      type="submit"
                      className="w-full bg-aqua-500 hover:bg-aqua-600 text-white"
                    >
                      Berlangganan
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-wave-pattern animate-wave"></div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
