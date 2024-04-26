package com.server.crm1.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.server.crm1.model.sales.Order;
import com.server.crm1.model.sales.Order.OrderStatus;
import com.server.crm1.model.stripe.StripeCheckoutPayment;
import com.server.crm1.repository.order.OrderRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

@RestController
@RequestMapping("/payment")
public class StripeController {

    @Autowired
    private OrderRepository orderRepository;

    private static Gson gson = new Gson();

    @PostMapping
    public String paymentWithCheckoutPage(@RequestBody StripeCheckoutPayment payment, @RequestParam("orderId") Integer orderId) throws StripeException {
        init();

        SessionCreateParams params = SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl(payment.getSuccessUrl() + "?orderId=" + orderId)
                .setCancelUrl(payment.getCancelUrl())
                .addLineItem(
                        SessionCreateParams.LineItem.builder()
                                .setQuantity(payment.getQuantity())
                                .setPriceData(
                                        SessionCreateParams.LineItem.PriceData.builder()
                                                .setCurrency(payment.getCurrency())
                                                .setUnitAmount(payment.getAmount()) // Changed to setUnitAmount(payment.getAmount() * 100)
                                                .setProductData(
                                                        SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                .setName(payment.getName())
                                                                .build())
                                                .build())
                                .build())
                .build();

        Session session = Session.create(params);

        Map<String, String> responseData = new HashMap<>();
        responseData.put("id", session.getId());

        // Send response to the client
        String response = gson.toJson(responseData);
        System.out.println("orderId:-"+orderId);

        System.out.println("response data:-"+response);
        // Check if payment was successful
        if (session.getPaymentStatus().equals("paid")) {
            // Update order status to "PAID"
            Order order = orderRepository.findById(payment.getOrderId()).orElse(null);
            if (order != null) {
                order.setStatus(OrderStatus.PAID);
                orderRepository.save(order);
            }
        }

        return response;
    }


    @PostMapping("/success")
public ResponseEntity<String> paymentSuccess(@RequestBody String requestData) {
    try {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> requestDataMap = objectMapper.readValue(requestData, Map.class);

        Map<String, Object> data = (Map<String, Object>) requestDataMap.get("data");
        Map<String, Object> object = (Map<String, Object>) data.get("object");
        String successUrl = (String) object.get("success_url");

        // Extract orderId from successUrl
        Integer orderId = null;
        Pattern pattern = Pattern.compile("\\?orderId=(\\d+)");
        Matcher matcher = pattern.matcher(successUrl);
        if (matcher.find()) {
            orderId = Integer.parseInt(matcher.group(1));
        }

        String paymentStatus = (String) object.get("payment_status");

        if ("paid".equals(paymentStatus) && orderId != null) {
            Optional<Order> orderOptional = orderRepository.findById(orderId);
            if (orderOptional.isPresent()) {
                Order order = orderOptional.get();
                order.setStatus(OrderStatus.PAID);
                orderRepository.save(order);
                return ResponseEntity.ok("Order status updated successfully");
            }
        }

    } catch (Exception e) {
        e.printStackTrace();
    }

    return ResponseEntity.badRequest().body("Failed to update order status");
}




    private static void init() {
        Stripe.apiKey = "sk_test_51P8zDOSH1kxQcZnuqv2iqEUV9chG2PZDq4zClRZQxisnUvDJERXUwMHwWxrSSBfYAifNKB3cB2Z9otx56BbGEEGN00Taov6nPB";
    }
}