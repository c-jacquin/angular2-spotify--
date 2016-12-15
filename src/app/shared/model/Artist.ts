import { Album } from './Album';
import { Image } from './Image';

export class Artist{
    id: number;
    name: string;
    genres: string[];
    url: string;
    popularity: number;
    images: Image[];
    albums?: Album[];
}
