package com.server.crm1.model.sales;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.server.crm1.model.users.User;

@Entity
@Table(name = "orders")
public class Order {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Integer id;

	private Date createdAt;

	@ManyToOne
	@JoinColumn(name = "createdby_id")
	private User createdBy;

	@ManyToOne
	@JoinColumn(name = "customer_id")
	private Customer customer;

	@ManyToOne
	@JoinColumn(name = "orderitem_id")
	private OrderItem orderitem;

	
	@OneToMany(mappedBy = "order", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
	@JsonIgnore
	private List<OrderItem> items;

	@Column(columnDefinition = "varchar(255) default 'STARTED'")
	@Enumerated(EnumType.STRING)
	private OrderStatus status;

	@Transient
	private Object total, itemcount;
	
	public enum OrderStatus {
		STARTED, PAID, SHIPPED;

		public static OrderStatus parse(Object src) {
			try {
				return valueOf(src + "");
			} catch (Exception e) {
				return null;
			}
		}
	}


	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public OrderItem getOrderItem() {
		return orderitem;
	}

	public void setOrderItem(OrderItem orderitem) {
		this.orderitem = orderitem;
	}


	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public List<OrderItem> getItems() {
		return items;
	}

	public void setItems(List<OrderItem> items) {
		this.items = items;
	}

	public User getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(User createdBy) {
		this.createdBy = createdBy;
	}

	public OrderStatus getStatus() {
		return status;
	}

	public void setStatus(OrderStatus status) {
		this.status = status;
	}

	public Object getItemcount() {
		return itemcount;
	}

	public void setItemcount(Object itemcount) {
		this.itemcount = itemcount;
	}

	public Object getTotal() {
		return total;
	}

	public void setTotal(Object total) {
		this.total = total;
	}
	
}
