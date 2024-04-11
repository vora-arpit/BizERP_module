package com.server.crm1.repository.product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.server.crm1.model.sales.Product;

@Repository
public interface ProductRepository1 extends JpaRepository<Product, Long> {

}
