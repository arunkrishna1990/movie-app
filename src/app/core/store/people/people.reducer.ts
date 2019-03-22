import { Action } from '@ngrx/store';
import { PeopleActionTypes, PeopleActions } from './people.actions';
import { Person } from '../../model/Person';


export interface State {
  list: Person[];
}

export const initialState: State = {
  list: []
};

export function reducer(state = initialState, action: PeopleActions): State {
  switch (action.type) {
    case PeopleActionTypes.LoadPeopleSuccessful:
      return { list: action.payload };
    default:
      return state;
  }
}
