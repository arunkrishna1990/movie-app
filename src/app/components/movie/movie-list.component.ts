import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { LoadMovies } from 'src/app/core/store/movie';
import { State } from 'src/app/reducers';
import { MatDialog } from '@angular/material';
import { MediaItem } from 'src/app/core/model/MediaItem';
import { MediaItemDetailsComponent } from 'src/app/shared/components/media-item-details/media-item-details.component';
import { switchMap, filter, concatMap, map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnDestroy {
  movies$: Observable<MediaItem[]>;
  private searchSubscription: Subscription;
  constructor(private store: Store<State>, private dialog: MatDialog) {
    this.store.dispatch(new LoadMovies());
    this.registerSearchSubscription();
  }

  private registerSearchSubscription() {
    this.searchSubscription = this.store.pipe(select(m => m.search.searchTerm)).subscribe(searchTerm => {
      this.movies$ = this.getMovies(searchTerm);
    });
  }

  private getMovies(searchTerm: string) {
    return this.store.pipe(
      select(m => m.movies.list),
      map(movies => searchTerm ? movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())) : movies)
    );
  }

  openDetails(movie: MediaItem) {
    this.dialog.open(MediaItemDetailsComponent, {
      data: movie,
      width: '500px',
      height: '600px'
    });
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }
}
