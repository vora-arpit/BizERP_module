import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { NotificationService, Order, OrderItem, OrderItemService, OrderService, Product } from '../../../core';

@Component({
  selector: 'app-edit-orderitem-order',
  templateUrl: './edit-orderitem-order.component.html',
  styleUrl: './edit-orderitem-order.component.scss'
})
export class EditOrderitemOrderComponent implements OnInit {
  orderItemId: bigint;
  orderId:BigInt;
  orderItem: OrderItem={
    id:null,
    price:1000,
    quantity:2,
    product:new Product(),
    order:null
  };
  showModal: boolean = false;
  order:Order;
  isAddMode: boolean;
  productId:number;

  constructor(
    private route: ActivatedRoute,
    private orderItemService: OrderItemService,private router:Router,private orderService:OrderService,
    private notificationService:NotificationService
  ) { }

  ngOnInit(): void {
    // Retrieve the order item ID from the route parameters
    const orderItemIdParam = this.route.snapshot.paramMap.get('orderItemId');
    if (orderItemIdParam) {
      this.orderItemId = BigInt(orderItemIdParam);
    
      // Fetch the order item details based on the ID
      this.orderItemService.getOrderItemById(this.orderItemId).subscribe(
        (result) => {
          this.orderItem = result;
        },
        (error) => {
          this.notificationService.showError('Error fetching order item:' +error);
        }
      );
    }
  
    const orderIdParam = this.route.snapshot.paramMap.get('orderid');
    if (orderIdParam) {
      this.orderId = BigInt(orderIdParam);
      // console.log("id:" + this.orderId)
    
      // Fetch the order details based on the ID
      this.orderService.findById(this.orderId).subscribe(
        (result) => {
          // console.log("result:" + result)
          this.order = result;
        },
        (error) => {
          this.notificationService.showError('Error fetching order item:' +error);
        }
      );
    }
  
    this.isAddMode = !this.orderItemId;
  }
  
  

  onSubmit(){
    if(this.isAddMode){
      if(this.isAddMode){
        this.AddOrderItem();
      }else{
        this.updateOrderItem();
      }
    }
  }

  updateOrderItem(): void {
    // Call the service to update the order item
    // const updateRequest = new UpdateOrderItemRequest(this.orderItem);
    
    this.orderItemService.updateOrderItem(this.orderItemId,this.orderItem).subscribe(
      (result) => {
        this.notificationService.showSuccess('Order item updated successfully:');
        // Optionally, navigate back to the order item list or perform any other action
      },
      (error) => {
        this.notificationService.showError('Error while updating order item'+error);
      }
    );
  }

  
  AddOrderItem(): void {
    const neworderItem: OrderItem={
      id:null,
      price:1000,
      quantity:2,
      product:new Product(),
      order:null
    };
    // Call the service to update the order item
    // const updateRequest = new UpdateOrderItemRequest(this.orderItem);
    
    this.orderItemService.createOrderItem(this.productId,this.orderId,neworderItem).subscribe(
      (result) => {
        this.notificationService.showSuccess('Order item Added successfully:');
        // Optionally, navigate back to the order item list or perform any other action
      },
      (error) => {
        this.notificationService.showError('Error While Adding order item:' +error);
      }
    );
  }

  canceled(){
    this.router.navigate(['/order']);
  }
  confirmDelete() {
    if (this.orderItem && this.orderItem.id) {
      if (confirm('Are you sure you want to delete this order item?')) {
        this.orderItemService.deleteOrderItem(this.orderItem.id).subscribe(
          () => {
           this.notificationService.showSuccess('Order item deleted successfully.');
            // Optionally, navigate back to the order list or perform any other action
          },
          (error) => {
            this.notificationService.showError('Error while deleting order item' +error);
            // Optionally, show an error message to the user
          }
        );
      }
    } else {
      this.notificationService.showError('Order item ID is missing.');
    }
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  getKeys(obj:any):Array<string>{
    return Object.keys(obj);
  }
}
