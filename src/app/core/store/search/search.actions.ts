import { Action } from '@ngrx/store';

export enum SearchActionTypes {
  Search = '[Search] Load Searchs'
}

export class Search implements Action {
  readonly type = SearchActionTypes.Search;

  constructor(public payload: string) {

  }
}

export type SearchActions = Search;
