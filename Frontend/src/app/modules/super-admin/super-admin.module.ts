import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { SharedModule } from '@coreui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrganizationsModule } from './organizations/organizations.module';
import { AllUsersModule } from './all-users/all-users.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,SuperAdminRoutingModule,SharedModule,FormsModule,ReactiveFormsModule,OrganizationsModule,AllUsersModule
  ]
})
export class SuperAdminModule { }
