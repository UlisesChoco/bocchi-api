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
    try {
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
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      if (error instanceof AxiosError) {
        const status = error.response?.status;
        
        if (status === 404) {
          Logger.error(`Bocchi anime with ID ${id} not found in external API`);
          throw new HttpException(
            `Bocchi anime with ID ${id} not found in external API`,
            HttpStatus.NOT_FOUND
          );
        }
        
        if (status === 429) {
          Logger.error('Too many requests to external API');
          throw new HttpException(
            'Too many requests to external API. Please try again later.',
            HttpStatus.TOO_MANY_REQUESTS
          );
        }

        Logger.error('External API is unavailable');
        throw new HttpException(
          'External API is unavailable. Please try again later.',
          HttpStatus.SERVICE_UNAVAILABLE
        );
      }

      Logger.error('An unexpected error occurred');
      throw new HttpException(
        'An unexpected error occurred while fetching Bocchi anime data',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  
}
