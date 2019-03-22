import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';

import { TvShowEffects } from './tv-show.effects';
import { StoreModule, Store } from '@ngrx/store';
import { reducers, State } from 'src/app/reducers';
import { EffectsMetadata, getEffectsMetadata } from '@ngrx/effects';
import { LoadTvShows, LoadTvShowsSuccessful, LoadTvShowsFailed } from './tv-shows.actions';
import { ApiService } from '../../services/api.service';

describe('TvShowEffects', () => {
  let effects: TvShowEffects;
  let actions$: Observable<any>;
  let metadata: EffectsMetadata<TvShowEffects>;
  let store: Store<State>;
  let mockApiService;
  const mockTvShows = [{
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
    mockApiService = jasmine.createSpyObj('ApiService', ['getTopTwentyTvShows']);
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers)
      ],
      providers: [
        TvShowEffects,
        provideMockActions(() => actions$),
        { provide: ApiService, useValue: mockApiService }
      ]
    });

    effects = TestBed.get(TvShowEffects);
    store = TestBed.get(Store);
    metadata = getEffectsMetadata(effects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadTvShows', () => {
    it('should call api.getTopTwentyTvShows', () => {
      actions$ = of(new LoadTvShows());
      mockApiService.getTopTwentyTvShows.and.returnValue(of([]));

      effects.loadTvShows$.subscribe(_ => {
        expect(mockApiService.getTopTwentyTvShows).toHaveBeenCalledTimes(1);
      });
    });

    describe('when getTopTwentyTvShows succeeds', () => {
      it('should return LoadTvShowsSuccessful action', () => {
        actions$ = of(new LoadTvShows());
        mockApiService.getTopTwentyTvShows.and.returnValue(of(mockTvShows));

        effects.loadTvShows$.subscribe(result => {
          expect(result).toEqual(new LoadTvShowsSuccessful(mockTvShows));
        });
      });
    });

    describe('when getTopTwentyTvShows fails', () => {
      it('should return LoadTvShowsFailed action', () => {
        actions$ = of(new LoadTvShows());
        mockApiService.getTopTwentyTvShows.and.returnValue(throwError(new Error('dummy error')));

        effects.loadTvShows$.subscribe(result => {
          expect(result).toEqual(new LoadTvShowsFailed());
        });
      });
    });
  });
});
