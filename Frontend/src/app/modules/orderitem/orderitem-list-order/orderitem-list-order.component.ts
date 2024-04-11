import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService, OrderItem, OrderItemService } from '../../../core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-orderitem-list-order',
  templateUrl: './orderitem-list-order.component.html',
  styleUrl: './orderitem-list-order.component.scss'
})
export class OrderitemListOrderComponent implements OnInit {

  orderItems: OrderItem[] = [];
  orderId: number;
  orderItemId:number;

  constructor(private route: ActivatedRoute, private orderItemService: OrderItemService,private notificationService : NotificationService,private router:Router) { }

  ngOnInit(): void {
    // Retrieve the order ID from the route parameters
    this.orderId = Number(this.route.snapshot.paramMap.get('orderid'));
    this.orderItemId=Number(this.route.snapshot.paramMap.get('orderItemId'));
    // Fetch order items based on the order ID
    this.orderItemService.getOrderItemsByOrderId(this.orderId).subscribe((result) => {
      this.orderItems = result;
    });
  }

  canceled(){
    this.router.navigate(["/order"]);
  }
  
}
