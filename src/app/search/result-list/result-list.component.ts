import { Component, OnInit, Input } from '@angular/core';

import { Artist } from '../../shared/model/Artist';

@Component({
  selector: 'result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.css']
})
export class ResultListComponent implements OnInit {
  @Input()
  results: Artist[]

  constructor() { }

  ngOnInit() {
  }

}
