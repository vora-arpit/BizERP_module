
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, ProfileSettingService, User } from '../../../core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class settingComponent implements OnInit {

  user: User;
  profileForm: FormGroup;

  constructor(private authService: AuthService,private profileSettingService:ProfileSettingService, 
    private formBuilder: FormBuilder,
    private router:Router) {
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // password: ['', [Validators.required, Validators.minLength(6)]],
      imageUrl:['']
    });
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
      this.profileForm.patchValue({
        name: this.user.name,
        email: this.user.email,
        // password: '',
        imageUrl:this.user.imageUrl
      });
      //  console.log("user:-",this.user);
    });
  }

  updateProfile() {
    if (this.profileForm.valid) {
      this.user.name = this.profileForm.value.name;
      this.user.email = this.profileForm.value.email;
      // this.user.password = this.profileForm.value.password;
      this.user.imageUrl=this.profileForm.value.imageUrl;
      
      // console.log('User', this.user);

      this.profileSettingService.updateProfile(this.user).subscribe(updatedUser => {
        console.log('Profile updated successfully', updatedUser);
        this.profileForm.reset();
      }, error => {
        console.error('Error updating profile', error);
      });
    }
  }

  canceled(){
    this.router.navigate(['/dashboard']);
  }
}
