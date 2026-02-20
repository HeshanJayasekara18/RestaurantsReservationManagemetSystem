// ── Staff ─────────────────────────────────────────────────────────────────────
export type StaffRole = 'ADMIN' | 'MANAGER' | 'WAITER' | 'KITCHEN';

export interface Staff {
  id: number;
  name: string;
  email: string;
  role: StaffRole;
  isActive: boolean;
  createdAt: string;
}

// ── Customer ──────────────────────────────────────────────────────────────────
export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  loyaltyPoints: number;
  createdAt: string;
}

// ── Table ─────────────────────────────────────────────────────────────────────
export interface DiningTable {
  id: number;
  restaurantId: number;
  tableNumber: number;
  capacity: number;
  location?: string;
  isActive: boolean;
}

// ── Menu ──────────────────────────────────────────────────────────────────────
export interface MenuCategory {
  id: number;
  restaurantId: number;
  name: string;
}

export interface MenuItem {
  id: number;
  restaurantId: number;
  categoryId?: number;
  name: string;
  description?: string;
  price: string; // Prisma Decimal comes as string
  imageUrl?: string;
  isAvailable: boolean;
}

// ── Reservation ───────────────────────────────────────────────────────────────
export type ReservationStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

export interface Reservation {
  id: number;
  restaurantId: number;
  customerId: number;
  tableId?: number;
  reservationDate: string;
  startTime: string;
  endTime?: string;
  guestCount: number;
  status: ReservationStatus;
  specialRequest?: string;
  createdAt: string;
  customer?: Customer;
  table?: DiningTable;
}

// ── Auth ──────────────────────────────────────────────────────────────────────
export interface AuthUser {
  id: number;
  name?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  role: StaffRole | 'CUSTOMER';
}
