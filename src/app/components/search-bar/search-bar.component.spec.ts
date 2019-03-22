import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { SearchBarComponent } from './search-bar.component';
import { StoreModule, Store } from '@ngrx/store';
import { reducers, State } from 'src/app/reducers';
import { By } from '@angular/platform-browser';
import { Search } from 'src/app/core/store/search';
import { dispatchEvent } from '@angular/core/src/view/util';
import { of } from 'rxjs';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let store: Store<State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers),
      ],
      declarations: [SearchBarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    spyOn(component, 'getFromEvent').and.returnValue(of({ target: { value: 'a' } }));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when a serch term is entered', () => {
    it('should send an action Search with the search term', fakeAsync(() => {
      expect(store.dispatch).toHaveBeenCalledWith(new Search('a'));
    }));
  });
});
