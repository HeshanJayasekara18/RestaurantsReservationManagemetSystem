"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/componets/common/ui/navbar";
import { MenuHero } from "@/componets/erp/customers/menu/MenuHero";
import { CategoryTabs } from "@/componets/erp/customers/menu/CategoryTabs";
import { MenuItemCard } from "@/componets/erp/customers/menu/MenuItemCard";
import { useMenuStore } from "@/lib/store/menuStore";
import { Loader2, UtensilsCrossed } from "lucide-react";

const MOCK_CATEGORIES = [
  { id: 101, name: "Starters", restaurantId: 1 },
  { id: 102, name: "Main Course", restaurantId: 1 },
  { id: 103, name: "Desserts", restaurantId: 1 },
  { id: 104, name: "Drinks", restaurantId: 1 },
];

const MOCK_ITEMS = [
  {
    id: 201,
    name: "Truffle Wagyu Sliders",
    description: "Premium wagyu beef with black truffle aioli and caramelized onions on toasted brioche.",
    price: "24.00",
    categoryId: 101,
    restaurantId: 1,
    isAvailable: true,
    imageUrl: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 202,
    name: "Lobster Thermidor",
    description: "Succulent lobster meat in a rich creamy brandy sauce, topped with Gruyère cheese.",
    price: "48.00",
    categoryId: 102,
    restaurantId: 1,
    isAvailable: true,
    imageUrl: "https://images.unsplash.com/photo-1585238341267-1cfec2046a55?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 203,
    name: "Golden Lava Soufflé",
    description: "Valrhona chocolate heart with a touch of sea salt and Madagascar vanilla gelato.",
    price: "16.00",
    categoryId: 103,
    restaurantId: 1,
    isAvailable: true,
    imageUrl: "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 204,
    name: "Hibiscus Sparkle",
    description: "Crafted botanical soda with hibiscus extract, fresh lime, and golden flakes.",
    price: "12.00",
    categoryId: 104,
    restaurantId: 1,
    isAvailable: true,
    imageUrl: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

export default function MenuPage() {
  const { categories, items, isLoading, fetchCategories, fetchItems } = useMenuStore();
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);

  useEffect(() => {
    fetchCategories(1);
    fetchItems(1);
  }, [fetchCategories, fetchItems]);

  const displayCategories = categories.length > 0 ? categories : (isLoading ? [] : MOCK_CATEGORIES);
  const displayItems = items.length > 0 ? items : (isLoading ? [] : MOCK_ITEMS);

  const filteredItems = activeCategoryId 
    ? displayItems.filter(item => item.categoryId === activeCategoryId)
    : displayItems;

  return (
    <main className="min-h-screen bg-background pb-24">
      <Navbar />
      
      <MenuHero />

      {/* Main Menu Content */}
      <div className="relative z-10">
        <CategoryTabs 
          categories={displayCategories} 
          activeCategoryId={activeCategoryId}
          onCategoryChange={setActiveCategoryId}
        />

        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary/50" />
            </div>
          ) : filteredItems.length > 0 ? (
            <>
              {!isLoading && items.length === 0 && (
                <div className="mb-12 rounded-2xl bg-amber-500/10 p-6 border border-amber-500/20">
                  <p className="text-amber-500 text-sm font-medium flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                    Preview Mode: Displaying sample signature dishes while we update our live kitchen menu.
                  </p>
                </div>
              )}
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredItems.map((item, index) => (
                  <div 
                    key={item.id}
                    className="animate-in fade-in slide-in-from-bottom-8 duration-500 fill-mode-both"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <MenuItemCard item={item} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="rounded-full bg-muted p-6 mb-4">
                <UtensilsCrossed className="h-12 w-12 text-muted-foreground/50" />
              </div>
              <h2 className="text-2xl font-serif text-foreground">No dishes found</h2>
              <p className="mt-2 text-muted-foreground max-w-sm">
                We couldn't find any menu items for this category. Please check back later or explore our other sections.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
