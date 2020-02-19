import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChipFormatPipe } from './chip-format.pipe';

@Component({
  selector: 'chip-select',
  templateUrl: './chip-select.component.html',
  styleUrls: ['./chip-select.component.scss'],
  providers: [ChipFormatPipe]
})
export class ChipSelectComponent implements OnInit {
  @Input() options: [];
  @Output() timeSelected = new EventEmitter();
  selectedTime = { hour: 10, minute: 17 };

  ngOnInit() {}

  onChipSelected(selectedTime: any) {
    this.selectedTime = selectedTime;
    this.timeSelected.emit(this.selectedTime);
  }
}
