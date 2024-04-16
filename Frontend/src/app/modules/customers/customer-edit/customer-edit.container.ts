// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Customer, CustomerService, NotificationService } from '../../../core';
// // import { Customer, CustomerService, NotificationService } from '@app/_core';
// // import { format } from 'date-fns';

// @Component({
//   selector: 'app-customer-edit-container',
//   template: `
//     <app-customer-edit 
//       [customer]="customer!" 
//       (submitted)="submitted()"
//       (canceled)="canceled()"
//       (deleted)="deleted()"
//     ></app-customer-edit>`
// })
// export class CustomerEditContainer implements OnInit {

//   public customer: Customer | undefined; // Initialize customer property

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private customerService: CustomerService,
//     private notificationService: NotificationService
//   ) { }

//   ngOnInit() {
//     this.customer = this.route.snapshot.data['customer'];
//     if (!this.customer)
//       this.customer = new Customer();

//     console.log('Customer data:', this.customer);
   
//   }

//   private home() {
//     this.router.navigate(['/customers']);
//   }

//   canceled() { // Remove event parameter
//     this.home();
//   }

//   deleted() {
//     if (this.customer) {
//       this.customerService.delete(this.customer.id)
//         .subscribe({
//           next: () => {
//             this.notificationService.showSuccess(`Customer ${this.customer!.id} was deleted.`);
//             this.home();
//           },
//           error: (error) => {
//             console.error('Delete error:', error);
//             this.notificationService.showError('Failed to delete customer.');
//           }
//         });
//     }
//   }
  

// submitted() {
//   if (!this.customer) return;

//   // Convert birthdate string to Date object
//   const birthdate = new Date(this.customer.birthdate);

//   // Format the birthdate in the desired format
//   // const formattedBirthdate = format(birthdate, 'MM-dd-yyyy HH:mm:ss');

//   // Create a new property to hold the formatted birthdate
//   const customerWithFormattedBirthdate = {
//     ...this.customer,
//     formattedBirthdate: birthdate // Add formatted birthdate property
//   };

  
//   const action = this.customer.id ? 'updated' : 'created';

//   const request = this.customer.id ?
//     this.customerService.update(this.customer.id, this.customer) :
//     this.customerService.create(customerWithFormattedBirthdate);

//   request.subscribe({
//     next: (updatedCustomer) => {
//       this.customer = updatedCustomer;
//       this.notificationService.showSuccess(`Customer ${updatedCustomer.id} ${action}`);
//       this.home();
//     },
//     error: (error) => {
//       console.error(`${action} error:`, error);
//       this.notificationService.showError(`Failed to ${action} customer.`);
//     }
//   });
// }
  

  
// }
