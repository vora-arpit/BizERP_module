package com.server.crm1.repository.product;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.server.crm1.model.sales.Product;
import com.server.crm1.model.users.User;

@Repository
public interface ProductRepository1 extends JpaRepository<Product, Long> {

    List<Product> findByCreatedBy(User createdBy);
}
