// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { Subscription } from 'rxjs';
// import { Organizations, SuperAdminService } from '../../../../core';

// @Component({
//   selector: 'app-organizations-list-container',
//   template: `
//     <app-organizations-list
//       [organizations]="organizations"
//     ></app-organizations-list>
//   `
// })
// export class OrganizationsListContainer implements OnInit, OnDestroy {

//   organizations: Organizations[] = [];
//   subscription: Subscription = new Subscription();

//   constructor(
//     private superadminService: SuperAdminService
//   ) { }

//   ngOnInit() {
//     this.subscription = this.superadminService.findAll().subscribe(
//       (organizations) => {
//         this.organizations = organizations;
//       }
//     );
//   }

//   ngOnDestroy() {
//     this.subscription.unsubscribe();
//   }
// }


