import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng2-mock-component';

import { TvShowListComponent } from './tv-show-list.component';
import { StoreModule, Store } from '@ngrx/store';
import { reducers, State } from 'src/app/reducers';
import { MaterialModule } from 'src/app/shared/material.module';
import { LoadTvShows } from 'src/app/core/store/tv-show';
import { of, BehaviorSubject } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('TvShowListComponent', () => {
  let component: TvShowListComponent;
  let fixture: ComponentFixture<TvShowListComponent>;
  let store: Store<State>;
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
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers),
        MaterialModule
      ],
      declarations: [
        TvShowListComponent,
        MockComponent({ selector: 'app-card', inputs: ['cardImage', 'cardTitle', 'disableOverlay'], outputs: ['open'] })
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    spyOn(store, 'pipe').and.returnValues(of(null), of(mockTvShows));
    fixture = TestBed.createComponent(TvShowListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when the component is compiled', () => {
    it('should dispatch LoadTvShows Action', () => {
      expect(store.dispatch).toHaveBeenCalledWith(new LoadTvShows());
    });

    it('should render the list of tv shows', () => {
      const appCards = fixture.debugElement.queryAll(By.css('app-card'));
      expect(appCards.length).toEqual(mockTvShows.length);

      for (let i = 0; i < appCards.length; i++) {
        expect(appCards[i].attributes['ng-reflect-card-image']).toEqual(mockTvShows[i].posterPath);
        expect(appCards[i].attributes['ng-reflect-card-title']).toEqual(mockTvShows[i].title);
      }
    });
  });
});
