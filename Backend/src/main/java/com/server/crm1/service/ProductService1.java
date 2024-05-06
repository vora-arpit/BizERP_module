package com.server.crm1.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.crm1.exception.ResourceNotFoundException;
import com.server.crm1.model.sales.Product;
import com.server.crm1.model.users.User;
import com.server.crm1.repository.product.ProductRepository1;

@Service
public class ProductService1 {

    @Autowired
    private ProductRepository1 productRepository;

    @Autowired
    private UserService userService;


    public Product addProduct(Product product) {
        product.setCreatedAt(new Date());
        product.setCreatedBy(userService.getCurrentUser());
        return productRepository.save(product);
    }

    public Product updateProduct(Long productId, Product updatedProduct) {
        Product existingProduct = getProductById(productId);
        if (existingProduct != null) {
            // Update fields of existingProduct with fields of updatedProduct
            // For example:
            existingProduct.setName(updatedProduct.getName());
            existingProduct.setPrice(updatedProduct.getPrice());
            existingProduct.setQuantityInStock(updatedProduct.getQuantityInStock());
            existingProduct.setCreatedAt(existingProduct.getCreatedAt());
            existingProduct.setCreatedBy(existingProduct.getCreatedBy());
            return productRepository.save(existingProduct);
        }
        return null;
    }

    // public List<Product> getAllProducts() {
    //     User currentUser=userService.getCurrentUser();
    //     return productRepository.findByCreatedBy(currentUser);
    // }

    public List<Product> getAllProducts() {
            // User currentUser=userService.getCurrentUser();
            return productRepository.findAll();
        }

    public Product getProductById(Long productId) {
        Optional<Product> product = productRepository.findById(productId);
        return product.orElse(null);
    }

    public void deleteProduct(Long productId) {
        Product existingProduct = getProductById(productId);
        if (existingProduct != null) {
            productRepository.delete(existingProduct);
        } else {
            throw new ResourceNotFoundException("Product", "id", productId);
        }
    }
}
