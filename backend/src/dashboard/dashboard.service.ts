import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getStats() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // 1. Total Revenue 
    const totalRevenueResult = await this.prisma.payment.aggregate({
      _sum: {
        amount: true,
      },
    });
    const totalRevenue = Number(totalRevenueResult._sum.amount) || 0;

    // 2. Total Orders (ReservationOrders)
    const totalOrders = await this.prisma.reservationOrder.count();

    // 3. Reservations Today
    const reservationsToday = await this.prisma.reservation.count({
      where: {
        reservationDate: {
            gte: today,
            lt: tomorrow,
        },
      },
    });

    // 4. Total Customers
    const totalCustomers = await this.prisma.customer.count();

    // 5. Recent Orders (Last 5 reservations)
    const recentOrders = await this.prisma.reservation.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        customer: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      where: {
        status: { not: 'CANCELLED' } 
      }
    });

    // 6. Occupancy
    const reservationsNow = await this.prisma.reservation.findMany({
        where: {
            reservationDate: {
                equals: today
            },
            status: { in: ['CONFIRMED', 'seated'] } 
        },
        select: {
            guestCount: true
        }
    });
    const occupiedSeats = reservationsNow.reduce((sum, res) => sum + res.guestCount, 0);
    
    // Total capacity
    const totalCapacityResult = await this.prisma.diningTable.aggregate({
        where: { isActive: true },
        _sum: { capacity: true }
    });
    const totalCapacity = Number(totalCapacityResult._sum.capacity) || 0;
    
    // 7. Dynamic Chart Data (Last 6 months placeholder + current month real data)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // We compute actual payments and orders grouped by the last 6 months
    const chartData: { name: string; revenue: number; orders: number }[] = [];
    
    // Quick grouping: fetch all payments and orders from the last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1);
    sixMonthsAgo.setHours(0, 0, 0, 0);

    const paymentsLast6Months = await this.prisma.payment.findMany({
      where: { paymentDate: { gte: sixMonthsAgo } }
    });
    const reservationsLast6Months = await this.prisma.reservation.findMany({
      where: { reservationDate: { gte: sixMonthsAgo }, status: { not: 'CANCELLED' } }
    });

    for (let i = 5; i >= 0; i--) {
        const d = new Date();
        d.setMonth(d.getMonth() - i);
        const mName = months[d.getMonth()];
        const targetMonth = d.getMonth();
        const targetYear = d.getFullYear();

        const monthPayments = paymentsLast6Months.filter(
          p => p.paymentDate.getMonth() === targetMonth && p.paymentDate.getFullYear() === targetYear
        ).reduce((sum, p) => sum + Number(p.amount), 0);

        const monthOrders = reservationsLast6Months.filter(
          r => r.reservationDate.getMonth() === targetMonth && r.reservationDate.getFullYear() === targetYear
        ).length;

        chartData.push({ name: mName, revenue: monthPayments, orders: monthOrders });
    }

    // 8. Category Data for "Sales by Category" pie/bar charts
    const orderItems = await this.prisma.reservationOrder.findMany({
      include: {
        menuItem: {
          include: { category: true }
        }
      }
    });

    const categoryMap = new Map<string, number>();
    orderItems.forEach(item => {
      const catName = item.menuItem?.category?.name || 'Uncategorized';
      const saleAmount = Number(item.price) * item.quantity;
      categoryMap.set(catName, (categoryMap.get(catName) || 0) + saleAmount);
    });

    const categoryData = Array.from(categoryMap.entries()).map(([name, sales]) => ({
      name,
      sales
    })).sort((a, b) => b.sales - a.sales); // Top categories first

    return {
      revenue: totalRevenue,
      totalOrders,
      reservationsToday,
      totalCustomers,
      recentOrders: recentOrders.map(r => ({
        id: r.id,
        customer: `${r.customer.firstName} ${r.customer.lastName}`,
        amount: 0, // Pending calculation per order
        status: r.status,
      })),
      occupancy: {
          occupied: occupiedSeats,
          total: totalCapacity
      },
      revenueChart: chartData,
      categoryData: categoryData,
    };
  }
}
