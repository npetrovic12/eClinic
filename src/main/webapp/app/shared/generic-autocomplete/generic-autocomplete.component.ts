import { Component, ViewChild, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable, merge, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap, catchError, map, tap } from 'rxjs/operators';
import { GenericAutocompleteService } from './generic-autocomplete.service';

@Component({
  selector: 'generic-autocomplete',
  templateUrl: './generic-autocomplete.component.html',
  styleUrls: ['./generic-autocomplete.component.scss']
})
export class GenericAutocompleteComponent implements OnInit {
  model: any;
  searching = false;
  @ViewChild('instance', { static: true }) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  @Input() apiUrl: string;
  @Input() placeholder: string;
  @Input() fieldsToDisplay: string[];
  @Input() disabled = false;
  @Output() itemSelected = new EventEmitter<any>();
  @Output() itemCleared = new EventEmitter<any>();

  constructor(private genericAutocompleteService: GenericAutocompleteService) {}

  ngOnInit() {}

  showSelected(item: any) {
    this.itemSelected.emit(item);
  }

  clearSelected() {
    this.itemCleared.emit();
    this.model = null;
  }

  onFocusOut() {
    if (this.searching) this.searching = false;
  }

  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      tap(() => (this.searching = true)),
      switchMap(term =>
        this.genericAutocompleteService.getData(this.apiUrl, { searchText: term }).pipe(
          map(response => response.body),
          catchError(() => of([]))
        )
      ),
      tap(() => (this.searching = false))
    );
  };

  resolvePath = (dropDownItemObj: any) => {
    let resultValue = '';
    if (!this.fieldsToDisplay || !this.fieldsToDisplay.length || (this.fieldsToDisplay.length === 1 && this.fieldsToDisplay[0] === '')) {
      return dropDownItemObj;
    }

    this.fieldsToDisplay.forEach((fieldPath, index) => {
      if (fieldPath.includes('[')) {
        throw Error('Invalid path format, should be word.word.word');
      }

      const splitPath = fieldPath.split('.');
      let currentValue = dropDownItemObj;
      for (const pathFragment of splitPath) {
        if (!currentValue[pathFragment]) {
          currentValue = '';
          break;
        }
        currentValue = currentValue[pathFragment];
      }
      if (typeof currentValue === 'string') {
        resultValue += index !== this.fieldsToDisplay.length - 1 ? currentValue + ' ' : currentValue;
      } else {
        resultValue = currentValue;
      }
    });
    return resultValue || '';
  };
}
