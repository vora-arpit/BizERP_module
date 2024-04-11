package com.server.crm1.repository.customer;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.server.crm1.model.sales.Customer;
import com.server.crm1.model.users.User;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer>, CustomerRepositoryCustom {

	List<Customer> findByCreatedBy(User createdBy);

}
