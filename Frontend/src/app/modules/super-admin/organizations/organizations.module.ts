import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationsListComponent } from './organization-list/organizations-list.component';
import { OrganizationsRoutingModule } from './organizations-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { OrganizationsAddEditComponent } from './organization-edit/organizations-edit.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OrganizationsListComponent,OrganizationsAddEditComponent
  ],
  imports: [
    CommonModule,OrganizationsRoutingModule,SharedModule,ReactiveFormsModule
  ]
})
export class OrganizationsModule { }
