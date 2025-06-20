package com.example.testing.testing.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ReferralCodeRequest {

    @NotBlank(message = "Referral code is required")
    private String code;

    // Manual getters and setters in case Lombok fails
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
} 