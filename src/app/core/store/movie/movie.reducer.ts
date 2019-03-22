import { MovieActions, MovieActionTypes } from './movie.actions';
import { MediaItem } from '../../model/MediaItem';


export interface State {
  list: MediaItem[];
}

export const initialState: State = {
  list: []
};

export function reducer(state = initialState, action: MovieActions): State {
  switch (action.type) {
    case MovieActionTypes.LoadMoviesSuccessful:
      return { list: action.payload };
    default:
      return state;
  }
}
