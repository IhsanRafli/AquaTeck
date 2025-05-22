
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-ocean-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold mb-4 animate-fade-in-up">Tentang AquaTech Market</h1>
              <p className="text-ocean-100 text-lg animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Penyedia solusi teknologi terkemuka untuk akuakultur keramba jaring apung
              </p>
            </div>
          </div>
        </div>
        
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in-up">
                <h2 className="text-3xl font-bold text-ocean-900 mb-6">Misi Kami</h2>
                <p className="text-gray-600 mb-4">
                  Di AquaTech Market, kami berdedikasi untuk memajukan akuakultur berkelanjutan melalui teknologi terdepan dan pendidikan. Kami percaya bahwa budidaya ikan yang bertanggung jawab sangat penting untuk memenuhi permintaan protein dunia yang terus berkembang sambil melestarikan lautan kita.
                </p>
                <p className="text-gray-600 mb-4">
                  Perusahaan kami didirikan pada tahun 2015 oleh tim biologis kelautan dan insinyur akuakultur yang melihat kebutuhan akan peralatan yang lebih baik dan berbagi pengetahuan di industri keramba jaring apung.
                </p>
                <p className="text-gray-600">
                  Saat ini, kami melayani ribuan pembudidaya ikan di 28 negara, memberikan mereka alat dan pengetahuan yang mereka butuhkan untuk sukses di industri penting ini.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg animate-float">
                <img 
                  src="https://www.expoexhibitionstands.com/wp-content/uploads/2024/11/aquatech.webp" 
                  alt="Instalasi keramba jaring apung" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-ocean-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-ocean-900 mb-4">Nilai-nilai Kami</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Prinsip-prinsip inti ini memandu semua yang kami lakukan di AquaTech Market
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Inovasi",
                  description: "Kami terus mencari cara yang lebih baik untuk menyelesaikan tantangan yang dihadapi oleh pembudidaya ikan.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  )
                },
                {
                  title: "Keberlanjutan",
                  description: "Kami mempromosikan praktik ramah lingkungan yang melindungi lautan kita.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )
                },
                {
                  title: "Kualitas",
                  description: "Kami menyediakan produk dan pendidikan yang memenuhi standar keunggulan tertinggi.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  )
                },
                {
                  title: "Komunitas",
                  description: "Kami mendorong berbagi pengetahuan dan kolaborasi di antara para profesional akuakultur.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  )
                },
              ].map((value, index) => (
                <div 
                  key={value.title} 
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 animate-fade-in-up" 
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-ocean-600 mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-ocean-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-ocean-900 mb-4">Tim Kami</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Temui para ahli di balik kesuksesan AquaTech Market
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Dr. Emma Chen",
                  role: "Pendiri & CEO",
                  bio: "Ahli biologi kelautan dengan pengalaman 15 tahun dalam operasi akuakultur komersial.",
                  image: "https://lh5.googleusercontent.com/proxy/oaxTHLEkzFLWWpwpt_htLv7hFWHkRTngR78o9TW_090ebMeRIcfvrHVw0FsdaOA5GYnQmmnVf4wPf7X91KgiqtSKSZ3hIKvjtOJ3gY3E0ubGO9rxMIM0yU4Y0C_jn0Q"
                },
                {
                  name: "Marco Rodriguez",
                  role: "Kepala Pengembangan Produk",
                  bio: "Insinyur akuakultur yang mengkhususkan diri dalam desain keramba inovatif untuk lingkungan yang menantang.",
                  image: "data:image/jpeg;base64,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"
                },
                {
                  name: "Sophia Patel",
                  role: "Direktur Pendidikan",
                  bio: "Mantan profesor universitas dengan hasrat untuk membuat pengetahuan teknis menjadi mudah diakses.",
                  image: "https://media.licdn.com/dms/image/v2/D4E03AQFPwjZxpPu8Mw/profile-displayphoto-shrink_200_200/B4EZUozU2bGYAc-/0/1740146298870?e=2147483647&v=beta&t=aDN2giWhWBOq_imrOWt4rNgD33sC5OuyvAdh-1kQd6A"
                }
              ].map((member, index) => (
                <div 
                  key={member.name} 
                  className="text-center animate-fade-in-up" 
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="relative mx-auto w-40 h-40 rounded-full overflow-hidden mb-4">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-ocean-900 mb-1">{member.name}</h3>
                  <p className="text-aqua-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="bg-ocean-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6 animate-fade-in-up">Siap untuk mentransformasi operasi akuakultur Anda?</h2>
            <p className="text-ocean-100 max-w-2xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Bergabunglah dengan ribuan pembudidaya ikan yang telah meningkatkan hasil panen dan keberlanjutan mereka dengan AquaTech Market.
            </p>
            <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Button asChild size="lg" className="bg-white text-ocean-800 hover:bg-gray-100">
                <Link to="/products">Jelajahi Produk</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-ocean-700">
                <Link to="/contact">Hubungi Kami</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
