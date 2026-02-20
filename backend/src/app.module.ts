import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControllerController } from './controllers/controller.controller';
import { ServiceService } from './services/service.service';
import { SupabaseModule } from './supabase/supabase.module';
import { PrismaModule } from './prisma/prisma.module';
import { CustomersModule } from './customers/customers.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { ReservationsModule } from './reservations/reservations.module';
import { MenuModule } from './menu/menu.module';
import { TablesModule } from './tables/tables.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SupabaseModule,
    PrismaModule,
    AuthModule,
    CustomersModule,
    RestaurantsModule,
    ReservationsModule,
    MenuModule,
    TablesModule,
  ],
  controllers: [AppController, ControllerController],
  providers: [AppService, ServiceService],
})
export class AppModule {}
