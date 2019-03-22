import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';

import { MovieEffects } from './movie.effects';
import { EffectsMetadata, getEffectsMetadata } from '@ngrx/effects';
import { State, reducers } from 'src/app/reducers';
import { ApiService } from '../../services/api.service';
import { StoreModule, Store } from '@ngrx/store';
import { LoadMovies, LoadMoviesSuccessful, LoadMoviesFailed } from './movie.actions';

describe('MovieEffects', () => {
  let effects: MovieEffects;
  let actions$: Observable<any>;
  let metadata: EffectsMetadata<MovieEffects>;
  let store: Store<State>;
  let mockApiService;
  const mockMovies = [{
    id: 1,
    voteAverage: 60,
    backdropPath: 'https://backdropurl/',
    overview: 'DummyOverview',
    posterPath: 'https://posterurl/',
    releaseDate: new Date(),
    title: 'DummyTitle',
    genreIds: undefined
  }, {
    id: 2,
    voteAverage: 60,
    backdropPath: 'https://backdropurl/',
    overview: 'DummyOverview2',
    posterPath: 'https://posterurl/',
    releaseDate: new Date(),
    title: 'DummySomeTitle2',
    genreIds: undefined
  }, {
    id: 3,
    voteAverage: 60,
    backdropPath: 'https://backdropurl/',
    overview: 'DummySomeOverview3',
    posterPath: 'https://posterurl/',
    releaseDate: new Date(),
    title: 'DummyTitle3',
    genreIds: undefined
  }, {
    id: 3,
    voteAverage: 60,
    backdropPath: 'https://backdropurl/',
    overview: 'DummyOverview3',
    posterPath: 'https://posterurl/',
    releaseDate: new Date(),
    title: 'DummyTitle3 Some',
    genreIds: undefined
  }];

  beforeEach(() => {
    mockApiService = jasmine.createSpyObj('ApiService', ['getTopTwentyMovies']);
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers)
      ],
      providers: [
        MovieEffects,
        provideMockActions(() => actions$),
        { provide: ApiService, useValue: mockApiService }
      ]
    });

    effects = TestBed.get(MovieEffects);
    store = TestBed.get(Store);
    metadata = getEffectsMetadata(effects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadMovies', () => {
    it('should call api.getTopTwentyMovies', () => {
      actions$ = of(new LoadMovies());
      mockApiService.getTopTwentyMovies.and.returnValue(of([]));

      effects.loadMovies$.subscribe(_ => {
        expect(mockApiService.getTopTwentyMovies).toHaveBeenCalledTimes(1);
      });
    });

    describe('when getTopTwentyMovies succeeds', () => {
      it('should return LoadMoviesSuccessful action', () => {
        actions$ = of(new LoadMovies());
        mockApiService.getTopTwentyMovies.and.returnValue(of(mockMovies));

        effects.loadMovies$.subscribe(result => {
          expect(result).toEqual(new LoadMoviesSuccessful(mockMovies));
        });
      });
    });

    describe('when getTopTwentyMovies fails', () => {
      it('should return LoadMoviesFailed action', () => {
        actions$ = of(new LoadMovies());
        mockApiService.getTopTwentyMovies.and.returnValue(throwError(new Error('dummy error')));

        effects.loadMovies$.subscribe(result => {
          expect(result).toEqual(new LoadMoviesFailed());
        });
      });
    });
  });
});
