import { NgModule } from '@angular/core';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserEditContainer } from './user-edit/user-edit.container';
import { UserListComponent } from './user-list/user-list.component';
import { UserListContainer } from './user-list/user-list.container';
import { UserRoutingModule } from './users-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AdminsAddUsersComponent } from './admins-add-users/admins-add-users.component';
import { AddUserRoutingModule } from './add-users-routing.module';

@NgModule({
  declarations: [
    UserEditComponent,
    UserEditContainer,
    UserListComponent,
    UserListContainer,
    AdminsAddUsersComponent
  ],
  imports: [
    SharedModule, UserRoutingModule,AddUserRoutingModule
  ]
})
export class UsersModule { }
