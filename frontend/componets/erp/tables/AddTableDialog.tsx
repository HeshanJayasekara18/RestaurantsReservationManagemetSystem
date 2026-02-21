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
import { Plus } from 'lucide-react';
import { useTablesStore } from '@/lib/store/tablesStore';
import { toast } from 'sonner';

export function AddTableDialog() {
  const [open, setOpen] = useState(false);
  const [tableNumber, setTableNumber] = useState('');
  const [capacity, setCapacity] = useState('');
  const [location, setLocation] = useState('Main Hall');
  
  const { createTable, isLoading } = useTablesStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tableNumber || !capacity) return;

    try {
      await createTable({
        tableNumber: parseInt(tableNumber, 10),
        capacity: parseInt(capacity, 10),
        location,
        restaurantId: 1, // hardcoded to 1 for this single-restaurant setup
        isActive: true,
      });
      toast.success('Table created successfully');
      setOpen(false);
      // Reset form
      setTableNumber('');
      setCapacity('');
      setLocation('Main Hall');
    } catch (error) {
      toast.error('Failed to create table. Table number might already exist.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" /> Add Table
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Table</DialogTitle>
            <DialogDescription>
              Create a new table for the floor plan.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tableNumber" className="text-right">
                Number
              </Label>
              <Input
                id="tableNumber"
                type="number"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                className="col-span-3"
                required
                min={1}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="capacity" className="text-right">
                Capacity
              </Label>
              <Input
                id="capacity"
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className="col-span-3"
                required
                min={1}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Main Hall, Patio, Private"
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Table'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
