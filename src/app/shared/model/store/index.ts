import { artistReducer as artist } from './artist';
import { albumReducer as album } from './album';
import { trackReducer as track } from './track';

export const store = {
    artist,
    album,
    track
}
