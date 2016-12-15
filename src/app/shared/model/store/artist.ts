import { ActionReducer, Action } from '@ngrx/store';
import { FETCH_ALBUM_SUCCESS } from './album'

export const FETCH_ARTISTS = 'FETCH_ARTISTS';
export const FETCH_ARTISTS_SUCCESS = 'FETCH_ARTISTS_SUCCESS';
export const FETCH_ARTISTS_FAILED = 'FETCH_ARTISTS_FAILED';

export const FETCH_ARTIST = 'FETCH_ARTIST';
export const FETCH_ARTIST_SUCCESS = 'FETCH_ARTIST_SUCCESS';
export const FETCH_ARTIST_FAILED = 'FETCH_ARTIST_FAILED';


export interface ArtistState {
  pending?: boolean;
  data?: any;
  limit?: number;
  offset?: number;
  total?: number;
}

const initialState: ArtistState = {
  pending: false,
  data: null,
  offset: 0,
  limit: 50,
  total: 0
}

const reduceArtistData = (obj ,{ id, name, genres, images, external_urls, popularity }) => {
  obj[id] = Object.assign({}, {
    id,
    name,
    genres,
    images,
    url: external_urls.spotify,
    popularity
  },  obj[id] || {})
  return obj;
}

export const artistReducer: ActionReducer<ArtistState> = (state: ArtistState = initialState, action: Action) => {
  switch (action.type) {
    case FETCH_ARTIST:
    case FETCH_ARTISTS:
      return Object.assign({}, state, {
        pending: true,
      })

    case FETCH_ARTIST_SUCCESS:
      return Object.assign({}, state, {
        pending: false,
        data: Object.assign({}, state.data, {
          [action.payload.id]: [action.payload].reduce(reduceArtistData)
        })
      })

    case FETCH_ARTISTS_SUCCESS:
      return Object.assign({}, state, {
        pending: false,
        offset: state.offset + action.payload.items.length,
        total: action.payload.total,
        data: Object.assign({}, state.data, action.payload.items.reduce(reduceArtistData, {}))
      });

    case FETCH_ALBUM_SUCCESS:
      return Object.assign({}, state, {
        data: action.payload.artists
          .reduce(reduceArtistData, {})
      })

    case FETCH_ARTISTS_FAILED:
      return Object.assign({}, state, {
        pending: false,
      });

    default:
      return state;
  }
}
