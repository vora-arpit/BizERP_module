import { OnInit, Component, Input } from '@angular/core';
import { User } from '../../../core';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
[x: string]: any;

  @Input() public user?: User;

  ngOnInit() {

  }

  hasRole(roles: string[]): boolean {
    if (!this.user || !this.user.roles) {
      return false;
    }
    return roles.some(role => this.user.roles.includes(role));
  }

}