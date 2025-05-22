
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Play, BookOpen, Video } from 'lucide-react';

// Data kursus contoh (sama seperti di Courses.tsx)
const allCourses = [
  {
    id: 1,
    title: "Pengantar Budidaya Ikan Laut",
    description: "Pelajari dasar-dasar budidaya ikan laut termasuk pemilihan lokasi, pemilihan spesies, dan operasi dasar.",
    price: 99.99,
    image: "https://storage.googleapis.com/swafiles/images/2024/06/141731/1718361068_560abc16d0613f78e8d0.jpg",
    instructor: "Dr. James Wilson",
    duration: "6 minggu",
    level: "Pemula",
    rating: 4.8,
    category: "Dasar-Dasar",
    videoUrl: "https://www.youtube.com/embed/7NOSDKb0HlU"
  },
  {
    id: 2,
    title: "Manajemen Keramba Jaring Apung Lanjutan",
    description: "Kuasai teknik pemeliharaan, optimalisasi, dan pemecahan masalah keramba jaring apung untuk hasil maksimal.",
    price: 149.99,
    image: "https://storage.googleapis.com/swafiles/images/2024/06/141731/1718361068_560abc16d0613f78e8d0.jpg",
    instructor: "Sarah Thompson, MSc",
    duration: "8 minggu",
    level: "Menengah",
    rating: 4.9,
    category: "Manajemen",
    videoUrl: "https://www.youtube.com/embed/2_HGubdpL_Y"
  },
  {
    id: 3,
    title: "Pengembangan Bisnis Akuakultur",
    description: "Transformasikan operasi budidaya ikan Anda menjadi bisnis yang menguntungkan dengan strategi pemasaran, keuangan, dan pertumbuhan.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    instructor: "Michael Chen, MBA",
    duration: "10 minggu",
    level: "Lanjutan",
    rating: 4.7,
    category: "Bisnis",
    videoUrl: "https://www.youtube.com/embed/ctZYN6vgB-E"
  },
  {
    id: 4,
    title: "Manajemen Kesehatan Ikan",
    description: "Pelajari cara mengidentifikasi, mencegah, dan mengobati penyakit umum pada ikan budidaya laut. Termasuk teknik diagnostik praktis.",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac",
    instructor: "Dr. Lisa Rodriguez",
    duration: "6 minggu",
    level: "Menengah",
    rating: 4.6,
    category: "Kesehatan",
    videoUrl: "https://www.youtube.com/embed/YU89HHRV5HA"
  },
  {
    id: 5,
    title: "Praktik Akuakultur Berkelanjutan",
    description: "Terapkan teknik budidaya ikan yang ramah lingkungan yang meminimalkan dampak sambil memaksimalkan produksi.",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    instructor: "Prof. David Nguyen",
    duration: "7 minggu",
    level: "Menengah",
    rating: 4.9,
    category: "Keberlanjutan",
    videoUrl: "https://www.youtube.com/embed/fwkYdRVbFYM"
  },
  {
    id: 6,
    title: "Teknik Pembiakan Ikan Laut",
    description: "Kursus lanjutan yang mencakup manajemen induk, induksi pemijahan, pemeliharaan larva, dan produksi juvenil.",
    price: 219.99,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    instructor: "Dr. Emma Clark",
    duration: "9 minggu",
    level: "Lanjutan",
    rating: 4.8,
    category: "Pembiakan",
    videoUrl: "https://www.youtube.com/embed/b8pOkhOqzOY"
  },
];

// Struktur data untuk konten kursus
const courseContent = [
  {
    title: "Minggu 1: Pengantar",
    items: [
      { title: "Pengenalan Akuakultur", duration: "10:15", type: "video" },
      { title: "Sejarah Budidaya Ikan Laut", duration: "15:30", type: "video" },
      { title: "Membaca: Dasar-dasar Akuakultur", type: "reading" },
      { title: "Kuis Minggu 1", type: "quiz" }
    ]
  },
  {
    title: "Minggu 2: Pemilihan Lokasi",
    items: [
      { title: "Faktor Penting dalam Pemilihan Lokasi", duration: "12:45", type: "video" },
      { title: "Analisis Kualitas Air", duration: "14:20", type: "video" },
      { title: "Studi Kasus: Pemilihan Lokasi yang Sukses", type: "reading" },
      { title: "Kuis Minggu 2", type: "quiz" }
    ]
  },
  {
    title: "Minggu 3: Teknik Budidaya",
    items: [
      { title: "Desain dan Konstruksi Keramba", duration: "18:10", type: "video" },
      { title: "Manajemen Kepadatan Stok", duration: "11:55", type: "video" },
      { title: "Membaca: Praktik Terbaik Budidaya", type: "reading" },
      { title: "Kuis Minggu 3", type: "quiz" }
    ]
  }
];

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Temukan kursus dengan ID yang cocok
  const course = allCourses.find(c => c.id === Number(id));
  
  // Tangani kasus ketika kursus tidak ditemukan
  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Kursus Tidak Ditemukan</h1>
            <p className="text-gray-600 mb-6">Maaf, kursus yang Anda cari tidak dapat ditemukan.</p>
            <Link to="/courses" className="text-aqua-600 hover:text-aqua-700 font-medium flex items-center justify-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Kursus
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const getLevelColor = (level: string) => {
    switch(level) {
      case 'Pemula':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Menengah':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Lanjutan':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-gradient-to-b from-aqua-600 to-aqua-700 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/courses" className="text-aqua-100 hover:text-white font-medium flex items-center mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Kursus
            </Link>
            <div className="md:flex md:justify-between md:items-start">
              <div className="md:w-2/3 mb-8 md:mb-0 md:pr-8">
                <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
                <p className="text-aqua-100 mb-6">{course.description}</p>
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className={`text-xs font-medium px-2 py-1 rounded ${getLevelColor(course.level)}`}>
                    {course.level}
                  </span>
                  <span className="text-sm text-aqua-100">{course.duration}</span>
                  <span className="text-sm text-aqua-100">•</span>
                  <span className="text-sm text-aqua-100">{course.instructor}</span>
                  <span className="text-sm text-aqua-100">•</span>
                  <div className="flex items-center">
                    <div className="flex text-yellow-300 mr-1">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(course.rating) ? "fill-current" : "stroke-current fill-none"}`} 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          />
                        </svg>
                      ))}
                    </div>
                    <span className="text-aqua-100">({course.rating.toFixed(1)})</span>
                  </div>
                </div>
              </div>
              <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4 overflow-hidden rounded-lg">
                  <img src={course.image} alt={course.title} className="w-full h-40 object-cover" />
                </div>
                <p className="text-3xl font-bold text-gray-800 mb-4">Rp {Math.round(course.price * 15000).toLocaleString('id-ID')}</p>
                <Button className="w-full bg-aqua-500 hover:bg-aqua-600 mb-3">
                  Beli Kursus Ini
                </Button>
                <p className="text-sm text-center text-gray-500 mb-4">Garansi uang kembali 30 hari</p>
                <ul className="text-sm text-gray-600">
                  <li className="flex items-center mb-2">
                    <Video className="h-4 w-4 mr-2 text-aqua-500" />
                    <span>20+ jam konten video</span>
                  </li>
                  <li className="flex items-center mb-2">
                    <BookOpen className="h-4 w-4 mr-2 text-aqua-500" />
                    <span>12 artikel & sumber daya</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-aqua-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 3a1 1 0 011-1h6a1 1 0 011 1v12a1 1 0 01-1 1H7a1 1 0 01-1-1V3zm1-1a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7z" clipRule="evenodd" />
                      <path fillRule="evenodd" d="M11 11V9a1 1 0 10-2 0v2a1 1 0 102 0z" clipRule="evenodd" />
                    </svg>
                    <span>Akses seumur hidup</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs defaultValue="overview" className="w-full" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="overview">Ikhtisar</TabsTrigger>
              <TabsTrigger value="content">Konten Kursus</TabsTrigger>
              <TabsTrigger value="video">Video</TabsTrigger>
              <TabsTrigger value="reviews">Ulasan</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Tentang Kursus Ini</h2>
                <p className="text-gray-700 mb-4">
                  Kursus ini dirancang untuk memberi Anda pemahaman menyeluruh tentang budidaya ikan laut dalam keramba jaring apung. 
                  Anda akan mempelajari dasar-dasar teknik budidaya, pemilihan lokasi yang tepat, manajemen kualitas air, dan strategi
                  pemasaran untuk membangun operasi budidaya ikan yang sukses dan berkelanjutan.
                </p>
                <p className="text-gray-700">
                  Dipimpin oleh {course.instructor}, seorang ahli industri dengan pengalaman lebih dari 15 tahun dalam budidaya ikan laut komersial,
                  kursus ini menggabungkan teori dan praktik untuk memberikan wawasan berharga untuk pemula dan praktisi berpengalaman.
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold mb-4">Apa yang Akan Anda Pelajari</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                  {[
                    "Prinsip dasar budidaya ikan laut",
                    "Pemilihan dan evaluasi lokasi",
                    "Desain dan instalasi sistem keramba",
                    "Pemantauan kualitas air yang efektif",
                    "Manajemen kesehatan ikan",
                    "Strategi pemberian pakan yang optimal",
                    "Teknik pemanenan dan pasca panen",
                    "Pemasaran dan ekonomi akuakultur"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-aqua-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold mb-4">Persyaratan</h2>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li>Tidak diperlukan pengalaman sebelumnya dalam budidaya ikan</li>
                  <li>Pemahaman dasar tentang biologi akan membantu, tetapi tidak wajib</li>
                  <li>Minat dalam akuakultur dan kemauan untuk belajar</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="content">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold mb-6">Konten Kursus</h2>
                
                {courseContent.map((section, index) => (
                  <div key={index} className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 font-medium">
                      {section.title}
                    </div>
                    <div className="divide-y">
                      {section.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center justify-between px-4 py-3">
                          <div className="flex items-center">
                            {item.type === 'video' ? (
                              <Play className="h-4 w-4 mr-3 text-aqua-500" />
                            ) : item.type === 'reading' ? (
                              <BookOpen className="h-4 w-4 mr-3 text-aqua-500" />
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-3 text-aqua-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                              </svg>
                            )}
                            <span className="text-gray-700">{item.title}</span>
                          </div>
                          {item.duration && <span className="text-sm text-gray-500">{item.duration}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="video">
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Video Pengantar Kursus</h2>
                
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                  <iframe 
                    src={course.videoUrl} 
                    title={`Video Pengantar: ${course.title}`} 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="w-full h-[500px]"
                  />
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Deskripsi Video</h3>
                  <p className="text-gray-700">
                    Video pengantar ini memberikan gambaran tentang apa yang akan Anda pelajari dalam kursus "{course.title}". 
                    Instruktur {course.instructor} menjelaskan konsep utama yang akan dibahas dan bagaimana kursus ini 
                    akan membantu Anda mengembangkan keterampilan dalam budidaya ikan laut.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Materi Tambahan</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-aqua-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                      </svg>
                      <a href="#" className="text-aqua-600 hover:text-aqua-700">Panduan Kursus (PDF)</a>
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-aqua-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                      </svg>
                      <a href="#" className="text-aqua-600 hover:text-aqua-700">Daftar Istilah Akuakultur</a>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews">
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Ulasan Kursus</h2>
                
                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-xl font-bold">{course.rating.toFixed(1)} dari 5</div>
                      <div className="flex text-yellow-400 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            className={`h-5 w-5 ${i < Math.floor(course.rating) ? "fill-current" : "stroke-current fill-none"}`} 
                            viewBox="0 0 24 24"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth="2" 
                              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-700">Berdasarkan 128 ulasan</div>
                      <Button variant="outline" className="mt-2">
                        Tulis Ulasan
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {[
                      { stars: 5, percentage: 76 },
                      { stars: 4, percentage: 18 },
                      { stars: 3, percentage: 4 },
                      { stars: 2, percentage: 2 },
                      { stars: 1, percentage: 0 }
                    ].map(item => (
                      <div key={item.stars} className="flex items-center">
                        <span className="w-20 text-sm text-gray-600">{item.stars} bintang</span>
                        <div className="flex-1 mx-3">
                          <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-yellow-400 rounded-full" 
                              style={{ width: `${item.percentage}%` }} 
                            ></div>
                          </div>
                        </div>
                        <span className="w-10 text-sm text-gray-600">{item.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="divide-y">
                  {[
                    {
                      name: "Budi Santoso",
                      rating: 5,
                      date: "2 minggu yang lalu",
                      comment: "Kursus ini sangat bermanfaat dan komprehensif. Saya telah belajar banyak tentang budidaya ikan laut dan sekarang siap untuk memulai usaha saya sendiri."
                    },
                    {
                      name: "Anita Wijaya",
                      rating: 4,
                      date: "1 bulan yang lalu",
                      comment: "Instruktur sangat berpengalaman dan materi disampaikan dengan jelas. Satu-satunya kekurangan adalah kurangnya contoh studi kasus dari Indonesia."
                    },
                    {
                      name: "Dimas Prakoso",
                      rating: 5,
                      date: "2 bulan yang lalu",
                      comment: "Saya sangat merekomendasikan kursus ini untuk siapa saja yang tertarik dengan akuakultur. Video dan materi pendukung sangat berkualitas."
                    }
                  ].map((review, index) => (
                    <div key={index} className="py-6">
                      <div className="flex items-center mb-2">
                        <div className="h-10 w-10 bg-aqua-100 text-aqua-700 rounded-full flex items-center justify-center font-medium mr-3">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium">{review.name}</div>
                          <div className="flex items-center">
                            <div className="flex text-yellow-400 mr-2">
                              {[...Array(5)].map((_, i) => (
                                <svg 
                                  key={i} 
                                  className={`h-4 w-4 ${i < review.rating ? "fill-current" : "stroke-current fill-none"}`} 
                                  viewBox="0 0 24 24"
                                >
                                  <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth="2" 
                                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                  />
                                </svg>
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CourseDetail;
