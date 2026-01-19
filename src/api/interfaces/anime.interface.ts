import { Image } from './image.interface';
import { Trailer } from './trailer.interface';
import { Aired } from './aired.interface';

export interface Anime {
    data: Data;
}

export interface Data {
    images: Image;
    trailer: Trailer;
    title_english: string;
    title_japanese: string;
    episodes: number;
    aired: Aired;
    duration: string;
    rating: string;
    synopsis: string;
    background: string;
}