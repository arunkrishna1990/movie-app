import { Component, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { LoadPeople } from 'src/app/core/store/people';
import { PeopleDetailsComponent } from './people-details/people-details.component';
import { MatDialog } from '@angular/material';
import { Person } from 'src/app/core/model/Person';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnDestroy {

  people$: Observable<Person[]>;
  private searchSubscription: Subscription;
  constructor(private store: Store<State>, private dialog: MatDialog) {
    this.store.dispatch(new LoadPeople());
    this.registerSearchSubscription();
  }

  private registerSearchSubscription() {
    this.searchSubscription = this.store.pipe(select(m => m.search.searchTerm)).subscribe(searchTerm => {
      this.people$ = this.getPeople(searchTerm);
    });
  }

  private getPeople(searchTerm: string) {
    return this.store.pipe(
      select(m => m.people.list),
      map(people => searchTerm ? people.filter(person =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase())) : people)
    );
  }

  openDetails(person: Person) {
    this.dialog.open(PeopleDetailsComponent, {
      data: person,
      width: '500px',
      height: '600px'
    });
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }
}
