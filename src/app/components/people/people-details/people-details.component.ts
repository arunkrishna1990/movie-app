import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Person } from 'src/app/core/model/Person';

@Component({
  selector: 'app-people-details',
  templateUrl: './people-details.component.html',
  styleUrls: ['./people-details.component.scss']
})
export class PeopleDetailsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public item: Person) { }

  ngOnInit() {
  }

}
