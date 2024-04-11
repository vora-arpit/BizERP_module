import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrderService } from '../../../core';

@Component({
  selector: 'app-order-list-order',
  templateUrl: './order-list-order.component.html',
  styleUrl: './order-list-order.component.scss'
})
export class OrderListOrderComponent implements OnInit{
  orders: Order[] = [];
  pagedOrders: Order[] = []; // Subset of orders to display per page
  currentPage = 1; // Current page number
  itemsPerPage = 5; // Number of items to display per page

  constructor(private route: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.findAll().subscribe((result) => {
      this.orders = result;
      console.log(this.orders); // Log orders array to check if it contains data
      this.setPage(1); // Initialize pagedOrders when orders are available
    });
  }
  
  

  // Function to set the current page
  setPage(page: number) {
    if (page < 1 || page > this.totalPages()) {
      return;
    }
    this.currentPage = page;
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.orders.length);
    this.pagedOrders = this.orders.slice(startIndex, endIndex);
  }

  // Function to get the total number of pages
  totalPages(): number {
    return Math.ceil(this.orders.length / this.itemsPerPage);
  }


  updatePagedOrders(): void {
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedOrders = this.orders.slice(startIndex, endIndex);
  }

  // Event handler for page change event from MatPaginator
  onPageChange(event: any): void {
    this.currentPage = event.pageIndex; // Update currentPage
    this.itemsPerPage = event.pageSize; // Update itemsPerPage
    this.updatePagedOrders(); // Update pagedOrders based on new pagination settings
  }
}
