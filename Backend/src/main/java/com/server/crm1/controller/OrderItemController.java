package com.server.crm1.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.server.crm1.model.sales.OrderItem;
import com.server.crm1.payload.ApiResponse;
import com.server.crm1.repository.order.OrderRepository;
import com.server.crm1.service.OrderItemService;
import com.server.crm1.exception.ResourceNotFoundException;
import com.server.crm1.model.sales.Order;




@RestController
@RequestMapping(path="/orderitem" )
public class OrderItemController {

    private final OrderItemService orderItemService;
    
    @Autowired
	private OrderRepository orderRepo;

    
    public OrderItemController(OrderItemService orderItemService) {
        this.orderItemService = orderItemService;
    }

    @GetMapping
    public List<OrderItem> getAllOrderItems() {
        return orderItemService.getAllOrderItems();
    }

    @GetMapping("/{id}")
    public OrderItem getOrderItemById(@PathVariable Long id) {
        return orderItemService.getOrderItemById(id);
    }
    @GetMapping("order/{orderId}")
    public List<OrderItem> getOrderItemsByOrderId(@PathVariable Integer orderId) {
        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order", "id", orderId));
        return orderItemService.getOrderItemsByOrder(order);
    }

    @PostMapping("/{productId}/{orderId}")
    public OrderItem createOrderItem(@PathVariable Long productId,@PathVariable Integer orderId, OrderItem orderItem) {
        return orderItemService.addOrderItem(productId,orderId,orderItem);
    }

    @PutMapping("/{id}")
    public OrderItem updateOrderItem(@PathVariable Long id, @Valid @RequestBody OrderItem orderItemRequest ) {
        return orderItemService.updateOrderItem(id, orderItemRequest);
    }

    // @PutMapping("/orderid")
    // public void updateOrder(@PathVariable Long orderitem_id, @Valid @RequestBody Integer order_id ) {
    //      orderItemService.setOrderId(orderitem_id, order_id);
    // }

    @DeleteMapping("/{id}")
    public ApiResponse delete(@PathVariable Long id) {
        orderItemService.deleteOrderItem(id);
        return new ApiResponse(true, "OrderItem " + id + " deleted");
    }

   
}
