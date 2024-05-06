import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllUsersListComponent } from './alll-user-list/all-users-list.component';

const routes: Routes = [
  {
    path: '',
    component: AllUsersListComponent,
    data: { title: 'All Users' }
  },
];


  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class AllUsersRoutingModule { }