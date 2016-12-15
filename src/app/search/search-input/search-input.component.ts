import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit, OnDestroy {
  @Output() onNewSearch: EventEmitter<string> = new EventEmitter<string>();
  searchForm: FormGroup;
  subscription: Subscription;

  constructor(
      private formBuilder: FormBuilder,

  ) { }

  ngOnInit() {
      this.searchForm = this.formBuilder.group({ query: '' })

      this.subscription = this.searchForm
        .valueChanges
        .debounceTime(1500)
        .map((formData) => formData.query)
        .subscribe(
            (data) => this.onNewSearch.emit(data)
        )
  }

  ngOnDestroy() {
      this.subscription.unsubscribe()
  }

}
