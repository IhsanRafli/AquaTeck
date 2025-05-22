
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from '@/hooks/use-mobile';
import { useCart } from '@/contexts/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const { getTotalItems } = useCart();
  const cartItemCount = getTotalItems();
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Courses', path: '/courses' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-white shadow-md w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-ocean-600 font-bold text-xl">AquaTech</span>
              <span className="ml-1 text-aqua-500 font-medium">Market</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="hidden md:flex items-center justify-center flex-1">
              <div className="flex space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="text-gray-600 hover:text-ocean-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hover:bg-ocean-100">
              <Search size={20} className="text-gray-600" />
            </Button>
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="hover:bg-ocean-100">
                <ShoppingBag size={20} className="text-gray-600" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-aqua-500 h-5 w-5 flex items-center justify-center rounded-full">
                    <span className="text-xs">{cartItemCount}</span>
                  </Badge>
                )}
              </Button>
            </Link>
            
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMobile && isOpen && (
        <div className="md:hidden animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-600 hover:text-ocean-600 block px-3 py-2 text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
