// package com.server.crm1.repository.order;

// import java.util.List;
// import java.util.Map;


// import org.hibernate.Hibernate;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
// import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

// import com.server.crm1.model.sales.Customer;
// import com.server.crm1.model.sales.Order;
// import com.server.crm1.model.sales.Order.OrderStatus;
// import com.server.crm1.payload.AccountOverview;

// public class OrderRepositoryImpl implements OrderRepositoryCustom {

// 	@Autowired
// 	private NamedParameterJdbcTemplate jdbc;


// @Override
// public List<Order> getLastOrders(Integer userId, int max) {
//     String sql = "SELECT o.id, o.created_at, o.status, " +
//                  "       c.id AS customer_id, c.name AS customer_name, c.createdAt AS customersince, " +
//                  "       COUNT(1) AS items, SUM(i.price*i.quantity) AS total " +
//                  "FROM orders o " +
//                  "JOIN customer c ON o.customer_id = c.id " +
//                  "JOIN orderitem i ON i.order_id = o.id " +
//                  "WHERE o.createdby_id = :userId " +
//                  "GROUP BY o.id, c.id " +
//                  "ORDER BY o.created_at DESC " +
//                  "LIMIT :max";

//     MapSqlParameterSource parameters = new MapSqlParameterSource();
//     parameters.addValue("userId", userId);
//     parameters.addValue("max", max);

//     List<Order> orders = jdbc.query(
//             sql,
//             parameters,
//             (rs, rowNum) -> {
//                 Order order = new Order();
//                 order.setId(rs.getInt("id"));
//                 order.setCreatedAt(rs.getDate("created_at"));
//                 order.setStatus(OrderStatus.parse(rs.getString("status")));

//                 Customer customer = new Customer();
//                 customer.setId(rs.getInt("customer_id"));
//                 customer.setName(rs.getString("customer_name"));
//                 customer.setCreatedAt(rs.getDate("customersince"));
//                 order.setCustomer(customer);

//                 order.setItemcount(rs.getObject("items"));
//                 order.setTotal(rs.getObject("total"));
                
//                 return order;
//             });

//     for (Order order : orders) {
//         Hibernate.initialize(order.getItems());
//     }

//     return orders;
// }



// 	@Override
// 	public AccountOverview getCurrentAccountOverview(Integer userId) {
// 		AccountOverview aco = new AccountOverview();
// 		Map<String, Object> vals = getAccountSummary(userId, " now() - interval '1 month' and now() ");
// 		aco.setMonthlyCustomersCurrent(vals.get("customers"));
// 		aco.setMonthlySalesCurrent(vals.get("total"));

// 		vals = getAccountSummary(userId, " now() - interval '3 month' and now() ");
// 		aco.setQuarterlyCustomersCurrent(vals.get("customers"));
// 		aco.setQuarterlySalesCurrent(vals.get("total"));
// 		return aco;
// 	}

// 	private Map<String, Object> getAccountSummary(Integer userId, String period) {
// 		String sql = "select \n" +
// 				" round(coalesce(count(distinct c.id),0),0) customers,\n" +
// 				" round(coalesce(sum(i.price*i.quantity),0),0) total\n" +
// 				" from orders o \n" +
// 				" join customer c on o.customer_id=c.id \n" +
// 				" join orderitem i on i.order_id=o.id \n" +
// 				" where o.createdby_id = " + userId + " and o.created_at between " + period;
// 		MapSqlParameterSource mapSqlParameterSource = new MapSqlParameterSource();
// 		return jdbc.queryForMap(sql, mapSqlParameterSource);
// 	}

// }


package com.server.crm1.repository.order;

import java.util.List;
import java.util.Map;

import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import com.server.crm1.model.sales.Customer;
import com.server.crm1.model.sales.Order;
import com.server.crm1.model.sales.Order.OrderStatus;
import com.server.crm1.payload.AccountOverview;

@Repository
public class OrderRepositoryImpl implements OrderRepositoryCustom {

    @Autowired
    private NamedParameterJdbcTemplate jdbc;

    @Override
    public List<Order> getLastOrders(List<Integer> userIds, int max) {
        String sql = "SELECT o.id, o.created_at, o.status, " +
                "       c.id AS customer_id, c.name AS customer_name, c.createdAt AS customersince, " +
                "       COUNT(1) AS items, SUM(i.price*i.quantity) AS total " +
                "FROM orders o " +
                "JOIN customer c ON o.customer_id = c.id " +
                "JOIN orderitem i ON i.order_id = o.id " +
                "WHERE o.createdby_id IN (:userIds) " +
                "GROUP BY o.id, c.id " +
                "ORDER BY o.created_at DESC " +
                "LIMIT :max";

        MapSqlParameterSource parameters = new MapSqlParameterSource();
        parameters.addValue("userIds", userIds);
        parameters.addValue("max", max);

        List<Order> orders = jdbc.query(
                sql,
                parameters,
                (rs, rowNum) -> {
                    Order order = new Order();
                    order.setId(rs.getInt("id"));
                    order.setCreatedAt(rs.getDate("created_at"));
                    order.setStatus(OrderStatus.parse(rs.getString("status")));

                    Customer customer = new Customer();
                    customer.setId(rs.getInt("customer_id"));
                    customer.setName(rs.getString("customer_name"));
                    customer.setCreatedAt(rs.getDate("customersince"));
                    order.setCustomer(customer);

                    order.setItemcount(rs.getObject("items"));
                    order.setTotal(rs.getObject("total"));
                    
                    return order;
                });

        for (Order order : orders) {
            Hibernate.initialize(order.getItems());
        }

        return orders;
    }

    @Override
    public AccountOverview getCurrentAccountOverview(List<Integer> userIds) {
        AccountOverview aco = new AccountOverview();
        Map<String, Object> vals = getAccountSummary(userIds, " now() - interval '1 month' and now() ");
        aco.setMonthlyCustomersCurrent(vals.get("customers"));
        aco.setMonthlySalesCurrent(vals.get("total"));

        vals = getAccountSummary(userIds, " now() - interval '3 month' and now() ");
        aco.setQuarterlyCustomersCurrent(vals.get("customers"));
        aco.setQuarterlySalesCurrent(vals.get("total"));
        return aco;
    }

    private Map<String, Object> getAccountSummary(List<Integer> userIds, String period) {
        String sql = "select \n" +
                " round(coalesce(count(distinct c.id),0),0) customers,\n" +
                " round(coalesce(sum(i.price*i.quantity),0),0) total\n" +
                " from orders o \n" +
                " join customer c on o.customer_id=c.id \n" +
                " join orderitem i on i.order_id=o.id \n" +
                " where o.createdby_id IN (:userIds) and o.created_at between " + period;
        MapSqlParameterSource mapSqlParameterSource = new MapSqlParameterSource();
        mapSqlParameterSource.addValue("userIds", userIds);
        return jdbc.queryForMap(sql, mapSqlParameterSource);
    }
}

