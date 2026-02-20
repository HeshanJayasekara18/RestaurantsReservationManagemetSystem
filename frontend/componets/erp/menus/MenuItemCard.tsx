'use client';

import { Star, MoreHorizontal, ShoppingCart, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/ui/card';
import { Button } from '@/ui/button';
import { Badge } from '@/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu';

interface MenuItemProps {
  item: {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    rating: number;
    reviews: string; // e.g., "1k+ User Reviews"
    isPromo?: boolean;
    discount?: string; // e.g. "15% Off"
    sales?: string; // e.g. "Sold 1k"
    trend?: string; // e.g. "+ 15%"
  };
  variant?: 'default' | 'horizontal';
}

export function MenuItemCard({ item, variant = 'default' }: MenuItemProps) {
  if (variant === 'horizontal') {
      return (
        <Card className="overflow-hidden hover:shadow-md transition-all border-border bg-card group">
            <CardContent className="p-0 flex items-center h-full">
                <div className="h-32 w-32 shrink-0 relative overflow-hidden bg-muted">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover transition-transform group-hover:scale-110" />
                    {item.isPromo && (
                        <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 border-none rounded-sm px-1.5 py-0.5 text-xs">
                            {item.discount}
                        </Badge>
                    )}
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between h-32">
                     <div className="flex justify-between items-start">
                         <div>
                             <h3 className="font-bold text-lg truncate pr-2">{item.name}</h3>
                             <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                 <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                 <span className="font-medium text-foreground">{item.rating}</span>
                                 <span>• {item.reviews}</span>
                             </div>
                         </div>
                         <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-6 w-6 -mt-1 -mr-2 text-muted-foreground">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit Item</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                     </div>
                     <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{item.description}</p>
                     <div className="flex justify-between items-end mt-2">
                         <div className="flex flex-col">
                            {item.isPromo && <span className="text-[10px] text-muted-foreground line-through">${(item.price * 1.15).toFixed(2)}</span>}
                            <span className="font-bold text-lg text-primary">${item.price.toFixed(2)}</span>
                         </div>
                         <Button size="sm" className="rounded-full h-8 px-4 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground">
                             Add
                         </Button>
                     </div>
                </div>
            </CardContent>
        </Card>
      );
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all border-border bg-card group relative">
       {item.isPromo && (
        <Badge className="absolute top-3 left-3 z-10 bg-red-500 hover:bg-red-600 border-none rounded-sm px-2 py-0.5">
            {item.discount}
        </Badge>
       )}
      
      <div className="aspect-[4/3] w-full overflow-hidden bg-muted relative">
         <img src={item.image} alt={item.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
            <div>
                 <h3 className="font-bold text-lg leading-tight">{item.name}</h3>
                 <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                     <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                     <span className="font-medium text-foreground">{item.rating}</span>
                     <span>• {item.reviews}</span>
                 </div>
            </div>
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 text-muted-foreground">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit Item</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>

        <p className="text-xs text-muted-foreground line-clamp-2 mb-4 h-8">{item.description}</p>
        
        <div className="flex items-center justify-between">
            <div className="flex flex-col">
                <span className="text-xl font-bold text-primary">${item.price.toFixed(2)}</span>
                {item.sales && (
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <span>Sold {item.sales}</span>
                        {item.trend && <span className="text-green-500 bg-green-500/10 px-1 rounded flex items-center">{item.trend} <TrendingUp className="h-2 w-2 ml-0.5" /></span>}
                    </div>
                )}
            </div>
            <Button size="icon" className="rounded-full h-9 w-9 bg-primary text-primary-foreground shadow-lg hover:scale-105 transition-transform">
                <ShoppingCart className="h-4 w-4" />
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
