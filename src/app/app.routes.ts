import { SearchComponent } from './search/search.component';
import { ArtistComponent } from './artist/artist.component';
import { AlbumComponent } from './album/album.component';

export const AppRoutes = [
  { path: '', component: SearchComponent },
  { path: 'artist/:artistId', component: ArtistComponent },
  { path: 'album/:albumId', component: AlbumComponent }
];
