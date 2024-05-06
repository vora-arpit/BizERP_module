package com.server.crm1.repository.order;

import java.util.List;

import com.server.crm1.model.sales.Order;
import com.server.crm1.payload.AccountOverview;

public interface OrderRepositoryCustom {
	
	public List<Order> getLastOrders(List<Integer> userIds, int max);

    public AccountOverview getCurrentAccountOverview(List<Integer> userIds);
	


}
