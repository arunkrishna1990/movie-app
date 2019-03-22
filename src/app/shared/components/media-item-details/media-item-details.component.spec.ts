import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaItemDetailsComponent } from './media-item-details.component';
import { MaterialModule } from '../../material.module';
import { MAT_DIALOG_DATA } from '@angular/material';
import { By } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

describe('MediaItemDetailsComponent', () => {
  let component: MediaItemDetailsComponent;
  let fixture: ComponentFixture<MediaItemDetailsComponent>;
  const mockMediaItem = {
    id: 166428,
    voteAverage: 49,
    backdropPath: 'https://dummypath/',
    overview: 'DummyOverview',
    posterPath: 'https://dummy-poster-path/',
    releaseDate: new Date(),
    title: 'DummyTitle',
    genreIds: undefined
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MediaItemDetailsComponent],
      imports: [MaterialModule],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: mockMediaItem }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when the component is compiled', () => {
    it('should display the title in the header', () => {
      expect(fixture.debugElement.query(By.css('.header h2')).nativeElement.innerHTML).toContain(mockMediaItem.title);
    });

    it('should set the image tag with the backdrop image path in the header', () => {
      expect(fixture.debugElement.query(By.css('.header img')).nativeElement.src).toContain(mockMediaItem.backdropPath);
    });

    it('should set the image tag with the poster image path in the details section', () => {
      expect(fixture.debugElement.query(By.css('.details-wrapper img')).nativeElement.src).toContain(mockMediaItem.posterPath);
    });

    it('should contain a determinate mat progress spinner with diameter 50 and color set to warn', () => {
      const matSpinner = fixture.debugElement.query(By.css('mat-progress-spinner'));

      expect(matSpinner.attributes.mode).toEqual('determinate');
      expect(matSpinner.attributes['ng-reflect-color']).toEqual('warn');
      expect(matSpinner.attributes.diameter).toEqual('50');
    });

    it('should contain the vote average', () => {
      expect(fixture.debugElement.query(By.css('.percentage')).nativeElement.innerHTML).toContain(mockMediaItem.voteAverage);
    });

    it('should display the release date formatted to mediumDate using date pipe', () => {
      const expectedReleaseDate = new DatePipe(navigator.language).transform(mockMediaItem.releaseDate, 'mediumDate');
      expect(fixture.debugElement.query(By.css('.release-date')).nativeElement.innerHTML)
        .toContain(`Release Date: ${expectedReleaseDate}`);
    });

    it('should render the overview', () => {
      expect(fixture.debugElement.query(By.css('.overview')).nativeElement.innerHTML).toContain(mockMediaItem.overview);
    });
  });
});
