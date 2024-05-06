import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationsListComponent } from './organization-list/organizations-list.component';
import { organizationsRoutingModule } from './organizations-routing.module';


@NgModule({
  declarations: [
    OrganizationsListComponent
  ],
  imports: [
    CommonModule,organizationsRoutingModule
  ]
})
export class SuperAdminModule { }
