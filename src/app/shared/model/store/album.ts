import { ActionReducer, Action } from '@ngrx/store';

export const FETCH_ALBUMS = 'FETCH_ALBUMS';
export const FETCH_ALBUMS_SUCCESS = 'FETCH_ALBUMS_SUCCESS';
export const FETCH_ALBUMS_FAILED = 'FETCH_ALBUMS_FAILED';

export const FETCH_ALBUM = 'FETCH_ALBUM';
export const FETCH_ALBUM_SUCCESS = 'FETCH_ALBUM_SUCCESS';
export const FETCH_ALBUM_FAILED = 'FETCH_ALBUM_FAILED';



export interface AlbumState {
  pending?: boolean;
  data?: any;
  limit?: number;
  offset?: number;
  total?: number;
}

const initialState: AlbumState = {
  pending: false,
  data: null,
  offset: 0,
  limit: 50,
  total: 0
}

const reduceAlbumData = (obj ,{ id, name, artists, images, external_urls }) => {
  obj[id] = {
    id,
    artistIds: artists.map((artist) => artist.id),
    name,
    images,
    url: external_urls.spotify,
  }
  return obj;
}

export const albumReducer: ActionReducer<AlbumState> = (state: AlbumState = initialState, action: Action) => {
  switch (action.type) {
    case FETCH_ALBUM:
    case FETCH_ALBUMS:
      return Object.assign({}, state, {
        pending: true,
      })

    case FETCH_ALBUMS_SUCCESS:
      return Object.assign({}, state, {
        pending: false,
        offset: state.offset + action.payload.items.length,
        total: action.payload.total,
        data: action.payload.items.reduce(reduceAlbumData, {})
      });

    case FETCH_ALBUM_SUCCESS:
      return Object.assign({}, state, {
        pending: false,
        data: Object.assign({}, state.data, {
          [action.payload.id]: {
            id: action.payload.id,
            artistIds: action.payload.artists.map((artist) => artist.id),
            name: action.payload.name,
            images: action.payload.images,
            url: action.payload.external_urls.spotify,
          }
        })
      })

    case FETCH_ALBUMS_FAILED:
      return Object.assign({}, state, {
        pending: false,
      });

    default:
      return state;
  }
}
