import { reducer, initialState } from './movie.reducer';
import { LoadMoviesSuccessful, LoadMoviesFailed } from './movie.actions';

describe('Movie Reducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('when load movies is successful', () => {
    it('should return the new state with the list of movies', () => {
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

      const result = reducer(initialState, new LoadMoviesSuccessful(mockMovies));

      expect(result).toEqual({ list: mockMovies });
    });
  });

  describe('when load movies fails', () => {
    it('should return the current state', () => {
      const result = reducer(initialState, new LoadMoviesFailed());

      expect(result).toEqual(initialState);
    });
  });
});
