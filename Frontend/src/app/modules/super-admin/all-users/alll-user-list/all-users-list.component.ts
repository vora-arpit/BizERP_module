import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../../core';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users-list.component.html',
  styles: [`
  .user-pic{ height:40px; border-radius:50%}
  `]
})
export class AllUsersListComponent implements OnInit {
  @Input() users: User[] = [];

  @Output() public filtered: EventEmitter<string> = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit() {
  }
  onKeyUp(event: KeyboardEvent) {
    const value = (event.target as HTMLInputElement).value;
    this.filtered.emit(value);
  }

  navigate(id: any) {
    this.router.navigate([id])
  }
}
