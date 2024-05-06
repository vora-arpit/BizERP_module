package com.server.crm1.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.crm1.model.sales.Order;
import com.server.crm1.model.users.User;
import com.server.crm1.payload.AccountOverview;
import com.server.crm1.repository.order.OrderRepository;
import com.server.crm1.security.UserPrincipal;
import com.server.crm1.service.OrderService;
import com.server.crm1.service.UserService;

@RestController
@RequestMapping(path = "dashboard", produces = "application/json")
public class DashboardController {

	@Autowired
	private OrderRepository orderRepo;
	@Autowired
	private OrderService orderService;

	@Autowired
	private UserService userService;

	// @GetMapping("/account")
	// public AccountOverview account(@AuthenticationPrincipal Authentication authentication) {
	// 	return orderRepo.getCurrentAccountOverview(((UserPrincipal) authentication.getPrincipal()).getId());
	// }

	// @GetMapping("/last-orders")
	// public List<Order> lastOrders(@AuthenticationPrincipal Authentication authentication) {
	// 	return orderRepo.getLastOrders(((UserPrincipal) authentication.getPrincipal()).getId(), 5);
	// }

	@GetMapping("/account")
	public AccountOverview account(@AuthenticationPrincipal Authentication authentication) {
    Integer organizationId = userService.getOrganizationId();
    List<User> users = userService.getUsersByOrganizationId(organizationId);
    List<Integer> userIds = users.stream().map(User::getId).collect(Collectors.toList());
    
    return orderRepo.getCurrentAccountOverview(userIds);
}

	@GetMapping("/last-orders")
	public List<Order> lastOrders(@AuthenticationPrincipal Authentication authentication) {
		Integer organizationId = userService.getOrganizationId();
		List<User> users = userService.getUsersByOrganizationId(organizationId);
		List<Integer> userIds = users.stream().map(User::getId).collect(Collectors.toList());
		
		return orderRepo.getLastOrders(userIds, 5);
	}

	
	@GetMapping("/{id}") // Define a path variable for order ID
	public Order getOrderById(@PathVariable Integer id){
	return orderService.getOrderById(id);
	}
}
