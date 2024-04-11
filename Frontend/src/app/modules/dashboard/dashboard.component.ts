import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Account, DashboardService, Order } from '../../core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  public account$: Observable<Account> | undefined;
  public orders$: Observable<Order[]> | undefined;

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit() {
    this.account$ = this.dashboardService.account();
    this.orders$ = this.dashboardService.lastOrders();
  }

}
