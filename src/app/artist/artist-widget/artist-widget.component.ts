import { Component, OnInit, Input } from '@angular/core';
import { Artist } from '../../shared/model/Artist';

@Component({
  selector: 'artist-widget',
  templateUrl: './artist-widget.component.html',
  styleUrls: ['./artist-widget.component.css']
})
export class ArtistWidgetComponent implements OnInit {
  @Input() artist: Artist;
  constructor() { }

  ngOnInit() {
  }

}
