import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ApiService } from '../../services/api.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { LoadMoviesSuccessful, LoadMoviesFailed, MovieActionTypes } from './movie.actions';


@Injectable()
export class MovieEffects {

  constructor(private actions$: Actions, private api: ApiService) { }

  @Effect()
  loadMovies$ = this.actions$.pipe(
    ofType(MovieActionTypes.LoadMovies),
    switchMap(_ => {
      return this.api.getTopTwentyMovies().pipe(
        map(movies => new LoadMoviesSuccessful(movies)),
        catchError(e => of(new LoadMoviesFailed()))
      );
    })
  );
}
