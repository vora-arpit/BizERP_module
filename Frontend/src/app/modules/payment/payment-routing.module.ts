import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { CancelComponent } from './cancel/cancel.component';
import { SuccessComponent } from './success/success.component';

const routes: Routes = [
  {
    path: 'checkout',
    component: CheckoutComponent,
    data: { title: 'checkout' }
  },
  {
    path: 'cancel',
    component: CancelComponent,
    data: { title: 'cancel' }
  },
  {
    path: 'success',
    component: SuccessComponent,
    data:{title: 'success'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
