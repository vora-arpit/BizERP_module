package com.server.crm1.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.server.crm1.exception.ResourceNotFoundException;
import com.server.crm1.model.sales.Customer;
import com.server.crm1.model.sales.Order;
import com.server.crm1.model.sales.OrderItem;

import com.server.crm1.repository.order.OrderRepository;

@Service
public class OrderService {
    @Autowired
	private UserService userService;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemService orderItemService;


    public Order addOrder(Integer customerId,Long orderItemId ,Order order) {
        // try {
            order.setCreatedBy(userService.getCurrentUser());
            order.setCreatedAt(new Date());
            Customer customer=customerService.findById(customerId);
            order.setCustomer(customer);
            OrderItem orderItem=orderItemService.getOrderItemById(orderItemId);
            order.setOrderItem(orderItem);
            order.setStatus(Order.OrderStatus.STARTED);

            return orderRepository.save(order);
        // } catch (Exception e) {
        //     e.printStackTrace();
        //     throw new RuntimeException("Error occurred while adding order: " + e.getMessage());
        // }
    }
    
    public List<Order> getAllOrder() {
        return orderRepository.findAll();
    }
    public Order getOrderById(Integer Id) {
        Optional<Order> order = orderRepository.findById(Id);
        return order.orElse(null);
    }


     public void deleteOrder(Integer id) {
        Order existingOrder = getOrderById(id);
        if (existingOrder != null) {
            orderRepository.delete(existingOrder);
        } else {
            throw new ResourceNotFoundException("Order", "id", id);
        }
    }
    
}
