import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminsAddUsersComponent1 } from './admins-add-users/admins-add-users.component';

const routes: Routes = [
  {
    path: '',
    component: AdminsAddUsersComponent1,
    data: { title: 'User List' }
  },

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddUserRoutingModule { }