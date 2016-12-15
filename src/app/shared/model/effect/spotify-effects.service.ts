import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { SpotifyService } from '../dao/spotify.service';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import {
    FETCH_ARTISTS,
    FETCH_ARTISTS_SUCCESS,
    FETCH_ARTISTS_FAILED,
    FETCH_ARTIST,
    FETCH_ARTIST_SUCCESS,
    FETCH_ARTIST_FAILED
} from '../store/artist'

import {
  FETCH_ALBUMS,
  FETCH_ALBUMS_SUCCESS,
  FETCH_ALBUMS_FAILED,
  FETCH_ALBUM,
  FETCH_ALBUM_SUCCESS,
  FETCH_ALBUM_FAILED
} from '../store/album'

@Injectable()
export class SpotifyEffects {
  offset: number;
  constructor(
    private spotify: SpotifyService,
    private actions$: Actions,
    private store: Store<any>
  ) {
    this.store.select('artist')
      .subscribe((state: any) => {
        this.offset = state.offset;
      })
  }

  @Effect()
  artists$ = this.actions$
    .ofType(FETCH_ARTISTS)
    .mergeMap((action) =>
        this.spotify.searchMusic(action.payload, this.offset)
          .map(data => ({ type: FETCH_ARTISTS_SUCCESS, payload: data.artists }))
          .catch(() => Observable.of({ type: FETCH_ARTISTS_FAILED }))
    );

  @Effect()
  artist$ = this.actions$
    .ofType(FETCH_ARTIST)
    .mergeMap((action) =>
        this.spotify.getArtist(action.payload)
          .map(data => ({ type: FETCH_ARTIST_SUCCESS, payload: data }))
          .catch(() => Observable.of({ type: FETCH_ARTIST_FAILED }))
    );

  @Effect()
  albums$ = this.actions$
    .ofType(FETCH_ALBUMS)
    .mergeMap((action) =>
        this.spotify.getAlbums(action.payload)
          .map(data => ({ type: FETCH_ALBUMS_SUCCESS, payload: Object.assign(data, { albumId: action.payload }) }))
          .catch(() => Observable.of({ type: FETCH_ALBUMS_FAILED }))
    );

  @Effect()
  album = this.actions$
    .ofType(FETCH_ALBUM)
    .mergeMap((action) =>
      this.spotify.getAlbum(action.payload)
        .map(data => ({ type: FETCH_ALBUM_SUCCESS, payload: Object.assign(data, { albumId: action.payload }) }))
        .catch(() => Observable.of({ type: FETCH_ALBUM_FAILED }))
    )
}
