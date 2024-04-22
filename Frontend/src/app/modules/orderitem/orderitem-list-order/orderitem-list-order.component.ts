import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService, OrderItem, OrderItemService } from '../../../core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getAllOrderItems } from '../../../store/selectors/orderItem.selector';
import { getOrderItem } from '../../../store/actions/orderItem.action';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-orderitem-list-order',
  templateUrl: './orderitem-list-order.component.html',
  styleUrls: ['./orderitem-list-order.component.scss']
})
export class OrderitemListOrderComponent implements OnInit {

  orderItems: OrderItem[] = [];
  orderId: number;
  orderItemId:number;
  // subscription: Subscription;


  constructor(private route: ActivatedRoute,private store:Store, private orderItemService: OrderItemService,private notificationService : NotificationService,private router:Router) 
  {
    // this.subscription=this.store.select(getAllOrderItems).subscribe((Result) => {
    //   this.orderItems = Result;
    // });
    }

  ngOnInit(): void {
    // Retrieve the order ID from the route parameters
    this.orderId = Number(this.route.snapshot.paramMap.get('orderid'));
    this.orderItemId=Number(this.route.snapshot.paramMap.get('orderItemId'));
    // // Fetch order items based on the order ID
    this.orderItemService.getOrderItemsByOrderId(this.orderId).subscribe((result) => {
      this.orderItems = result;
    });
    
    // this.store.dispatch(getOrderItem({ orderId: this.orderId }))
    
    // Subscribe to the store to get order items
    // this.store.select(getAllOrderItems).subscribe((Result) => {
    //   this.orderItems = Result;
    //   console.log("orderitems:",this.orderItems)
    // });
  }

  canceled(){
    this.router.navigate(["/order"]);
  }
  
}
