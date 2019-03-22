import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarComponent } from './side-bar.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';

describe('SideBarComponent', () => {
  let component: SideBarComponent;
  let fixture: ComponentFixture<SideBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule],
      declarations: [SideBarComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when the component is compiled', () => {
    it('should render the 3 menu items', () => {
      const menuWrapper = fixture.debugElement.query(By.css('ul')).nativeElement.innerHTML;
      expect(menuWrapper).toContain('Movies');
      expect(menuWrapper).toContain('TV');
      expect(menuWrapper).toContain('People');
    });

    [{
      expectedValue: 'Movies',
      selectedItemId: 1
    }, {
      expectedValue: 'People',
      selectedItemId: 3
    }, {
      expectedValue: 'TV',
      selectedItemId: 2
    }].forEach(testCase => {
      it(`should add the selected class to ${testCase.expectedValue} if the selectedItemId is equal to ${testCase.selectedItemId}`, () => {
        component.selectedItemId = testCase.selectedItemId;

        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('.selected')).nativeElement.innerHTML).toContain(testCase.expectedValue);
      });
    });
  });
});
