import { TestBed, inject } from '@angular/core/testing';

import { ApiService } from './api.service';
import { never, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MediaItem } from '../model/MediaItem';
import { Person, IPersonResponse } from '../model/Person';

describe('ApiService', () => {
  let apiService: ApiService, mockHttpClient;
  beforeEach(() => {
    mockHttpClient = jasmine.createSpyObj('HttpClient', ['get']);
    apiService = new ApiService(mockHttpClient);
  });

  describe('getTopTwentyMovies', () => {
    it('should call http client with the correct url', () => {
      mockHttpClient.get.and.returnValue(of([]));

      apiService.getTopTwentyMovies();

      const expectedUrl = `${environment.apiHost}/movie/popular?api_key=${environment.apiKey}&language=${navigator.language}&page=1`;
      expect(mockHttpClient.get).toHaveBeenCalledWith(expectedUrl);
    });

    describe('when api request is successful', () => {
      const mockResponse = {
        'page': 1,
        'total_results': 19823,
        'total_pages': 992,
        'results': [
          {
            'vote_count': 1084,
            'id': 166428,
            'video': false,
            'vote_average': 7.8,
            'title': 'How to Train Your Dragon: The Hidden World',
            'popularity': 449.528,
            'poster_path': '/xvx4Yhf0DVH8G4LzNISpMfFBDy2.jpg',
            'original_language': 'en',
            'original_title': 'How to Train Your Dragon: The Hidden World',
            'genre_ids': [
              16,
              10751,
              12
            ],
            'backdrop_path': '/h3KN24PrOheHVYs9ypuOIdFBEpX.jpg',
            'adult': false,
            'overview': 'DummyOverview',
            'release_date': '2019-01-03'
          },
          {
            'vote_count': 2458,
            'id': 299537,
            'video': false,
            'vote_average': 7.3,
            'title': 'Captain Marvel',
            'popularity': 366.817,
            'poster_path': '/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg',
            'original_language': 'en',
            'original_title': 'Captain Marvel',
            'genre_ids': [
              28,
              12,
              878
            ],
            'backdrop_path': '/w2PMyoyLU22YvrGK3smVM9fW1jj.jpg',
            'adult': false,
            'overview': `DummyOverview`,
            'release_date': '2019-03-06'
          }
        ]
      };

      it('should map the response to an array of media items', () => {
        mockHttpClient.get.and.returnValue(of(mockResponse));

        const expectedResponse: MediaItem[] = [{
          id: mockResponse.results[0].id,
          voteAverage: 78,
          backdropPath: `${environment.imageHost}${mockResponse.results[0].backdrop_path}`,
          overview: mockResponse.results[0].overview,
          posterPath: `${environment.imageHost}${mockResponse.results[0].poster_path}`,
          releaseDate: new Date(mockResponse.results[0].release_date),
          title: mockResponse.results[0].title,
          genreIds: undefined
        }, {
          id: mockResponse.results[1].id,
          voteAverage: 73,
          backdropPath: `${environment.imageHost}${mockResponse.results[1].backdrop_path}`,
          overview: mockResponse.results[1].overview,
          posterPath: `${environment.imageHost}${mockResponse.results[1].poster_path}`,
          releaseDate: new Date(mockResponse.results[1].release_date),
          title: mockResponse.results[1].title,
          genreIds: undefined
        }];

        apiService.getTopTwentyMovies().subscribe(response => {
          for (let i = 0; i < response.length; i++) {
            expect(response[i].id).toEqual(expectedResponse[i].id);
            expect(response[i].voteAverage).toEqual(expectedResponse[i].voteAverage);
            expect(response[i].backdropPath).toEqual(expectedResponse[i].backdropPath);
            expect(response[i].overview).toEqual(expectedResponse[i].overview);
            expect(response[i].posterPath).toEqual(expectedResponse[i].posterPath);
            expect(response[i].releaseDate).toEqual(expectedResponse[i].releaseDate);
            expect(response[i].title).toEqual(expectedResponse[i].title);
            expect(response[i].genreIds).toEqual(expectedResponse[i].genreIds);
          }
        });
      });
    });
  });

  describe('getTopTwentyTvShows', () => {
    it('should call http client with the correct url', () => {
      mockHttpClient.get.and.returnValue(of([]));

      apiService.getTopTwentyTvShows();

      const expectedUrl = `${environment.apiHost}/tv/popular?api_key=${environment.apiKey}&language=${navigator.language}&page=1`;
      expect(mockHttpClient.get).toHaveBeenCalledWith(expectedUrl);
    });

    describe('when api request is successful', () => {
      const mockResponse = {
        'page': 1,
        'total_results': 19823,
        'total_pages': 992,
        'results': [
          {
            'original_name': 'Doom Patrol',
            'genre_ids': [
              10759,
              10765
            ],
            'name': 'Doom Patrol',
            'popularity': 369.246,
            'origin_country': [
              'US'
            ],
            'vote_count': 73,
            'first_air_date': '2019-02-15',
            'backdrop_path': '/sAzw6I1G9JUxm86KokIDdQeWtaq.jpg',
            'original_language': 'en',
            'id': 79501,
            'vote_average': 6,
            'overview': 'DummyOverview',
            'poster_path': '/nVN7Dt0Xr78gnJepRsRLaLYklbY.jpg'
          },
          {
            'original_name': 'The Flash',
            'genre_ids': [
              18,
              10765
            ],
            'name': 'The Flash',
            'popularity': 296.072,
            'origin_country': [
              'US'
            ],
            'vote_count': 2554,
            'first_air_date': '2014-10-07',
            'backdrop_path': '/jC1KqsFx8ZyqJyQa2Ohi7xgL7XC.jpg',
            'original_language': 'en',
            'id': 60735,
            'vote_average': 6.7,
            'overview': 'DummyOverview',
            'poster_path': '/fki3kBlwJzFp8QohL43g9ReV455.jpg'
          }
        ]
      };

      it('should map the response to an array of media items', () => {
        mockHttpClient.get.and.returnValue(of(mockResponse));

        const expectedResponse: MediaItem[] = [{
          id: mockResponse.results[0].id,
          voteAverage: 60,
          backdropPath: `${environment.imageHost}${mockResponse.results[0].backdrop_path}`,
          overview: mockResponse.results[0].overview,
          posterPath: `${environment.imageHost}${mockResponse.results[0].poster_path}`,
          releaseDate: new Date(mockResponse.results[0].first_air_date),
          title: mockResponse.results[0].name,
          genreIds: undefined
        }, {
          id: mockResponse.results[1].id,
          voteAverage: 67,
          backdropPath: `${environment.imageHost}${mockResponse.results[1].backdrop_path}`,
          overview: mockResponse.results[1].overview,
          posterPath: `${environment.imageHost}${mockResponse.results[1].poster_path}`,
          releaseDate: new Date(mockResponse.results[1].first_air_date),
          title: mockResponse.results[1].name,
          genreIds: undefined
        }];

        apiService.getTopTwentyTvShows().subscribe(response => {
          for (let i = 0; i < response.length; i++) {
            expect(response[i].id).toEqual(expectedResponse[i].id);
            expect(response[i].voteAverage).toEqual(expectedResponse[i].voteAverage);
            expect(response[i].backdropPath).toEqual(expectedResponse[i].backdropPath);
            expect(response[i].overview).toEqual(expectedResponse[i].overview);
            expect(response[i].posterPath).toEqual(expectedResponse[i].posterPath);
            expect(response[i].releaseDate).toEqual(expectedResponse[i].releaseDate);
            expect(response[i].title).toEqual(expectedResponse[i].title);
            expect(response[i].genreIds).toEqual(expectedResponse[i].genreIds);
          }
        });
      });
    });
  });

  describe('getTopTwentyPeople', () => {
    it('should call http client with the correct url', () => {
      mockHttpClient.get.and.returnValue(of([]));

      apiService.getTopTwentyPeople();

      const expectedUrl = `${environment.apiHost}/person/popular?api_key=${environment.apiKey}&language=${navigator.language}&page=1`;
      expect(mockHttpClient.get).toHaveBeenCalledWith(expectedUrl);
    });

    describe('when api request is successful', () => {
      const mockResponse = {
        'page': 1,
        'total_results': 19823,
        'total_pages': 992,
        'results': <IPersonResponse[]>[
          {
            'popularity': 36.736,
            'id': 976,
            'profile_path': '/PhWiWgasncGWD9LdbsGcmxkV4r.jpg',
            'name': 'Jason Statham',
            'known_for': [
              {
                'vote_average': 6.7,
                'vote_count': 6863,
                'id': 82992,
                'video': false,
                'media_type': 'movie',
                'title': 'Fast & Furious 6',
                'popularity': 1.827,
                'poster_path': '/b9gTJKLdSbwcQRKzmqMq3dMfRwI.jpg',
                'original_language': 'en',
                'original_title': 'Fast & Furious 6',
                'genre_ids': [
                  28,
                  53,
                  80
                ],
                'backdrop_path': '/qjfE7SkPXpqFs8FX8rIaG6eO2aK.jpg',
                'adult': false,
                'overview': 'DummyOverview',
                'release_date': '2013-05-21'
              },
              {
                'vote_average': 7.3,
                'vote_count': 6295,
                'id': 168259,
                'video': false,
                'media_type': 'movie',
                'title': 'Furious 7',
                'popularity': 22.618,
                'poster_path': '/dCgm7efXDmiABSdWDHBDBx2jwmn.jpg',
                'original_language': 'en',
                'original_title': 'Furious 7',
                'genre_ids': [
                  28,
                  80,
                  53,
                  18
                ],
                'backdrop_path': '/ypyeMfKydpyuuTMdp36rMlkGDUL.jpg',
                'adult': false,
                'overview': 'DummyOverview',
                'release_date': '2015-04-01'
              },
              {
                'vote_average': 6.9,
                'vote_count': 6075,
                'id': 337339,
                'video': false,
                'media_type': 'movie',
                'title': 'The Fate of the Furious',
                'popularity': 35.009,
                'poster_path': '/dImWM7GJqryWJO9LHa3XQ8DD5NH.jpg',
                'original_language': 'en',
                'original_title': 'The Fate of the Furious',
                'genre_ids': [
                  12,
                  28,
                  80,
                  53,
                  9648
                ],
                'backdrop_path': '/jzdnhRhG0dsuYorwvSqPqqnM1cV.jpg',
                'adult': false,
                'overview': 'DummyOverview',
                'release_date': '2017-04-12'
              }
            ],
            'adult': false
          },
          {
            'popularity': 33.686,
            'id': 60073,
            'profile_path': '/buGq7fC5iiLV5VvkdW4ui42k1yT.jpg',
            'name': 'Brie Larson',
            'known_for': [
              {
                'vote_average': 6.8,
                'vote_count': 6252,
                'id': 64688,
                'video': false,
                'media_type': 'movie',
                'title': '21 Jump Street',
                'popularity': 17.021,
                'poster_path': '/kn4FAsf2V2cMWRo2dP0pBAS3wUT.jpg',
                'original_language': 'en',
                'original_title': '21 Jump Street',
                'genre_ids': [
                  28,
                  35,
                  80
                ],
                'backdrop_path': '/uOpFdld7CIifSEoGuRVgWqaeyFs.jpg',
                'adult': false,
                'overview': 'DummyOverview',
                'release_date': '2012-03-12'
              },
              {
                'vote_average': 6.3,
                'vote_count': 5790,
                'id': 293167,
                'video': false,
                'media_type': 'movie',
                'title': 'Kong: Skull Island',
                'popularity': 26.726,
                'poster_path': '/r2517Vz9EhDhj88qwbDVj8DCRZN.jpg',
                'original_language': 'en',
                'original_title': 'Kong: Skull Island',
                'genre_ids': [
                  28,
                  12,
                  14
                ],
                'backdrop_path': '/pGwChWiAY1bdoxL79sXmaFBlYJH.jpg',
                'adult': false,
                'overview': 'DummyOverview',
                'release_date': '2017-03-08'
              },
              {
                'vote_average': 8.1,
                'vote_count': 5067,
                'id': 264644,
                'video': false,
                'media_type': 'movie',
                'title': 'Room',
                'popularity': 14.742,
                'poster_path': '/eqFckcHuFCT1FrzLOAvXBb4jHwq.jpg',
                'original_language': 'en',
                'original_title': 'Room',
                'genre_ids': [
                  18,
                  53
                ],
                'backdrop_path': '/6Fi9Ta7m0wdmve2B2XpDdysxAGd.jpg',
                'adult': false,
                'overview': 'DummyOverview',
                'release_date': '2015-10-16'
              }
            ],
            'adult': false
          }
        ]
      };

      it('should map the response to an array of media items', () => {
        mockHttpClient.get.and.returnValue(of(mockResponse));

        const expectedResponse: Person[] = [new Person(mockResponse.results[0]), new Person(mockResponse.results[1])];

        apiService.getTopTwentyPeople().subscribe(response => {
          expect(response).toEqual(expectedResponse);
        });
      });
    });
  });
});
