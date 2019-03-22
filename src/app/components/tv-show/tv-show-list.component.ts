import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { LoadTvShows } from 'src/app/core/store/tv-show';
import { MatDialog } from '@angular/material';
import { MediaItem } from 'src/app/core/model/MediaItem';
import { MediaItemDetailsComponent } from 'src/app/shared/components/media-item-details/media-item-details.component';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tv-show-list',
  templateUrl: './tv-show-list.component.html',
  styleUrls: ['./tv-show-list.component.scss']
})
export class TvShowListComponent implements OnDestroy {
  tvShows$: Observable<MediaItem[]>;
  private searchSubscription: Subscription;
  constructor(private store: Store<State>, private dialog: MatDialog) {
    this.store.dispatch(new LoadTvShows());
    this.registerSearchSubscription();
  }

  private registerSearchSubscription() {
    this.searchSubscription = this.store.pipe(select(m => m.search.searchTerm)).subscribe(searchTerm => {
      this.tvShows$ = this.getTvShows(searchTerm);
    });
  }

  private getTvShows(searchTerm: string) {
    return this.store.pipe(
      select(m => m.tvShows.list),
      map(tvShows => searchTerm ? tvShows.filter(tvShow =>
        tvShow.title.toLowerCase().includes(searchTerm.toLowerCase())) : tvShows)
    );
  }

  openDetails(tvShow: MediaItem) {
    this.dialog.open(MediaItemDetailsComponent, {
      data: tvShow,
      width: '500px',
      height: '600px'
    });
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }
}
