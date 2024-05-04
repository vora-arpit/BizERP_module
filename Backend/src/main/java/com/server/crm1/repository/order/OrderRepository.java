package com.server.crm1.repository.order;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.server.crm1.model.sales.Customer;
import com.server.crm1.model.sales.Order;
import com.server.crm1.model.users.User;


@Repository
public interface OrderRepository extends JpaRepository<Order, Integer>, OrderRepositoryCustom {

	List<Order> findByCustomer(Customer customer);


	List<Order> findByCreatedBy(User createdBy);


}
