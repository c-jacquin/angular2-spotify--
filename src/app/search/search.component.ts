import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { FETCH_ARTISTS, ArtistState } from '../shared/model/store/artist';
import { Artist } from '../shared/model/Artist';

@Component({
  selector: 'spotify-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  artists$: Observable<Artist[]>;
  displaySpinner$: Observable<boolean>;
  disableInfiniteScroll$: Observable<boolean>;
  query: string;

  constructor(private store: Store<any>) { }

  search(query) {
    this.query = query;
    this.store.dispatch({ type: FETCH_ARTISTS, payload: query })
  }

  onScroll() {
    console.log('scroll')
    this.store.dispatch({ type: FETCH_ARTISTS, payload: this.query })
  }

  ngOnInit() {
    this.displaySpinner$ = this.store.select('artist')
      .map((state: ArtistState) => !state.pending)

    this.disableInfiniteScroll$ = this.store.select('artist')
      .map((state: ArtistState) => state.pending)

    this.artists$ = this.store.select('artist')
      .filter((state: ArtistState) => !!state.data)
      .map((state: ArtistState) =>
        Object.keys(state.data).map((key) => state.data[key])
      )
  }

}
