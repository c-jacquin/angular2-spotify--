import { ActionReducer, Action } from '@ngrx/store';

export const FETCH_ALBUM = 'FETCH_ALBUM';
export const FETCH_ALBUM_SUCCESS = 'FETCH_ALBUM_SUCCESS';
export const FETCH_ALBUM_FAILED = 'FETCH_ALBUM_FAILED';


export interface TrackState {
  pending?: boolean;
  data?: any;
}

const initialState: TrackState = {
  pending: false,
  data: null
}

const reduceTrackData = (obj ,{ id, name, artists, preview_url, explicit, track_number, albumId }) => {
  console.log(albumId)
  obj[id] = {
    id,
    artistIds: artists.map((artist) => artist.id),
    name,
    url: preview_url,
    trackNumber: track_number,
    explicit,
    albumId
  }
  return obj;
}

export const trackReducer: ActionReducer<TrackState> = (state: TrackState = initialState, action: Action) => {
  switch (action.type) {
    case FETCH_ALBUM:
      return Object.assign({}, state, {
        pending: true,
      })

    case FETCH_ALBUM_SUCCESS:
      return Object.assign({}, state, {
        pending: false,
        data: action.payload.tracks.items
          .map((track) =>
            Object.assign({}, track, {
              albumId: action.payload.id
            })
          )
          .reduce(reduceTrackData, {})
      });

    case FETCH_ALBUM_FAILED:
      return Object.assign({}, state, {
        pending: false,
      });

    default:
      return state;
  }
}
