import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AdminsAddUsersComponent1 } from './admins-add-users/admins-add-users.component';
import { AddUserRoutingModule } from './add-users-routing.module';

@NgModule({
  declarations: [
    AdminsAddUsersComponent1
  ],
  imports: [
    SharedModule,AddUserRoutingModule
  ]
})
export class UsersModule { }
