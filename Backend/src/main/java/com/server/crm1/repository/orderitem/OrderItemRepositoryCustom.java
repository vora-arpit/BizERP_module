package com.server.crm1.repository.orderitem;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.server.crm1.model.sales.OrderItem;
import com.server.crm1.model.sales.Order;
@Repository
public interface OrderItemRepositoryCustom {
    List<OrderItem> findByOrder(Order order);

    
}
