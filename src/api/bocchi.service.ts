import { HttpStatus, Injectable } from '@nestjs/common';
import { Anime } from './interfaces/anime.interface';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AnimeMapper } from './mapper/anime.mapper';
import { HttpException } from '@nestjs/common';
import { AxiosError } from 'axios';
import { Logger } from '@nestjs/common';

@Injectable()
export class BocchiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly animeMapper: AnimeMapper
  ) {}

  async getAnime(id: number): Promise<Anime> {
      Logger.debug(`Fetching Bocchi anime with ID: ${id}`);
      const response = await firstValueFrom(
        this.httpService.get<Anime>(`https://api.jikan.moe/v4/anime/${id}`)
      );
      
      const data = response.data.data;
      
      if (!data) {
        Logger.error(`Bocchi anime with ID ${id} not found in response data`);
        throw new HttpException(
          `Bocchi anime with ID ${id} not found`,
          HttpStatus.NOT_FOUND
        );
      }

      Logger.debug(`Successfully fetched Bocchi anime with ID: ${id}`);
      return this.animeMapper.toAnime(data);
  }
  
}
