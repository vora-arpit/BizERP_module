package com.server.crm1.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.crm1.exception.ResourceNotFoundException;
import com.server.crm1.model.sales.OrderItem;
import com.server.crm1.model.sales.Product;
import com.server.crm1.model.sales.Order;
import com.server.crm1.repository.orderitem.OrderItemRepository;


@Service
public class OrderItemService {

    @Autowired
    private OrderItemRepository orderItemRepository;


    @Autowired
    private OrderService orderService;

    @Autowired
    private ProductService1 productService1;

    public OrderItem addOrderItem(Long productId, Integer orderId, BigDecimal quantity, OrderItem orderItem) {
        Order order = orderService.getOrderById(orderId);
        orderItem.setOrder(order);
        
        Product product = productService1.getProductById(productId);
        orderItem.setProduct(product);
        
        orderItem.setQuantity(quantity);
        
        BigDecimal price = product.getPrice().multiply(quantity); // Use multiply method
        orderItem.setPrice(price);
        
        return orderItemRepository.save(orderItem);
    }

    public OrderItem updateOrderItem(Long orderItemId,Long productId,BigDecimal quantity,Integer orderId, OrderItem updatedOrderItem) {
        Order order = orderService.getOrderById(orderId);
        updatedOrderItem.setOrder(order);

        Product product=productService1.getProductById(productId);
        updatedOrderItem.setProduct(product);

        updatedOrderItem.setQuantity(quantity);

        BigDecimal price = product.getPrice().multiply(quantity); // Use multiply method
        updatedOrderItem.setPrice(price);
        
        return orderItemRepository.save(updatedOrderItem);
    }

    public List<OrderItem> getAllOrderItems() {
        return orderItemRepository.findAll();
    }

    public OrderItem getOrderItemById(Long orderItemId) {
        Optional<OrderItem> orderItem = orderItemRepository.findById(orderItemId);
        return orderItem.orElse(null);
    }

    public List<OrderItem> getOrderItemsByOrder(Order order) {
        return orderItemRepository.findByOrder(order);
    }
    
    public void deleteOrderItem(Long orderItemId) {
        OrderItem existingOrderItem = getOrderItemById(orderItemId);
        if (existingOrderItem != null) {
            orderItemRepository.delete(existingOrderItem);
        } else {
            throw new ResourceNotFoundException("OrderItem", "id", orderItemId);
        }
    }
}
