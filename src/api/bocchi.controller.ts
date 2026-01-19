import { Controller, Get } from '@nestjs/common';
import { BocchiService } from './bocchi.service';
import type { Anime } from './interfaces/anime.interface';

@Controller('bocchi')
export class BocchiController {
  constructor(private readonly bocchiService: BocchiService) {}

  @Get('season-one')
  async getSeasonOne(): Promise<Anime> {
    return await this.bocchiService.getAnime(47917);
  }

  @Get('season-two')
  async getSeasonTwo(): Promise<Anime> {
    return await this.bocchiService.getAnime(61006);
  }

  @Get('special-episode')
  async getSpecialEpisode(): Promise<Anime> {
    return await this.bocchiService.getAnime(59806);
  }

  @Get('movie')
  async getMovie(): Promise<Anime> {
    return await this.bocchiService.getAnime(55357);
  }

}
