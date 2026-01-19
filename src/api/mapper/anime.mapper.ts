import { Anime } from "../interfaces/anime.interface";

export class AnimeMapper {
    toAnime(data: any): Anime {
        const anime: Anime = {
        data: {
          images: {
            jpg: {
              image_url: data.images.jpg.image_url
            }
          },
          trailer: {
            embed_url: data.trailer.embed_url
          },
          title_english: data.title_english,
          title_japanese: data.title_japanese,
          episodes: data.episodes,
          aired: {
            from: data.aired.from,
            to: data.aired.to
          },
          duration: data.duration,
          rating: data.rating,
          synopsis: data.synopsis,
          background: data.background
        }
      }
      return anime;
    }
}