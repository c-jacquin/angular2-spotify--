import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';

import { Album } from '../shared/model/Album';
import { Track } from '../shared/model/Track';
import { TrackState } from '../shared/model/store/track';
import { FETCH_ALBUM, AlbumState } from '../shared/model/store/album';
import { ArtistState } from '../shared/model/store/artist';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit, OnDestroy {
  album$: Observable<Album>;
  tracks$: Observable<Track[]>;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<any>
  ) { }

  ngOnInit() {
    this.subscription = this.route.params
      .map((params: Params) => params['albumId'])
      .subscribe(
        (albumId) =>
          this.store.dispatch({ type: FETCH_ALBUM, payload: albumId })
      )

    this.album$ = this.route.params
      .map((params: Params) => params['albumId'])
      .mergeMap((albumId) =>
        this.store.select('album')
          .do((albumState) => console.log('albumStte', albumState) )
          .filter((albumState: AlbumState) => !!albumState.data)
          .map((state: AlbumState) => state.data[albumId])
          .mergeMap((album: Album) =>
            this.store.select('artist')
              .map((artistState: ArtistState) =>
                Object.assign({}, album, {
                  artists: album.artistIds.map((artistId: string) => artistState.data[artistId])
                })
              )
          )
      )

    this.tracks$ = this.album$
      .mergeMap((album) =>
        this.store.select('track')
          .filter((trackState: TrackState) => !!trackState.data)
          .map((trackState: TrackState) =>
            Object.keys(trackState.data)
              .map((trackId: string) => trackState.data[trackId])
              .filter((track: Track) => track.albumId === album.id)
          )
      )
  }

  ngOnDestroy() {

  }

}
