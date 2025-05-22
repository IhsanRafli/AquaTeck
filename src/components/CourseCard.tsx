
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  instructor: string;
  duration: string;
  level: 'Pemula' | 'Menengah' | 'Lanjutan';
  rating: number;
  category: string;
}

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
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

  // Function to get appropriate image based on course title and category
  const getAppropriateImage = (course: Course) => {
    // Use course's image if it's already appropriate
    if (course.image.includes("budidaya") || 
        course.image.includes("ikan") || 
        course.image.includes("laut")) {
      return course.image;
    }
    
    // Match by title keywords
    const titleLower = course.title.toLowerCase();
    if (titleLower.includes("pengantar") || titleLower.includes("dasar")) {
      return "https://sahabatbahari.com/wp-content/uploads/2020/11/KJA.jpg"; // Basic course image
    } else if (titleLower.includes("manajemen") || titleLower.includes("lanjutan")) {
      return "https://www.kkp.go.id/storage/Infografis/pengelolaan-kesehatan-ikan-dan-lingkungan-tambak-budidaya-udang-intensif65f945da628f9/cover-65f945da67852.jpg"; // Advanced management
    } else if (titleLower.includes("manajemen") || titleLower.includes("lanjutan")) {
      return "https://storage.googleapis.com/wpc-storage/cerebrum.id/2024/09/b9eabde5-akuakultur-prospek-kerja.png"; // Advanced management
    } else if (titleLower.includes("bisnis") || titleLower.includes("pengembangan")) {
      return "https://storage.googleapis.com/wpc-storage/cerebrum.id/2024/09/b9eabde5-akuakultur-prospek-kerja.png"; // Business development
    } else if (titleLower.includes("bisnis") || titleLower.includes("pengembangan")) {
      return "https://storage.googleapis.com/wpc-storage/cerebrum.id/2024/09/b9eabde5-akuakultur-prospek-kerja.png"; // Business development
    }
    
    // Match by category if title doesn't have specific keywords
    if (course.category === "Dasar-Dasar") {
      return ""; // Basics
    } else if (course.category === "Manajemen") {
      return ""; // Management
    } else if (course.category === "Bisnis") {
      return ""; // Business
    } else if (course.category === "Bisnis") {
      return ""; // Business
    }
    
    // Default image related to marine farming
    return "https://cdn-web.ruangguru.com/landing-pages/assets/hs/Pojok%20Kampus%20-%20Jurusan%20Akuakultur.jpg"; // Ocean/marine environment
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg animate-fade-in">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={getAppropriateImage(course)} 
          alt={course.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className={`absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent`}>
          <span className={`text-xs font-medium px-2 py-1 rounded ${getLevelColor(course.level)}`}>
            {course.level}
          </span>
        </div>
      </div>
      
      <CardContent className="pt-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
          <Badge variant="outline" className="bg-ocean-50 text-ocean-700 border-ocean-200">
            {course.category}
          </Badge>
        </div>
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">{course.description}</p>
        
        <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
          <span>{course.instructor}</span>
          <span>{course.duration}</span>
        </div>
        
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
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
            <span className="ml-1 text-gray-600 text-xs">({course.rating.toFixed(1)})</span>
          </div>
          <span className="ml-auto text-ocean-600 font-bold">
            Rp {Math.round(course.price * 15000).toLocaleString('id-ID')}
          </span>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Link 
          to={`/courses/${course.id}`} 
          className="w-full"
        >
          <Button 
            className="w-full bg-aqua-500 hover:bg-aqua-600 text-white"
          >
            Lihat Kursus
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
