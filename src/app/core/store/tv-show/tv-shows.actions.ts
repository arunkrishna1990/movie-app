import { Action } from '@ngrx/store';
import { MediaItem } from '../../model/MediaItem';

export enum TvShowsActionTypes {
  LoadTvShows = '[TvShows] Load TvShows',
  LoadTvShowsSuccessful = '[TvShows] Load TvShows Successful',
  LoadTvShowsFailed = '[TvShows] Load TvShows Failed',
}

export class LoadTvShows implements Action {
  readonly type = TvShowsActionTypes.LoadTvShows;
}

export class LoadTvShowsSuccessful implements Action {
  readonly type = TvShowsActionTypes.LoadTvShowsSuccessful;

  constructor(public payload: MediaItem[]) {

  }
}

export class LoadTvShowsFailed implements Action {
  readonly type = TvShowsActionTypes.LoadTvShowsFailed;
}

export type TvShowsActions = LoadTvShows | LoadTvShowsSuccessful | LoadTvShowsFailed;
