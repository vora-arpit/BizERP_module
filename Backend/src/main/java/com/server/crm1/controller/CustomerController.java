package com.server.crm1.controller;

import java.util.Date;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.server.crm1.exception.ResourceNotFoundException;
import com.server.crm1.model.sales.Customer;
import com.server.crm1.model.users.User;
import com.server.crm1.payload.ApiResponse;
import com.server.crm1.repository.customer.CustomerRepository;
import com.server.crm1.service.CustomerService;
import com.server.crm1.service.UserService;

@RestController
@RequestMapping(path = "customers")
public class CustomerController {

	@Autowired
	private CustomerRepository customerRepo;

	@Autowired
	private UserService userService;

	@Autowired
	private CustomerService customerService;

	// @GetMapping
	// public List<Customer> search(@RequestParam("filter") String filter) {
	// 	User currentUser = userService.getCurrentUser();
	// 	System.out.println("currentUser"+currentUser);
	// 	return customerRepo.search(filter, currentUser.getId());
	// }

	@GetMapping
	public List<Customer> getAllCustomers(@RequestParam("filter") String filter) {
		User currentUser=userService.getCurrentUser();
		return customerRepo.search(filter,currentUser.getId());
	}
	

	@GetMapping("/{id}")
	public Customer findById(@PathVariable Integer id) {
		return customerRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Customer", "id", id));
	}

	@PostMapping
	public Customer create(@Valid @RequestBody Customer customer) {
		customer.setCreatedBy(userService.getCurrentUser());
		customer.setCreatedAt(new Date());
		return customerRepo.save(customer);
	}

	@PutMapping("/{id}")
	public Customer update(@PathVariable(value = "id") Integer customerId, @Valid @RequestBody Customer customer) {
		customer.setId(customerId);
		Customer existingCustomer=findById(customerId);
		if(existingCustomer != null){
			customer.setCreatedBy(existingCustomer.getCreatedBy());
			customer.setCreatedAt(existingCustomer.getCreatedAt());
		}
		return customerRepo.save(customer);
	}

	@DeleteMapping("/{id}")
	public ApiResponse delete(@PathVariable(value = "id") Integer id) {
		customerService.delete(id);
		return new ApiResponse(true, "Customer " + id + " deleted");
	}

}
