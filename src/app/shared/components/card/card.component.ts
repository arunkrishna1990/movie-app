import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() cardImage: string;
  @Input() cardTitle: string;
  @Input() disableOverlay?: boolean;
  @Output() open = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  openDetails() {
    this.open.emit();
  }
}
