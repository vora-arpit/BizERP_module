package com.server.crm1.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PatchMapping;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.server.crm1.model.sales.Order;
import com.server.crm1.model.users.User;
import com.server.crm1.repository.order.OrderRepository;
import com.server.crm1.security.UserPrincipal;
import com.server.crm1.service.OrderService;
import com.server.crm1.service.UserService;

@RestController
@RequestMapping("/order")
public class OrderController {
    @Autowired
	private OrderRepository orderRepo;

    @Autowired
    private final OrderService orderService;
    
    @Autowired
    private UserService userService;
    
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    // @GetMapping("/lastorders")
	// public List<Order> getAllOrder(@AuthenticationPrincipal Authentication authentication) {
	// 	return orderRepo.getLastOrders(((UserPrincipal) authentication.getPrincipal()).getId(), 5);
	// }
    
    @GetMapping("/orders")
	public List<Order> getAll() {
        User currentUser=userService.getCurrentUser();
		return orderRepo.findByCreatedBy(currentUser);
	}

    @GetMapping("/{id}") // Define a path variable for order ID
	public Order getOrderById(@PathVariable Integer id){
	return orderService.getOrderById(id);
	}

    @PatchMapping("/{customerId}/{orderItemId}")
    public Order createOrder(@PathVariable Integer customerId,@PathVariable Long orderItemId, Order order) {
    // Integer customerId = (Integer) requestBody.get("customerId");
    // Order order = objectMapper.convertValue(requestBody.get("order"), Order.class);
    return orderService.addOrder(customerId,orderItemId,order);
}


    @PatchMapping("/{id}")
    public Order updateOrder(@PathVariable(value="id") Integer id, @Valid @RequestBody Order order) {
        order.setId(id);
        return orderRepo.save(order);
    }

    

}
