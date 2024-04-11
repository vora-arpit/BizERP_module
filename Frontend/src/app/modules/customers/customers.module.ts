import { NgModule } from '@angular/core';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerEditContainer } from './customer-edit/customer-edit.container';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerRoutingModule } from './customers-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CustomerListContainer } from './customer-list/customer-list.container';

@NgModule({
  declarations: [
    CustomerListContainer,
    CustomerListComponent,
    CustomerEditContainer,
    CustomerEditComponent
  ],
  imports: [
    SharedModule, CustomerRoutingModule
  ]
})
export class CustomersModule { }
