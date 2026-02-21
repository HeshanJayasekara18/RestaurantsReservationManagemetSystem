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

import { MenuItem } from '@/lib/types';
import { useMenuStore } from '@/lib/store/menuStore';

interface MenuItemProps {
  item: MenuItem;
  variant?: 'default' | 'horizontal';
}

export function MenuItemCard({ item, variant = 'default' }: MenuItemProps) {
  const { deleteItem } = useMenuStore();

  if (variant === 'horizontal') {
      return (
        <Card className="overflow-hidden hover:shadow-md transition-all border-border bg-card group">
            <CardContent className="p-0 flex items-center h-full">
                <div className="h-32 w-32 shrink-0 relative overflow-hidden bg-muted">
                    <img src={item.imageUrl || ''} alt={item.name} className="h-full w-full object-cover transition-transform group-hover:scale-110" />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between h-32">
                     <div className="flex justify-between items-start">
                         <div>
                             <h3 className="font-bold text-lg truncate pr-2">{item.name}</h3>
                             <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                 <span>{item.isAvailable ? 'Available' : 'Unavailable'}</span>
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
                                <DropdownMenuItem 
                                  className="text-destructive font-semibold"
                                  onClick={() => deleteItem(item.id)}
                                >
                                  Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                     </div>
                     <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{item.description}</p>
                     <div className="flex justify-between items-end mt-2">
                         <div className="flex flex-col">
                            <span className="font-bold text-lg text-primary">${Number(item.price).toFixed(2)}</span>
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
      <div className="aspect-[4/3] w-full overflow-hidden bg-muted relative">
         <img src={item.imageUrl || ''} alt={item.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
            <div>
                 <h3 className="font-bold text-lg leading-tight">{item.name}</h3>
                 <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                     <span>{item.isAvailable ? 'Available' : 'Unavailable'}</span>
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
                    <DropdownMenuItem 
                      className="text-destructive font-semibold"
                      onClick={() => deleteItem(item.id)}
                    >
                      Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>

        <p className="text-xs text-muted-foreground line-clamp-2 mb-4 h-8">{item.description}</p>
        
        <div className="flex items-center justify-between">
            <div className="flex flex-col">
                <span className="text-xl font-bold text-primary">${Number(item.price).toFixed(2)}</span>
            </div>
            <Button size="icon" className="rounded-full h-9 w-9 bg-primary text-primary-foreground shadow-lg hover:scale-105 transition-transform">
                <ShoppingCart className="h-4 w-4" />
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
