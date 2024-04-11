package com.server.crm1.repository.order;

import java.util.List;

import com.server.crm1.model.sales.Order;
import com.server.crm1.payload.AccountOverview;

public interface OrderRepositoryCustom {
	
	public List<Order> getLastOrders(Integer userId, int max);


	public AccountOverview getCurrentAccountOverview(Integer userId);
	


}
