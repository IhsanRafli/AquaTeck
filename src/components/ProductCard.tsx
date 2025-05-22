
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Eye, Star, StarHalf } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating?: number; // Optional rating field
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  
  // Function to get appropriate image based on product category and name
  const getAppropriateImage = (product: Product) => {
    // Use product's image if it's already appropriate
    if (product.image.includes("budidaya") || 
        product.image.includes("ikan") || 
        product.image.includes("laut")) {
      return product.image;
    }
    
    // Get lowercase name for better matching
    const nameLower = product.name.toLowerCase();
    
    // Match by more specific category types
    if (product.category === "Kandang") {
      return "https://barakudamarine.id/wp-content/uploads/2024/10/Keramba-Apung-4.png"; // Fish cage image
    } else if (product.category === "Pemantauan" || product.category === "Teknologi") {
      if (nameLower.includes("kamera") || nameLower.includes("monitor")) {
        return "https://storage.googleapis.com/swafiles/images/2024/06/141731/1718361068_560abc16d0613f78e8d0.jpg"; // Camera/monitoring
      }
      return "https://images.unsplash.com/photo-1472396961693-142e6e269027"; // General monitoring/tech
    } else if (product.category === "Pemberian Pakan" || product.category === "Pakan") {
      if (nameLower.includes("otomatis")) {
        return "https://images.unsplash.com/photo-1487887235947-a955ef187fcc"; // Automated system
      }
      return "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac"; // Feed system
    } else if (product.category === "Obat" || nameLower.includes("obat") || nameLower.includes("kesehatan")) {
      return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR17dDROJSEHmFq3zyLr32sprNe7RmfMUpag&s"; // Medicine/health
    } else if (product.category === "Alat" || product.category === "Peralatan") {
      if (nameLower.includes("digital") || nameLower.includes("komputer") || nameLower.includes("sistem")) {
        return "data:image/jpeg;base64,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"; // Digital tools
      }
      return "https://images.unsplash.com/photo-1473091534298-04dcbce3278c"; // General tools/equipment
    } else if (product.category === "Aksesoris") {
      return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlJQXYJeeBNpMNCZmo5ylqrW37YnpYFTdUTw&s"; // Accessories
    }
    
    // Default image related to marine farming
    return "https://images.unsplash.com/photo-1500375592092-40eb2168fd21"; // Ocean/marine environment
  };
  
  // Function to render the star rating
  const renderStarRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const stars = [];
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }
    
    // Add half star if applicable
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }
    
    return (
      <div className="flex items-center">
        {stars}
        <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };
  
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg animate-fade-in">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={getAppropriateImage(product)} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-aqua-500 text-white text-xs font-semibold px-2 py-1 rounded">
          {product.category}
        </div>
      </div>
      
      <CardContent className="pt-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-2">{product.description}</p>
        <p className="text-ocean-600 font-bold">Rp {product.price.toLocaleString('id-ID')}</p>
        {product.rating && (
          <div className="mt-2">
            {renderStarRating(product.rating)}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between pt-0">
        <Link 
          to={`/products/${product.id}`}
          className="text-ocean-600 hover:text-ocean-800 font-medium flex items-center"
        >
          <Eye className="h-4 w-4 mr-1" />
          <span className="text-sm">Detail</span>
        </Link>
        <Button 
          size="sm" 
          className="bg-ocean-500 hover:bg-ocean-600 text-white"
          onClick={() => addToCart(product)}
        >
          <ShoppingBag className="h-4 w-4 mr-1" />
          Keranjang
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
