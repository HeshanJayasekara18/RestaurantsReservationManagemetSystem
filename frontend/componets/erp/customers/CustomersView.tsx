'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Search, Mail, Phone, MoreHorizontal, Trophy, UserPlus, Gift, Send, Loader2 } from 'lucide-react';
import { Input } from '@/ui/input';
import { Button } from '@/ui/button';
import { Badge } from '@/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { Textarea } from '@/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/ui/dialog';
import { CustomerStats } from './CustomerStats';
import { toast } from 'sonner';
import { useCustomerStore } from '@/lib/store/customerStore';
import { AddCustomerDialog } from './AddCustomerDialog';

export function CustomersView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOfferDialogOpen, setIsOfferDialogOpen] = useState(false);
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [offerDetails, setOfferDetails] = useState({ title: '', description: '', discount: '' });
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);

  const { customers, isLoading, fetchCustomers, deleteCustomer } = useCustomerStore();

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const filteredCustomers = customers.filter(c => 
    c.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.mobileNumber.includes(searchTerm)
  );

  const handleSendOffer = () => {
    // Here you would call API to send offer
    console.log('Sending offer:', offerDetails, 'to customer ID:', selectedCustomerId ?? 'ALL');
    toast.success(selectedCustomerId ? `Offer sent to customer #${selectedCustomerId}` : 'Bulk offer sent to all eligible customers!');
    setIsOfferDialogOpen(false);
    setOfferDetails({ title: '', description: '', discount: '' });
    setSelectedCustomerId(null);
  };

  const openOfferDialog = (customerId?: number) => {
      setSelectedCustomerId(customerId ?? null);
      setOfferDetails({ title: '', description: '', discount: '' });
      setIsOfferDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Customers</h2>
          <p className="text-muted-foreground text-sm">View and manage customer details and loyalty points.</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
             <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsAddCustomerOpen(true)}>
                 <UserPlus className="h-4 w-4 mr-2" /> Add Customer
             </Button>
        </div>
      </div>

      <CustomerStats customers={customers} onSendBulkOffer={() => openOfferDialog()} />

      <div className="flex items-center gap-2 max-w-sm">
        <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
                placeholder="Search by name, email, or phone..." 
                className="pl-9 bg-background" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </div>

      <div className="rounded-md border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Customer</TableHead>
              <TableHead>Contact Info</TableHead>
              <TableHead>Loyalty Points</TableHead>
              <TableHead>Joined Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                <TableRow key={customer.id} className="hover:bg-muted/50">
                    <TableCell>
                        <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9 border border-border">
                                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${customer.firstName}${customer.lastName}`} />
                                <AvatarFallback>{customer.firstName[0]}{customer.lastName[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <span className="font-medium">{customer.firstName} {customer.lastName}</span>
                                <span className="text-xs text-muted-foreground">ID: #{customer.id}</span>
                            </div>
                        </div>
                    </TableCell>
                    <TableCell>
                        <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Mail className="h-3 w-3" /> {customer.email}
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="h-3 w-3" /> {customer.mobileNumber}
                            </div>
                        </div>
                    </TableCell>
                    <TableCell>
                        <div className="flex items-center gap-2">
                            <Trophy className="h-4 w-4 text-amber-500" />
                            <Badge variant="secondary" className="font-mono">
                                {customer.loyaltyPoints} pts
                            </Badge>
                        </div>
                    </TableCell>
                    <TableCell>
                        <span className="text-sm text-muted-foreground">
                            {format(new Date(customer.createdAt), 'MMM dd, yyyy')}
                        </span>
                    </TableCell>
                    <TableCell className="text-right">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => openOfferDialog(customer.id)}>
                                    <Gift className="h-3 w-3 mr-2" /> Send Special Offer
                                </DropdownMenuItem>
                                <DropdownMenuItem>View History</DropdownMenuItem>
                                <DropdownMenuItem>Edit Details</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive" onClick={() => deleteCustomer(customer.id)}>
                                  Delete Customer
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
                ))
            ) : (
                <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                        {isLoading ? <span className="flex items-center justify-center gap-2"><Loader2 className="h-4 w-4 animate-spin"/> Loading customers...</span> : 'No customers found.'}
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-xs text-muted-foreground">
          Showing {filteredCustomers.length} of {customers.length} customers
        </div>
      </div>

      <Dialog open={isOfferDialogOpen} onOpenChange={setIsOfferDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Send Special Offer</DialogTitle>
                <DialogDescription>
                    {selectedCustomerId 
                        ? `Send an exclusive offer to Customer #${selectedCustomerId}.` 
                        : "Send a bulk offer to all eligible customers."}
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                    <label htmlFor="title" className="text-sm font-medium">Offer Title</label>
                    <Input 
                        id="title" 
                        placeholder="e.g. 20% Off Weekend Dinner" 
                        value={offerDetails.title}
                        onChange={(e) => setOfferDetails({...offerDetails, title: e.target.value})}
                    />
                </div>
                <div className="grid gap-2">
                    <label htmlFor="discount" className="text-sm font-medium">Discount Code / Value</label>
                    <Input 
                        id="discount" 
                        placeholder="e.g. SAVE20" 
                        value={offerDetails.discount}
                        onChange={(e) => setOfferDetails({...offerDetails, discount: e.target.value})}
                    />
                </div>
                <div className="grid gap-2">
                    <label htmlFor="details" className="text-sm font-medium">Message Details</label>
                    <Textarea 
                        id="details" 
                        placeholder="Describe the offer details..." 
                        value={offerDetails.description}
                        onChange={(e) => setOfferDetails({...offerDetails, description: e.target.value})}
                    />
                </div>
            </div>
            <DialogFooter>
                <Button type="submit" onClick={handleSendOffer}>
                    <Send className="h-4 w-4 mr-2" /> Send Offer
                </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <AddCustomerDialog open={isAddCustomerOpen} onOpenChange={setIsAddCustomerOpen} />
    </div>
  );
}
