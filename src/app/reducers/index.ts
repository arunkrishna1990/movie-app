import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { State as MovieState, reducer as MovieReducer } from '../core/store/movie';
import { State as PeopleState, reducer as PeopleReducer } from '../core/store/people';
import { State as TvShowsState, reducer as TvShowsReducer } from '../core/store/tv-show';
import { State as SearchState, reducer as SearchReducer } from '../core/store/search';

export interface State {
  movies: MovieState;
  people: PeopleState;
  tvShows: TvShowsState;
  search: SearchState;
}

export const reducers: ActionReducerMap<State> = {
  movies: MovieReducer,
  people: PeopleReducer,
  tvShows: TvShowsReducer,
  search: SearchReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
