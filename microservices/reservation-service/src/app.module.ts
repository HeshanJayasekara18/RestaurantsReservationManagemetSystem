import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ReservationsModule } from './reservations/reservations.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ReservationsModule,
  ],
})
export class AppModule {}
