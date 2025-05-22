
import React from 'react';
import CourseCard, { Course } from './CourseCard';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

// Sample course data
const courses: Course[] = [
  {
    id: 1,
    title: "Pengantar Budidaya Ikan Laut",
    description: "Pelajari dasar-dasar budidaya ikan laut termasuk pemilihan lokasi, pemilihan spesies, dan operasi dasar.",
    price: 99.99,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw_AznDYZ6XkxTkO7KiRGQwSxWnCKW6AyplA&s",
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
    image: "https://storage.googleapis.com/swafiles/images/2024/06/141731/1718361068_560abc16d0613f78e8d0.jpg",
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
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    instructor: "Michael Chen, MBA",
    duration: "10 minggu",
    level: "Lanjutan",
    rating: 4.7,
    category: "Bisnis"
  },
];

const FeaturedCourses = () => {
  return (
    <section className="py-16 bg-ocean-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-ocean-900">Kursus Unggulan</h2>
          <p className="text-gray-600 mt-2">Tingkatkan pengetahuan dan keterampilan akuakultur Anda</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div 
              key={course.id} 
              className="animate-fade-in-up" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CourseCard course={course} />
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button 
            asChild
            size="lg"
            variant="outline"
            className="border-ocean-600 text-ocean-600 hover:bg-ocean-50"
          >
            <Link to="/courses">
              Lihat Semua Kursus
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
