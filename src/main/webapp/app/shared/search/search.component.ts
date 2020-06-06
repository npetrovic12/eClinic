import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() initialValue = '';
  @Input() placeholder = 'Search';
  @Output() searchText = new EventEmitter<string>();

  searchInput: FormControl;

  constructor() {}

  ngOnInit() {
    this.searchInput = new FormControl(this.initialValue);
  }

  onSearch() {
    this.searchText.emit(this.searchInput.value);
  }
}
