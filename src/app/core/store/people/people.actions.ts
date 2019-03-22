import { Action } from '@ngrx/store';
import { Person } from '../../model/Person';

export enum PeopleActionTypes {
  LoadPeople = '[People] Load People',
  LoadPeopleSuccessful = '[People] Load People Successful',
  LoadPeopleFailed = '[People] Load People Failed',
}

export class LoadPeople implements Action {
  readonly type = PeopleActionTypes.LoadPeople;
}

export class LoadPeopleSuccessful implements Action {
  readonly type = PeopleActionTypes.LoadPeopleSuccessful;

  constructor(public payload: Person[]) {

  }
}

export class LoadPeopleFailed implements Action {
  readonly type = PeopleActionTypes.LoadPeopleFailed;
}

export type PeopleActions = LoadPeople | LoadPeopleSuccessful | LoadPeopleFailed;
