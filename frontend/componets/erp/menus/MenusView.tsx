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

import { useEffect } from 'react';
import { useMenuStore } from '@/lib/store/menuStore';
import { AddCategoryDialog } from './AddCategoryDialog';
import { AddItemDialog } from './AddItemDialog';

export function MenusView() {
  const { categories, items, fetchCategories, fetchItems, isLoading } = useMenuStore();
  
  // Track selected category (null = 'ALL')
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch initial data
  useEffect(() => {
    fetchCategories(1);
    fetchItems(1);
  }, [fetchCategories, fetchItems]);

  // Derived state filtering
  const filteredItems = items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === null || item.categoryId === activeCategory;
      return matchesSearch && matchesCategory;
  });

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
          <div className="flex gap-2">
              <AddCategoryDialog />
              <AddItemDialog />
          </div>
       </div>

       {/* Categories */}
       <div>
           <div className="flex justify-between items-center mb-4">
               <h2 className="text-xl font-bold">Categories</h2>
           </div>
           
           <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
               {/* "All" Category Pill */}
               <MenuCategory 
                    icon={UtensilsCrossed} 
                    label="All Items" 
                    isActive={activeCategory === null}
                    onClick={() => setActiveCategory(null)}
               />
               
               {isLoading && categories.length === 0 ? (
                   <div className="text-muted-foreground pt-4 pl-4 text-sm">Loading categories...</div>
               ) : (
                   categories.map(cat => (
                       <MenuCategory 
                            key={cat.id} 
                            icon={UtensilsCrossed} // Generic icon for live DB categories
                            label={cat.name} 
                            isActive={activeCategory === cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                       />
                   ))
               )}
               {categories.length === 0 && !isLoading && (
                   <div className="text-muted-foreground pt-4 pl-4 text-sm italic">No categories created yet.</div>
               )}
           </div>
       </div>

        {/* Menu Items Grid */}
        <div>
           <div className="flex justify-between items-center mb-4">
               <h2 className="text-xl font-bold">Menu Items</h2>
           </div>

           {isLoading && items.length === 0 ? (
               <div className="text-center py-20 text-muted-foreground">Loading menu items...</div>
           ) : filteredItems.length === 0 ? (
               <div className="text-center py-20 text-muted-foreground border-2 border-dashed rounded-xl bg-card/50">
                    No items found. Change filters or add a new menu item.
               </div>
           ) : (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                   {filteredItems.map(item => (
                       <MenuItemCard key={item.id} item={item as any} /> 
                       // ^ as any needed temporarily since MenuItemCard props type has hardcoded mock fields like 'reviews' currently. We'll fix it next.
                   ))}
               </div>
           )}
        </div>
    </div>
  );
}
