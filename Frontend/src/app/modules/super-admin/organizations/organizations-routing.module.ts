import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationsListComponent } from './organization-list/organizations-list.component';

const routes: Routes = [
  {
    path: '',
    component: OrganizationsListComponent,
    data: { title: 'Organizations' }
  },
//   {
//     path: 'organizations',
//     component: OrganizationsComponent,
//     data: { title: 'Organizations' }
//   },
//   {
//     path: ':id',
//     component: ProductEditComponent,
//     canActivate:[AuthGuard],
//     resolve: {
//       product: ProductResolver
//     },
//     data: { title: 'Edit Product',roles:['MANAGER'] }
//   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class organizationsRoutingModule { }
