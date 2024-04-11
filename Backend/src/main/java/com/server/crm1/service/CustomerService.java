package com.server.crm1.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.crm1.exception.BadRequestException;
import com.server.crm1.exception.ResourceNotFoundException;
import com.server.crm1.model.sales.Customer;
import com.server.crm1.model.sales.Order;
import com.server.crm1.repository.customer.CustomerRepository;
import com.server.crm1.repository.order.OrderRepository;

@Service
public class CustomerService {

	@Autowired
	private UserService userService;

	@Autowired
	private CustomerRepository customerRepo;

	@Autowired
	private OrderRepository orderRepo;

	public Customer create(Customer customer) {
		customer.setCreatedBy(userService.getCurrentUser());
		customer.setCreatedAt(new Date());
		return customerRepo.save(customer);
	}

	public void delete(Integer id) {
		Customer c = customerRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Customer", "id", id));

		List<Order> orders = orderRepo.findByCustomer(c);
		if (!orders.isEmpty())
			throw new BadRequestException("This Customer has " + orders.size() + " orders and cannot be deleted");

		customerRepo.delete(c);
	}

	public Customer findById(Integer id) {
        return customerRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer", "id", id));
    }

}
