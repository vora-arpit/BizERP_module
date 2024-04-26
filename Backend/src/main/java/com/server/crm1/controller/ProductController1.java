package com.server.crm1.controller;

import com.server.crm1.model.sales.Product;
import com.server.crm1.payload.ApiResponse;
import com.server.crm1.service.ProductService1;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController1 {

    private final ProductService1 productService;


    public ProductController1(ProductService1 productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    @PostMapping
    public Product createProduct(@Valid @RequestBody Product product) {
        return productService.addProduct(product);
    }

    @PatchMapping("/{id}")
    public Product updateProduct(@PathVariable Long id, @Valid @RequestBody Product productRequest) {
        return productService.updateProduct(id, productRequest);
    }

    @DeleteMapping("/{id}")
    public ApiResponse deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return new ApiResponse(true, "Product deleted successfully");
    }
}
