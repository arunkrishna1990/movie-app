import { Action } from '@ngrx/store';
import { MediaItem } from '../../model/MediaItem';

export enum MovieActionTypes {
  LoadMovies = '[Movie] Load Movies',
  LoadMoviesSuccessful = '[Movie] Load Movies Successful',
  LoadMoviesFailed = '[Movie] Load Movies Failed'
}

export class LoadMovies implements Action {
  readonly type = MovieActionTypes.LoadMovies;
}

export class LoadMoviesSuccessful implements Action {
  readonly type = MovieActionTypes.LoadMoviesSuccessful;

  constructor(public payload: MediaItem[]) {

  }
}

export class LoadMoviesFailed implements Action {
  readonly type = MovieActionTypes.LoadMoviesFailed;
}

export type MovieActions = LoadMovies | LoadMoviesSuccessful | LoadMoviesFailed;
