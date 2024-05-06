package com.server.crm1.repository.customer;

import java.util.List;

import com.server.crm1.model.sales.Customer;

public interface CustomerRepositoryCustom {

	public List<Customer> search(String filter, List<Integer> userIds);


}
