package com.server.crm1.repository.orderitem;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.server.crm1.model.sales.OrderItem;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long>, OrderItemRepositoryCustom {
    // Optional<OrderItem> findByOrder(Order order);
    
}
