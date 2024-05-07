import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserEditContainer } from './user-edit/user-edit.container';
import { UserListContainer } from './user-list/user-list.container';
import { UserResolver } from './user.resolver';
import { AdminsAddUsersComponent } from './admins-add-users/admins-add-users.component';

const routes: Routes = [
  {
    path: 'new',
    component: AdminsAddUsersComponent,
    data: { title: 'User List' }
  },

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddUserRoutingModule { }