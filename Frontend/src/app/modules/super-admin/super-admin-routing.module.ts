import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'allUsers',
    loadChildren: () => import('./all-users/all-users-routing.module').then(m => m.AllUsersRoutingModule),
    data: { title: 'All Users' }
  },
  {
    path: 'organizations',
    loadChildren: () => import('./organizations/organizations-routing.module').then(m => m.organizationsRoutingModule),
    data: { title: 'Organizations' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuperAdminRoutingModule { }
