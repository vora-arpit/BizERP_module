import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { NotificationService, SuperAdminService, User } from '../../../../core';
import { Router } from '@angular/router';
import { SuperAdminService,NotificationService, User } from '../../../core';

@Component({
  selector: 'app-admins-add-users',
  templateUrl: './admins-add-users.component.html',
  styleUrls: ['./admins-add-users.component.scss']
})
export class AdminsAddUsersComponent implements OnInit {
  @Output() save = new EventEmitter<User>();

  userCreationForm: FormGroup;

  constructor(private formBuilder: FormBuilder, 
              private superAdminService: SuperAdminService,
              private notificationService: NotificationService,
              private router: Router) {
    this.userCreationForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      organizationId: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.userCreationForm.valid) {
      const formData = this.userCreationForm.value;
      this.superAdminService.newuser(formData.name, formData.email, formData.password, formData.organizationId)
        .subscribe(
          (response) => {
            if (response.success) {
              const newUser: User = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                organizationId: formData.organizationId,
                id: 0,
                roles: []
              };
              this.save.emit(newUser);
              this.notificationService.showSuccess(response.message);
            } else {
              this.notificationService.showError(response.message);
            }
          },
          (error) => {
            console.error('Error:', error);
            this.notificationService.showError('An error occurred. Please try again later.');
          }
        );
    }
  }

  canceled() {
    this.router.navigate(['/superadmin/allUsers']);  
  }
}





// import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// // import { NotificationService, SuperAdminService, User } from '../../../../core';
// import { Router } from '@angular/router';
// import { NotificationService, SuperAdminService,User } from '../../../core';

// @Component({
//   selector: 'app-add-users',
//   templateUrl: './admins-add-users.component.html',
//   styleUrls: ['./admins-add-users.component.scss']
// })
// export class AdminsAddUsersComponent implements OnInit {
//   @Output() save = new EventEmitter<User>();

//   userCreationForm: FormGroup;

//   constructor(
//     private formBuilder: FormBuilder, 
//     private superAdminService: SuperAdminService,
//     private notificationService: NotificationService,
//     private router: Router
//   ) {
//     this.userCreationForm = this.formBuilder.group({
//       name: ['', Validators.required],
//       email: ['', Validators.required],
//       password: ['', Validators.required],
//       organizationId: ['', Validators.required] // Assuming organizationId is a number
//     });
//   }

//   ngOnInit(): void {
    
//   }
  
//   onSubmit() {
//     if (this.userCreationForm.valid) {
//       const formData = this.userCreationForm.value;
//       this.superAdminService.newuser(formData.name, formData.email, formData.password, BigInt(formData.organizationId))
//         .subscribe(
//           (response: { success: any; message: any; }) => {
//             if (response.success) {
//               const newUser: User = {
//                 name: formData.name,
//                 email: formData.email,
//                 password: formData.password,
//                 organizationId: BigInt(formData.organizationId),
//                 id: 0,
//                 roles: []
//               };
//               this.save.emit(newUser);
//               this.notificationService.showSuccess(response.message);
//             } else {
//               this.notificationService.showError(response.message);
//             }
//           },
//           (error: any) => {
//             console.error('Error:', error);
//             this.notificationService.showError('An error occurred. Please try again later.');
//           }
//         );
//     }
//   }

//   canceled() {
//     this.router.navigate(['/superadmin/allUsers']);  
//   }
// }
