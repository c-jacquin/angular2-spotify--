import { Image } from './Image';
import { Artist } from './Artist';

export class Album{
    id: string;
    artistIds: string[];
    artists?: Artist[];
    name: string;
    images: Image[];
    url: string;
}
