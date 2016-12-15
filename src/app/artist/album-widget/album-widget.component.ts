import { Component, OnInit, Input } from '@angular/core';

import { Album } from '../../shared/model/Album'

@Component({
  selector: 'album-widget',
  templateUrl: './album-widget.component.html',
  styleUrls: ['./album-widget.component.css']
})
export class AlbumWidgetComponent implements OnInit {
   @Input() album: Album;

  constructor() { }

  ngOnInit() {
  }

}
