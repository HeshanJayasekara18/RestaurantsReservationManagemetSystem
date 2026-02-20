'use client';

import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { 
  Sandwich, 
  Coffee, 
  Pizza, 
  UtensilsCrossed, // For Chicken/Seafood generic
  Dessert, // For Bakery
  Beer,
} from 'lucide-react';

import { Input } from '@/ui/input';
import { Button } from '@/ui/button';
import { MenuCategory } from './MenuCategory';
import { MenuItemCard } from './MenuItemCard';

// Mock Data
const categories = [
  { id: 'burger', label: 'Burger', icon: Sandwich },
  { id: 'pizza', label: 'Pizza', icon: Pizza },
  { id: 'beverage', label: 'Beverage', icon: Coffee },
  { id: 'chicken', label: 'Chicken', icon: UtensilsCrossed },
  { id: 'bakery', label: 'Bakery', icon: Dessert },
  { id: 'seafood', label: 'Seafood', icon: UtensilsCrossed },
];

const popularItems = [
    {
        id: 1,
        name: 'Fish Burger',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
        price: 5.59,
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=600&auto=format&fit=crop', // Burger/Sushi
        rating: 5.0,
        reviews: '1k+ User Reviews',
    },
    {
        id: 2,
        name: 'Double Burger',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
        price: 5.59,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop', // Burger
        rating: 5.0,
        reviews: '1k+ User Reviews',
    },
    {
        id: 3,
        name: 'Beef Burger',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
        price: 5.59,
        image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=600&auto=format&fit=crop', // Burger
        rating: 5.0,
        reviews: '1k+ User Reviews',
    },
    {
        id: 4,
        name: 'Cheese Burger',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
        price: 5.59,
        image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?q=80&w=600&auto=format&fit=crop', // Burger
        rating: 5.0,
        reviews: '1k+ User Reviews',
    },
];

const bestSellers = [
    {
        id: 11,
        name: 'Pepperoni Pizza',
        price: 5.59,
        description: 'Classic pepperoni pizza with extra cheese.',
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=600&auto=format&fit=crop',
        rating: 4.8,
        reviews: '800+ Reviews',
        sales: '1k',
        trend: '+15%'
    },
    {
        id: 12,
        name: 'Japanese Ramen',
        price: 5.59,
        description: 'Traditional ramen with pork broth.',
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=600&auto=format&fit=crop',
        rating: 4.9,
        reviews: '1.2k+ Reviews',
        sales: '1k',
        trend: '+15%'
    },
    {
        id: 13,
        name: 'Fried Rice',
        price: 5.59,
        description: 'Egg fried rice with green onions.',
        image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=600&auto=format&fit=crop',
        rating: 4.7,
        reviews: '500+ Reviews',
        sales: '1k',
        trend: '+15%'
    },
    {
        id: 14,
        name: 'Vegan Pizza',
        price: 5.59,
        description: 'Gluten-free vegan pizza with veggies.',
        image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?q=80&w=600&auto=format&fit=crop',
        rating: 4.6,
        reviews: '400+ Reviews',
        sales: '1k',
        trend: '+15%'
    },
];

const promoItems = [
    {
        id: 21,
        name: 'Fish Burger',
        price: 3.59,
        description: 'Discounted fish burger.',
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=600&auto=format&fit=crop',
        rating: 5.0,
        reviews: '1k+ Reviews',
        isPromo: true,
        discount: '15% Off'
    },
    {
        id: 22,
        name: 'Double Bur...',
        price: 3.59,
        description: 'Double beef patty.',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop',
        rating: 5.0,
        reviews: '1k+ Reviews',
        isPromo: true,
        discount: '15% Off'
    },
    {
        id: 23,
        name: 'Beef Burger',
        price: 3.59,
        description: 'Juicy beef burger.',
        image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=600&auto=format&fit=crop',
        rating: 5.0,
        reviews: '1k+ Reviews',
        isPromo: true,
        discount: '15% Off'
    },
];

export function MenusView() {
  const [activeCategory, setActiveCategory] = useState<string | null>('burger');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto pb-10">
       {/* Top Bar */}
       <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
                placeholder="Search menu..." 
                className="pl-10 bg-card border-none shadow-sm h-10 rounded-lg" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold">
              <Plus className="h-4 w-4 mr-2" /> Add New Menu
          </Button>
       </div>

       {/* Categories */}
       <div>
           <div className="flex justify-between items-center mb-4">
               <h2 className="text-xl font-bold">Category</h2>
               <Button variant="link" className="text-amber-500">View all</Button>
           </div>
           <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
               {categories.map(cat => (
                   <MenuCategory 
                        key={cat.id} 
                        icon={cat.icon} 
                        label={cat.label} 
                        isActive={activeCategory === cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                   />
               ))}
           </div>
       </div>

        {/* Popular This Week (Horizontal Variants) */}
        <div>
           <div className="flex justify-between items-center mb-4">
               <h2 className="text-xl font-bold">Popular This Week</h2>
               <Button variant="link" className="text-amber-500">View all</Button>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
               {popularItems.map(item => (
                   <MenuItemCard key={item.id} item={item} variant="horizontal" />
               ))}
           </div>
        </div>

        {/* Best Seller (Vertical Cards) */}
        <div>
           <div className="flex justify-between items-center mb-4">
               <h2 className="text-xl font-bold">Best Seller</h2>
               <Button variant="link" className="text-amber-500">View all</Button>
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
               {bestSellers.map(item => (
                   <MenuItemCard key={item.id} item={item} />
               ))}
           </div>
        </div>
        
        {/* Promo (Horizontal again or small cards?) Image shows horizontal-ish properties but styled like Popular */}
        <div>
           <div className="flex justify-between items-center mb-4">
               <h2 className="text-xl font-bold">Promo</h2>
               <Button variant="link" className="text-amber-500">View all</Button>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
               {promoItems.map(item => (
                   <MenuItemCard key={item.id} item={item} variant="horizontal" />
               ))}
           </div>
        </div>
    </div>
  );
}
