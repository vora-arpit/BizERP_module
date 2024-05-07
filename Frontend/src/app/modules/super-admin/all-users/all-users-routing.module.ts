import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllUsersListComponent } from './alll-user-list/all-users-list.component';
import { AllUserListContainer } from './alll-user-list/all-users-list.container';
import { AllUsersResolver } from './all-users.resolver';
import { AllUsersEditContainer } from './all-users-edit/all-users-edit.container';
import { AddUsersComponent } from './add-users/add-users.component';

const routes: Routes = [
  {
    path: '',
    component: AllUserListContainer,
    data: { title: 'All Users' }
  },

  // {
  //   path: ':id',
  //   component: AllUsersEditContainer,
  //   // resolve: {
  //   //   user: AllUsersResolver
  //   // },
  //   data: { title: 'Edit User' }
  // },
  {
    path: 'new',
    component: AddUsersComponent,
    data: { title: 'Add User' }
  },

];


  @NgModule({
    imports: [RouterModule.forChild(routes)],
    // providers: [AllUsersResolver],
    exports: [RouterModule],
  })
  export class AllUsersRoutingModule { }