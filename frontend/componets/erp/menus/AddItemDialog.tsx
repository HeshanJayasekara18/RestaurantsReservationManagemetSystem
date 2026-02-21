import { useState } from 'react';
import { Button } from '@/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/dialog';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import { Plus, Upload, Loader2 } from 'lucide-react';
import { useMenuStore } from '@/lib/store/menuStore';
import { menuApi } from '@/lib/api';
import { toast } from 'sonner';

export function AddItemDialog() {
  const [open, setOpen] = useState(false);
  const { createItem, categories, isLoading } = useMenuStore();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    try {
      let finalImageUrl = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop'; // Default fallback

      if (imageFile) {
        setIsUploading(true);
        const uploadRes = await menuApi.uploadImage(imageFile);
        finalImageUrl = uploadRes.data.imageUrl;
        setIsUploading(false);
      }

      await createItem({
        name,
        description,
        price, // Note: sent as string/decimal
        categoryId: categoryId ? parseInt(categoryId, 10) : undefined,
        imageUrl: finalImageUrl,
        isAvailable: true,
        restaurantId: 1, // Single restaurant hardcode
      });
      toast.success('Menu item created successfully');
      setOpen(false);
      // Reset form
      setName('');
      setDescription('');
      setPrice('');
      setCategoryId('');
      setImageFile(null);
    } catch (error) {
      setIsUploading(false);
      toast.error('Failed to create item.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold">
          <Plus className="h-4 w-4 mr-2" /> Add Menu Item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Menu Item</DialogTitle>
            <DialogDescription>
              Create a new item under a specific category.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="itemName" className="text-right">Name</Label>
              <Input
                id="itemName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="itemPrice" className="text-right">Price ($)</Label>
              <Input
                id="itemPrice"
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="itemCategory" className="text-right">Category</Label>
              {/* Simple native select for now to avoid shadcn Select boilerplate overhead */}
              <select 
                 id="itemCategory"
                 className="col-span-3 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                 value={categoryId}
                 onChange={(e) => setCategoryId(e.target.value)}
              >
                  <option value="" disabled>Select category...</option>
                  {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
              </select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="itemDesc" className="text-right">Description</Label>
              <Input
                id="itemDesc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="itemImg" className="text-right">Image</Label>
              <Input
                id="itemImg"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setImageFile(e.target.files[0]);
                  } else {
                    setImageFile(null);
                  }
                }}
                className="col-span-3 cursor-pointer"
              />
            </div>

          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading || isUploading} className="bg-amber-500 hover:bg-amber-600">
              {isUploading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...</>
              ) : isLoading ? 'Saving...' : 'Save Item'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
