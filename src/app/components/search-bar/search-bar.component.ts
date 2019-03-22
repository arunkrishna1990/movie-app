import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { Search } from 'src/app/core/store/search';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements AfterViewInit {

  constructor(private elementRef: ElementRef, private store: Store<State>) { }

  ngAfterViewInit() {

    this.getFromEvent().pipe(
      map((event: any) => event.target.value),
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(text => {
      this.store.dispatch(new Search(text));
    });
  }

  getFromEvent() {
    return fromEvent(this.elementRef.nativeElement, 'input');
  }
}
