import { Module } from '@nestjs/common';
import { BocchiController } from './bocchi.controller';
import { BocchiService } from './bocchi.service';
import { HttpModule } from '@nestjs/axios';
import { AnimeMapper } from './mapper/anime.mapper';

@Module({
  imports: [HttpModule],
  controllers: [BocchiController],
  providers: [BocchiService, AnimeMapper],
})
export class BocchiModule {}
