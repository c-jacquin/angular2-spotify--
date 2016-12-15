import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';

import { Artist } from '../shared/model/Artist';
import { Album } from '../shared/model/Album';

import { ArtistState } from '../shared/model/store/artist';
import { AlbumState } from '../shared/model/store/album';

import { FETCH_ALBUMS } from '../shared/model/store/album';
import { FETCH_ARTIST } from '../shared/model/store/artist';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit, OnDestroy {
  artist$: Observable<Artist>;
  albums$: Observable<Album[]>
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<any>
  ) { }

  private mapAlbumsToArtist = (artist) => (albumState: AlbumState) => {
    return Object.keys(albumState.data)
      .map((albumId) => albumState.data[albumId])
      .filter((album) => album.artistIds.indexOf(artist.id) !== -1);
  }

  ngOnInit() {

    this.subscription = this.route.params
      .map((params: Params) => params['artistId'])
      .subscribe(
        (artistId) => {
          this.store.dispatch({ type: FETCH_ARTIST, payload: artistId })
          this.store.dispatch({ type: FETCH_ALBUMS, payload: artistId })
        })

    this.artist$ =  this.route.params
      .map((params: Params) => params['artistId'])
      .mergeMap((artistId) =>
        this.store.select('artist')
          .filter((artistState: ArtistState) => !!artistState.data)
          .map((state: ArtistState) => state.data[artistId])
      )

    this.albums$ = this.artist$
      .filter((artist) => !!artist)
      .mergeMap((artist) =>
        this.store.select('album')
          .filter((albumState: AlbumState) => !!albumState.data)
          .map(this.mapAlbumsToArtist(artist))
      )

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
