import { Action } from '@ngrx/store';
import { SearchActions, SearchActionTypes } from './search.actions';


export interface State {
  searchTerm: string;
}

export const initialState: State = {
  searchTerm: null
};

export function reducer(state = initialState, action: SearchActions): State {
  switch (action.type) {
    case SearchActionTypes.Search:
      return { searchTerm: action.payload };
    default:
      return state;
  }
}
