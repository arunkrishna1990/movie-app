import { reducer, initialState } from './people.reducer';
import { LoadPeopleSuccessful, LoadPeopleFailed } from './people.actions';

describe('People Reducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('when load people is successful', () => {
    it('should return the new state with the list of people', () => {
      const mockPeople = [{
        id: 1,
        name: 'DummyName',
        profilePath: 'dummypath',
        knownFor: []
      }, {
        id: 2,
        name: 'DummyNam2',
        profilePath: 'dummypat2',
        knownFor: []
      }, {
        id: 3,
        name: 'DummyNam3',
        profilePath: 'dummypat3',
        knownFor: []
      }];

      const result = reducer(initialState, new LoadPeopleSuccessful(mockPeople));

      expect(result).toEqual({ list: mockPeople });
    });
  });

  describe('when load people fails', () => {
    it('should return the current state', () => {
      const result = reducer(initialState, new LoadPeopleFailed());

      expect(result).toEqual(initialState);
    });
  });
});
