import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { By } from '@angular/platform-browser';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.cardImage = 'https://dummy-path';
    component.cardTitle = 'DummyTitle';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when the component is compiled', () => {
    it('should render the title', () => {
      expect(fixture.debugElement.query(By.css('span')).nativeElement.innerHTML).toContain('DummyTitle');
    });

    it('should render set image tag with the src url', () => {
      expect(fixture.debugElement.query(By.css('img')).nativeElement.src).toEqual('https://dummy-path/');
    });

    it('should scontain the overlay section when disableOverlay is false', () => {
      expect(fixture.debugElement.query(By.css('.overlay'))).not.toBeNull();
    });

    describe('when disable overlay is set to true', () => {
      it('should hide the overlay section', () => {
        component.disableOverlay = true;
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('.overlay'))).toBeNull();
      });
    });
  });
});
