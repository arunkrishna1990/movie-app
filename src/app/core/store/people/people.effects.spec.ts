import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';

import { PeopleEffects } from './people.effects';
import { EffectsMetadata, getEffectsMetadata } from '@ngrx/effects';
import { State, reducers } from 'src/app/reducers';
import { Store, StoreModule } from '@ngrx/store';
import { ApiService } from '../../services/api.service';
import { LoadPeople, LoadPeopleSuccessful, LoadPeopleFailed } from './people.actions';

describe('PeopleEffects', () => {
  let effects: PeopleEffects;
  let actions$: Observable<any>;
  let metadata: EffectsMetadata<PeopleEffects>;
  let store: Store<State>;
  let mockApiService;
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

  beforeEach(() => {
    mockApiService = jasmine.createSpyObj('ApiService', ['getTopTwentyPeople']);
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers)
      ],
      providers: [
        PeopleEffects,
        provideMockActions(() => actions$),
        { provide: ApiService, useValue: mockApiService }
      ]
    });

    effects = TestBed.get(PeopleEffects);
    store = TestBed.get(Store);
    metadata = getEffectsMetadata(effects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadPeople', () => {
    it('should call api.getTopTwentyPeople', () => {
      actions$ = of(new LoadPeople());
      mockApiService.getTopTwentyPeople.and.returnValue(of([]));

      effects.loadPeople$.subscribe(_ => {
        expect(mockApiService.getTopTwentyPeople).toHaveBeenCalledTimes(1);
      });
    });

    describe('when getTopTwentyPeople succeeds', () => {
      it('should return LoadPeopleSuccessful action', () => {
        actions$ = of(new LoadPeople());
        mockApiService.getTopTwentyPeople.and.returnValue(of(mockPeople));

        effects.loadPeople$.subscribe(result => {
          expect(result).toEqual(new LoadPeopleSuccessful(mockPeople));
        });
      });
    });

    describe('when getTopTwentyPeople fails', () => {
      it('should return LoadPeopleFailed action', () => {
        actions$ = of(new LoadPeople());
        mockApiService.getTopTwentyPeople.and.returnValue(throwError(new Error('dummy error')));

        effects.loadPeople$.subscribe(result => {
          expect(result).toEqual(new LoadPeopleFailed());
        });
      });
    });
  });
});
