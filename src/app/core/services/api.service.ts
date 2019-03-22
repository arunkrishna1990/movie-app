import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../model/HttpResponse';
import { Person, IPersonResponse } from '../model/Person';
import { MediaItem, IMediaItemResponse } from '../model/MediaItem';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {
  }

  getTopTwentyMovies() {
    return this.http
      .get(`${environment.apiHost}/movie/popular?api_key=${environment.apiKey}&language=${navigator.language}&page=1`)
      .pipe(
        map((response: ApiResponse<IMediaItemResponse[]>) => {
          return response.results && response.results.map(movie => new MediaItem(movie));
        })
      );
  }

  getTopTwentyTvShows() {
    return this.http
      .get(`${environment.apiHost}/tv/popular?api_key=${environment.apiKey}&language=${navigator.language}&page=1`)
      .pipe(
        map((response: ApiResponse<IMediaItemResponse[]>) => response.results.map(tvShow => new MediaItem(tvShow)))
      );
  }

  getTopTwentyPeople() {
    return this.http
      .get(`${environment.apiHost}/person/popular?api_key=${environment.apiKey}&language=${navigator.language}&page=1`)
      .pipe(
        map((response: ApiResponse<IPersonResponse[]>) =>
          response.results.map(person => new Person(person)))
      );
  }
}
