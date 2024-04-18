package com.server.crm1.payload;

import javax.validation.constraints.NotBlank;

public class ResetPasswordRequest {
    @NotBlank
    private String password;

    public String getPassword() {
        return password;
    
    }
    public void setPassword(String password) {
        this.password = password;
    }
}
