import { Action } from '@ngrx/store';
import { TvShowsActions, TvShowsActionTypes } from './tv-shows.actions';
import { MediaItem } from '../../model/MediaItem';


export interface State {
  list: MediaItem[];
}

export const initialState: State = {
  list: []
};

export function reducer(state = initialState, action: TvShowsActions): State {
  switch (action.type) {
    case TvShowsActionTypes.LoadTvShowsSuccessful:
      return { list: action.payload };
    default:
      return state;
  }
}
