import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'department-stat-card',
  templateUrl: './department-stat-card.component.html',
  styleUrls: ['./department-stat-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DepartmentStatCardComponent implements OnInit {
  @Input() value: number;
  @Input() icon: string;
  @Input() title: string;

  constructor() {}

  ngOnInit() {}
}
