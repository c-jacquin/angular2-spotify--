import { Component, OnInit, Input } from '@angular/core';

import { Track } from '../../shared/model/Track';

@Component({
  selector: 'spotify-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {
  @Input() track: Track;
  constructor() { }

  ngOnInit() {
    console.log(this.track)
  }

}
