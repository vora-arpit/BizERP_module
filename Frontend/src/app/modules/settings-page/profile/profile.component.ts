import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../../../core';
// import { AuthService } from 'path-to-your-auth-service';
// import { User } from 'path-to-your-user-model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
      console.log(this.user);
    });
  }

}
