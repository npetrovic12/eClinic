import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError, map, tap } from 'rxjs/operators';
import { GenericAutocompleteService } from './generic-autocomplete.service';

@Component({
  selector: 'generic-autocomplete',
  templateUrl: './generic-autocomplete.component.html',
  styleUrls: ['./generic-autocomplete.component.scss']
})
export class GenericAutocompleteComponent implements OnInit {
  searching = false;
  items$ = new Observable();
  searchInput$ = new Subject<string>();
  @Input() model: any;
  @Input() apiUrl: string;
  @Input() critera: any;
  @Input() placeholder = 'Search for item';
  @Input() notFoundText = 'No items found';
  @Input() loadingText = 'Loading items';
  @Input() fieldsToDisplay: string[];
  @Input() disabled = false;
  @Output() itemSelected = new EventEmitter<any>();
  @Output() itemCleared = new EventEmitter<any>();

  constructor(private genericAutocompleteService: GenericAutocompleteService) {}

  ngOnInit() {
    this.items$ = this.searchInput$.pipe(
      distinctUntilChanged(),
      debounceTime(300),
      tap(() => (this.searching = true)),
      switchMap(term =>
        this.genericAutocompleteService.getData(this.apiUrl, { ...this.critera, searchText: term }).pipe(
          map(response => response.body),
          catchError(() => of([]))
        )
      ),
      tap(() => (this.searching = false))
    );
  }

  onClear() {
    this.itemCleared.emit();
  }

  onChange(item: any) {
    if (item) this.itemSelected.emit(item);
  }

  onFocus() {
    // og way to search on focus, improve later
    this.searchInput$.next('');
  }
}
