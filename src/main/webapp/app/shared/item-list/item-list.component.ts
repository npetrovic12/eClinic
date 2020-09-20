import { Component, Input, ContentChild, TemplateRef, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent {
  @Input() listItems: any[];
  @Input() loading: boolean;
  @Input() translationKey: string;
  @Input() pagination: string;
  @Input() page = 1;
  @Input() listSize = 0;
  @Input() maxPaginationSize = 3;
  @Input() emptyListHint = '';

  @Output() selectedPage = new EventEmitter<number>();

  pageSize = 20;

  @ContentChild('listItem', { static: false }) itemTemplate: TemplateRef<any>;

  constructor() {}

  onPageChange(pageNumber: number) {
    this.selectedPage.emit(pageNumber - 1);
  }
}
