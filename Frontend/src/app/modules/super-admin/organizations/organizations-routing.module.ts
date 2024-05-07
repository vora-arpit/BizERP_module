import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationsResolver } from './organizations.resolver';
import { OrganizationsListComponent } from './organization-list/organizations-list.component';
import { OrganizationsAddEditComponent } from './organization-edit/organizations-edit.component';

const routes: Routes = [
  {
    path: '',
    component: OrganizationsListComponent,
    // resolve: { organizations: OrganizationsResolver },
    data: { title: 'Organizations List' }
  },
  {
    path:'new',
    component:OrganizationsAddEditComponent,
    data:{ title: 'New Organization'}
  },
  {
    path: ':id',
    component: OrganizationsAddEditComponent,
    resolve: {
      customer: OrganizationsResolver
    },
    data: { title: 'Edit Customer' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [OrganizationsResolver]
})
export class OrganizationsRoutingModule { }
