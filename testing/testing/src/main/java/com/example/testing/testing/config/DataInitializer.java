package com.example.testing.testing.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.testing.testing.service.ReferralCodeService;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private ReferralCodeService referralCodeService;

    @Override
    public void run(String... args) throws Exception {
        // Initialize default referral codes on application startup
        referralCodeService.initializeDefaultReferralCodes();
        System.out.println("✅ Default referral codes initialized successfully!");
        System.out.println("📋 Available referral codes:");
        for (int i = 1; i <= 20; i++) {
            String code = String.format("   - 226100%02d", i);
            System.out.println(code);
        }
    }
} 