import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService, OrderItem, OrderItemService } from '../../../core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-orderitem-list-order',
  templateUrl: './orderitem-list-order.component.html',
  styleUrls: ['./orderitem-list-order.component.scss']
})
export class OrderitemListOrderComponent implements OnInit {

  orderItems: OrderItem[] = [];
  @Input() orderId: number;
  orderItemId:number;


  constructor(private route:ActivatedRoute, private orderItemService: OrderItemService,private notificationService : NotificationService,private router:Router) 
  {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.orderId = params['orderId'];
      this.orderItemService.getOrderItemsByOrderId(this.orderId).subscribe((result) => {
        this.orderItems = result;
      });
    });
  }
  canceled(){
    this.router.navigate(["/order"]);
  }
  
}



// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { NotificationService, OrderItem, OrderItemService } from '../../../core';
// import { Router } from '@angular/router';
// import { Store } from '@ngrx/store';
// import { getAllOrderItems } from '../../../store/selectors/orderItem.selector';
// import { getOrderItem } from '../../../store/actions/orderItem.action';
// import { Subscription } from 'rxjs';


// @Component({
//   selector: 'app-orderitem-list-order',
//   templateUrl: './orderitem-list-order.component.html',
//   styleUrls: ['./orderitem-list-order.component.scss']
// })
// export class OrderitemListOrderComponent implements OnInit {

//   orderItems: OrderItem[] = [];
//   orderId: number;
//   subscription: Subscription;


//   constructor(
//     private route: ActivatedRoute,
//     private store: Store,
//     private orderItemService: OrderItemService,
//     private notificationService: NotificationService,
//     private router: Router
//   ) { }

//   ngOnInit(): void {
//     // Retrieve the order ID from the route parameters
//     this.orderId = Number(this.route.snapshot.paramMap.get('orderid'));

//     this.store.dispatch(getOrderItem({ orderId: this.orderId }));

    

//     this.subscription = this.store.select(getAllOrderItems).subscribe((result) => {
//       this.orderItems = result;
//       console.log("orderitems:",this.orderItems)
//     });
//   }

//   ngOnDestroy(): void {
//     this.subscription.unsubscribe();
//   }

//   canceled(){
//     this.router.navigate(["/order"]);
//   }
// }
