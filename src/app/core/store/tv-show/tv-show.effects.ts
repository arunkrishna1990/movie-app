import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ApiService } from '../../services/api.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { LoadTvShowsSuccessful, LoadTvShowsFailed, TvShowsActionTypes } from './tv-shows.actions';


@Injectable()
export class TvShowEffects {

  constructor(private actions$: Actions, private api: ApiService) { }

  @Effect()
  loadTvShows$ = this.actions$.pipe(
    ofType(TvShowsActionTypes.LoadTvShows),
    switchMap(_ => this.api.getTopTwentyTvShows().pipe(
      map(tvShows => new LoadTvShowsSuccessful(tvShows)),
      catchError(e => of(new LoadTvShowsFailed()))
    ))
  );
}
