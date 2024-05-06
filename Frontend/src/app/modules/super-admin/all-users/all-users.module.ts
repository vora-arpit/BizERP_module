import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllUsersListComponent } from './alll-user-list/all-users-list.component';
import { AllUsersRoutingModule } from './all-users-routing.module';


@NgModule({
  declarations: [
    AllUsersListComponent
  ],
  imports: [
    CommonModule,AllUsersRoutingModule
  ]
})
export class SuperAdminModule { }
