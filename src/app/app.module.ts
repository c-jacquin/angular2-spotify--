import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';

import { SpotifyEffects } from './shared/model/effect/spotify-effects.service';
import { SpotifyService } from './shared/model/dao/spotify.service'
import { store } from './shared/model/store';

import { AppRoutes } from './app.routes';

import { AppComponent } from './app.component';
import { ArtistComponent } from './artist/artist.component';
import { SearchComponent } from './search/search.component';
import { SearchInputComponent } from './search/search-input/search-input.component';
import { ResultListComponent } from './search/result-list/result-list.component';
import { AlbumWidgetComponent } from './artist/album-widget/album-widget.component';
import { ArtistWidgetComponent } from './artist/artist-widget/artist-widget.component';
import { AlbumComponent } from './album/album.component';
import { AlbumHeaderComponent } from './album/album-header/album-header.component';
import { TrackComponent } from './album/track/track.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SearchInputComponent,
    ResultListComponent,
    ArtistComponent,
    AlbumWidgetComponent,
    ArtistWidgetComponent,
    AlbumComponent,
    AlbumHeaderComponent,
    TrackComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    InfiniteScrollModule,
    RouterModule.forRoot(AppRoutes),
    StoreModule.provideStore(store),
    EffectsModule.run(SpotifyEffects),
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ],
  providers: [
      SpotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
