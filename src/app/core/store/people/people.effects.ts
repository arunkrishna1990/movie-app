import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { LoadPeopleSuccessful, LoadPeopleFailed, PeopleActionTypes } from './people.actions';
import { of } from 'rxjs';


@Injectable()
export class PeopleEffects {

  constructor(private actions$: Actions, private api: ApiService) { }

  @Effect()
  loadPeople$ = this.actions$.pipe(
    ofType(PeopleActionTypes.LoadPeople),
    switchMap(_ => this.api.getTopTwentyPeople().pipe(
      map(people => new LoadPeopleSuccessful(people)),
      catchError(e => of(new LoadPeopleFailed()))
    ))
  );
}
