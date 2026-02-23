import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { AuthProxyController } from './proxy/auth.proxy.controller';
import { CustomersProxyController } from './proxy/customers.proxy.controller';
import { ReservationsProxyController } from './proxy/reservations.proxy.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule,
  ],
  controllers: [
    AuthProxyController,
    CustomersProxyController,
    ReservationsProxyController,
  ],
})
export class AppModule {}
