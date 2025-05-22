
import React, { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CourseCard, { Course } from '@/components/CourseCard';
import CourseStatsChart from '@/components/CourseStatsChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

// Sample course data
const allCourses: Course[] = [
  {
    id: 1,
    title: "Pengantar Budidaya Ikan Laut",
    description: "Pelajari dasar-dasar budidaya ikan laut termasuk pemilihan lokasi, pemilihan spesies, dan operasi dasar.",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    instructor: "Dr. James Wilson",
    duration: "6 minggu",
    level: "Pemula",
    rating: 4.8,
    category: "Dasar-Dasar"
  },
  {
    id: 2,
    title: "Manajemen Keramba Jaring Apung Lanjutan",
    description: "Kuasai teknik pemeliharaan, optimalisasi, dan pemecahan masalah keramba jaring apung untuk hasil maksimal.",
    price: 149.99,
    image: "https://sahabatbahari.com/wp-content/uploads/2020/11/KJA.jpg",
    instructor: "Sarah Thompson, MSc",
    duration: "8 minggu",
    level: "Menengah",
    rating: 4.9,
    category: "Manajemen"
  },
  {
    id: 3,
    title: "Pengembangan Bisnis Akuakultur",
    description: "Transformasikan operasi budidaya ikan Anda menjadi bisnis yang menguntungkan dengan strategi pemasaran, keuangan, dan pertumbuhan.",
    price: 199.99,
    image: "https://sahabatbahari.com/wp-content/uploads/2020/11/KJA.jpg",
    instructor: "Michael Chen, MBA",
    duration: "10 minggu",
    level: "Lanjutan",
    rating: 4.7,
    category: "Bisnis"
  },
  {
    id: 4,
    title: "Manajemen Kesehatan Ikan",
    description: "Pelajari cara mengidentifikasi, mencegah, dan mengobati penyakit umum pada ikan budidaya laut. Termasuk teknik diagnostik praktis.",
    price: 129,
    image: "https://storage.googleapis.com/swafiles/images/2024/06/141731/1718361068_560abc16d0613f78e8d0.jpg",
    instructor: "Dr. Lisa Rodriguez",
    duration: "3 minggu",
    level: "Pemula",
    rating: 4.6,
    category: "Kesehatan"
  },
  {
    id: 5,
    title: "Praktik Akuakultur Berkelanjutan",
    description: "Terapkan teknik budidaya ikan yang ramah lingkungan yang meminimalkan dampak sambil memaksimalkan produksi.",
    price: 149.99,
    image: "https://storage.googleapis.com/swafiles/images/2024/06/141731/1718361068_560abc16d0613f78e8d0.jpg",
    instructor: "Prof. David Nguyen",
    duration: "7 minggu",
    level: "Menengah",
    rating: 4.9,
    category: "Keberlanjutan"
  },
  {
    id: 6,
    title: "Teknik Pembiakan Ikan Laut",
    description: "Kursus lanjutan yang mencakup manajemen induk, induksi pemijahan, pemeliharaan larva, dan produksi juvenil.",
    price: 219.99,
    image: "https://sahabatbahari.com/wp-content/uploads/2020/11/KJA.jpg",
    instructor: "Dr. Emma Clark",
    duration: "9 minggu",
    level: "Lanjutan",
    rating: 4.8,
    category: "Pembiakan"
  },
];

const Courses = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Extract category from URL if present
  const categoryParam = searchParams.get('category');
  
  const levels = ['Semua Level', 'Pemula', 'Menengah', 'Lanjutan'];
  const [activeLevel, setActiveLevel] = useState<string>(levels[0]);
  
  // Get all unique categories
  const categories = ['Semua Kategori', ...Array.from(new Set(allCourses.map(c => c.category)))];
  const [activeCategory, setActiveCategory] = useState<string>(
    categoryParam ? categoryParam : categories[0]
  );
  
  // Filter courses based on active filters
  const filteredCourses = allCourses.filter(course => {
    // Filter by level if not "All Levels"
    if (activeLevel !== 'Semua Level' && course.level !== activeLevel) {
      return false;
    }
    
    // Filter by category if not "All Categories"
    if (activeCategory !== 'Semua Kategori' && course.category !== activeCategory) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !course.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  // Update URL when category changes
  useEffect(() => {
    if (activeCategory !== 'Semua Kategori') {
      searchParams.set('category', activeCategory);
      setSearchParams(searchParams);
    } else if (categoryParam) {
      searchParams.delete('category');
      setSearchParams(searchParams);
    }
  }, [activeCategory, categoryParam, searchParams, setSearchParams]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-aqua-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between">
              <div className="md:w-1/2">
                <h1 className="text-4xl font-bold mb-4 animate-fade-in-up">Pendidikan Akuakultur</h1>
                <p className="text-aqua-50 max-w-lg mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  Kursus online yang dipimpin oleh ahli untuk membantu Anda menguasai teknik budidaya ikan laut dan mengembangkan bisnis akuakultur Anda.
                </p>
              </div>
              <div className="md:w-1/3 mt-6 md:mt-0 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <h3 className="text-aqua-800 font-bold text-lg mb-4">Mengapa Belajar Dengan Kami?</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-aqua-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Instruktur pakar industri
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-aqua-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Pengetahuan praktis dan aplikatif
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-aqua-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Akses seumur hidup ke materi kursus
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Grafik Statistik Kursus */}
          <div className="mb-10">
            <CourseStatsChart courses={allCourses} />
          </div>
          
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
              <Tabs 
                value={activeLevel} 
                onValueChange={setActiveLevel}
                className="w-full md:w-auto"
              >
                <TabsList className="grid w-full md:w-auto grid-cols-4">
                  {levels.map((level) => (
                    <TabsTrigger 
                      key={level} 
                      value={level}
                      className="data-[state=active]:bg-aqua-100 data-[state=active]:text-aqua-700"
                    >
                      {level}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
              
              <div className="relative w-full md:w-64">
                <Input
                  type="search"
                  placeholder="Cari kursus..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            </div>
            
            <div className="mt-6 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm ${
                    activeCategory === category
                      ? 'bg-aqua-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } transition-colors duration-200`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course, index) => (
                <div 
                  key={course.id} 
                  className="animate-fade-in-up" 
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CourseCard course={course} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium text-gray-900 mb-2">Tidak ada kursus ditemukan</h3>
              <p className="text-gray-500">Coba sesuaikan filter atau kata kunci pencarian Anda</p>
            </div>
          )}
        </div>
        
        <section className="bg-ocean-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-ocean-900 mb-4">Belajar dari Ahli Industri</h2>
              <p className="text-gray-600">
                Instruktur kami memiliki pengalaman praktis bertahun-tahun dalam operasi akuakultur komersial di seluruh dunia.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Dr. James Wilson",
                  role: "Ahli Biologi Kelautan",
                  image: "https://kuliahdimana.id/public/news/6f009b1ef1d1495f90f54671578603b1.jpg",
                  courses: 4,
                  students: 1238,
                },
                {
                  name: "Sarah Thompson, MSc",
                  role: "Spesialis Akuakultur",
                  image: "https://kuliahaja.id/blog/wp-content/uploads/2024/08/1-1-1024x683.png",
                  courses: 3,
                  students: 956,
                },
                {
                  name: "Michael Chen, MBA",
                  role: "Konsultan Bisnis Akuakultur",
                  image: "https://api.minapoli.com/media/infomina/p/medium_4fd357c71c7b1fc1310f83489fe19051.png",
                  courses: 2,
                  students: 784,
                }
              ].map((instructor, index) => (
                <div 
                  key={instructor.name} 
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={instructor.image} 
                      alt={instructor.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{instructor.name}</h3>
                    <p className="text-aqua-600 font-medium mb-3">{instructor.role}</p>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{instructor.courses} Kursus</span>
                      <span>{instructor.students.toLocaleString()} Siswa</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Courses;
