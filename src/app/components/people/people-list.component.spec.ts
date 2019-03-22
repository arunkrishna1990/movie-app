import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleListComponent } from './people-list.component';
import { StoreModule, Store } from '@ngrx/store';
import { reducers, State } from 'src/app/reducers';
import { MaterialModule } from 'src/app/shared/material.module';
import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs';
import { IPersonResponse, Person } from 'src/app/core/model/Person';
import { LoadPeople } from 'src/app/core/store/people';
import { By } from '@angular/platform-browser';

describe('PeopleListComponent', () => {
  let component: PeopleListComponent;
  let fixture: ComponentFixture<PeopleListComponent>;
  let store: Store<State>;
  const mockHttpResponse = {
    'page': 1,
    'total_results': 19823,
    'total_pages': 992,
    'results': <IPersonResponse[]>[
      {
        'popularity': 36.736,
        'id': 976,
        'profile_path': '/something/',
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
        'profile_path': '/something/',
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
  const mockPeople = [new Person(mockHttpResponse.results[0]), new Person(mockHttpResponse.results[1])];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers),
        MaterialModule
      ],
      declarations: [
        PeopleListComponent,
        MockComponent({ selector: 'app-card', inputs: ['cardImage', 'cardTitle', 'disableOverlay'], outputs: ['open'] })
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    spyOn(store, 'pipe').and.returnValues(of(null), of(mockPeople));
    fixture = TestBed.createComponent(PeopleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when the component is compiled', () => {
    it('should dispatch LoadPeople Action', () => {
      expect(store.dispatch).toHaveBeenCalledWith(new LoadPeople());
    });

    it('should render the list of tv shows', () => {
      const appCards = fixture.debugElement.queryAll(By.css('app-card'));
      expect(appCards.length).toEqual(mockPeople.length);

      for (let i = 0; i < appCards.length; i++) {
        expect(mockPeople[i].profilePath).toContain(appCards[i].attributes['ng-reflect-card-image']);
        expect(appCards[i].attributes['ng-reflect-card-title']).toEqual(mockPeople[i].name);
      }
    });
  });
});
