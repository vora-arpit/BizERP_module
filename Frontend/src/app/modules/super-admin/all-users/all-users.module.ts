import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllUsersListComponent } from './alll-user-list/all-users-list.component';
import { AllUsersRoutingModule } from './all-users-routing.module';
import { AllUserListContainer } from './alll-user-list/all-users-list.container';
import { SharedModule } from '../../../shared/shared.module';
import { AllUsersEditComponent } from './all-users-edit/all-users-edit.component';
import { AllUsersEditContainer } from './all-users-edit/all-users-edit.container';
import { AddUsersComponent } from './add-users/add-users.component';


@NgModule({
  declarations: [
    AllUsersListComponent,AllUserListContainer,AllUsersEditComponent,AllUsersEditContainer,AddUsersComponent
  ],
  imports: [
    CommonModule,AllUsersRoutingModule,SharedModule
  ]
})
export class AllUsersModule { }
