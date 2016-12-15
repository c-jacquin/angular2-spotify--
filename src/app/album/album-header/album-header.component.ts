import { Component, OnInit, Input } from '@angular/core';
import { Album } from '../../shared/model/Album';

@Component({
  selector: 'album-header',
  templateUrl: './album-header.component.html',
  styleUrls: ['./album-header.component.css']
})
export class AlbumHeaderComponent implements OnInit {
  @Input() album: Album;
  constructor() {}

  ngOnInit() {
    console.log(this.album)
  }

}
