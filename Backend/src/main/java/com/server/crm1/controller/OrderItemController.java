package com.server.crm1.controller;

import java.math.BigDecimal;
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

    @PostMapping("/{productId}/{orderId}/{quantity}")
    public OrderItem createOrderItem(@PathVariable Long productId,@PathVariable Integer orderId,@PathVariable BigDecimal quantity,OrderItem orderItem) {
        return orderItemService.addOrderItem(productId,orderId,quantity,orderItem);
    }

    @PutMapping("/{id}/{productId}/{quantity}/{orderId}")
    public OrderItem updateOrderItem(@PathVariable Long id, @PathVariable Long productId,@PathVariable BigDecimal quantity,@PathVariable Integer orderId,OrderItem orderItemRequest ) {
        return orderItemService.updateOrderItem(id,productId,quantity,orderId,orderItemRequest);
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
