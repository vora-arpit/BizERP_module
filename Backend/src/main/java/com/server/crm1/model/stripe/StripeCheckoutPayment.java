package com.server.crm1.model.stripe;

public class StripeCheckoutPayment {

    private String name;
    private String currency;
    private Long amount; // Changed to Long
    private Long quantity; // Changed to Long
    private String cancelUrl;
    private String successUrl;
    private Integer orderId; 

    public StripeCheckoutPayment() {
    }

    public StripeCheckoutPayment(String name, String currency, Long amount, Long quantity, String cancelUrl,
            String successUrl, Integer orderId) {
        this.name = name;
        this.currency = currency;
        this.amount = amount;
        this.quantity = quantity;
        this.cancelUrl = cancelUrl;
        this.successUrl = successUrl;
        this.orderId = orderId; 
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public String getCancelUrl() {
        return cancelUrl;
    }

    public void setCancelUrl(String cancelUrl) {
        this.cancelUrl = cancelUrl;
    }

    public String getSuccessUrl() {
        return successUrl;
    }

    public void setSuccessUrl(String successUrl) {
        this.successUrl = successUrl;
    }

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }
}
