import { Module } from '@nestjs/common';
import { BocchiModule } from './api/bocchi.module';

@Module({
  imports: [BocchiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
