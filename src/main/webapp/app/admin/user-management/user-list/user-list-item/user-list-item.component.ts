import { Component, OnInit, Input } from '@angular/core';
import { User } from 'app/core/user/user.model';

@Component({
  selector: 'user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.scss']
})
export class UserListItemComponent implements OnInit {
  @Input() user: User;

  constructor() {}

  ngOnInit() {}
}
