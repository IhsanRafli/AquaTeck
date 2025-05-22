
import React from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CategoryFilterProps {
  categories: string[];
  selectedCategories: string[];
  priceRange: [number, number];
  maxPrice: number;
  onCategoryChange: (category: string) => void;
  onPriceChange: (values: [number, number]) => void;
  onReset: () => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategories,
  priceRange,
  maxPrice,
  onCategoryChange,
  onPriceChange,
  onReset
}) => {
  return (
    <div className="space-y-6 p-4 bg-white rounded-lg shadow-sm">
      <div>
        <h3 className="font-medium text-lg mb-3 text-ocean-800">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox 
                id={`category-${category}`} 
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => onCategoryChange(category)}
              />
              <Label 
                htmlFor={`category-${category}`}
                className="text-sm text-gray-700 cursor-pointer"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="py-2 border-t border-gray-100">
        <h3 className="font-medium text-lg mb-3 text-ocean-800">Price Range</h3>
        <div className="px-2">
          <Slider
            value={[priceRange[0], priceRange[1]]}
            min={0}
            max={maxPrice}
            step={10}
            onValueChange={(values) => onPriceChange([values[0], values[1]])}
            className="mb-6"
          />
          <div className="flex items-center justify-between">
            <div className="w-20">
              <Label htmlFor="min-price" className="sr-only">Minimum Price</Label>
              <Input
                id="min-price"
                type="number"
                value={priceRange[0]}
                onChange={(e) => onPriceChange([parseInt(e.target.value), priceRange[1]])}
                className="text-sm h-8"
                min={0}
                max={priceRange[1]}
              />
            </div>
            <span className="text-gray-500">to</span>
            <div className="w-20">
              <Label htmlFor="max-price" className="sr-only">Maximum Price</Label>
              <Input
                id="max-price"
                type="number"
                value={priceRange[1]}
                onChange={(e) => onPriceChange([priceRange[0], parseInt(e.target.value)])}
                className="text-sm h-8"
                min={priceRange[0]}
                max={maxPrice}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-gray-100">
        <Button 
          variant="outline" 
          size="sm"
          className="w-full text-gray-600 border-gray-300 hover:bg-gray-50"
          onClick={onReset}
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default CategoryFilter;
