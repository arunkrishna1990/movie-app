import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MediaItem } from 'src/app/core/model/MediaItem';

@Component({
  selector: 'app-media-item-details',
  templateUrl: './media-item-details.component.html',
  styleUrls: ['./media-item-details.component.scss']
})
export class MediaItemDetailsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public item: MediaItem) { }
}
