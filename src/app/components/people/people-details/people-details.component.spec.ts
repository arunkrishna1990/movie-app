import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleDetailsComponent } from './people-details.component';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Person } from 'src/app/core/model/Person';
import { MockComponent } from 'ng2-mock-component';
import { By } from '@angular/platform-browser';

describe('PeopleDetailsComponent', () => {
  let component: PeopleDetailsComponent;
  let fixture: ComponentFixture<PeopleDetailsComponent>;
  const mockPerson = new Person({
    'popularity': 33.686,
    'id': 60073,
    'profile_path': '',
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
  });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PeopleDetailsComponent,
        MockComponent({ selector: 'app-card', inputs: ['cardImage', 'cardTitle', 'disableOverlay'], outputs: ['open'] })
      ],
      providers: [{
        provide: MAT_DIALOG_DATA, useValue: mockPerson
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when the component is compiled', () => {
    it('should show the name of the person', () => {
      expect(fixture.debugElement.query(By.css('.header h2')).nativeElement.innerHTML).toEqual(mockPerson.name);
    });

    it('should show the image of the person', () => {
      expect(fixture.debugElement.query(By.css('.header img')).nativeElement.src).toEqual(mockPerson.profilePath);
    });

    it('should show the image of the person', () => {
      expect(fixture.debugElement.queryAll(By.css('app-card')).length).toEqual(mockPerson.knownFor.length);
    });
  });
});
