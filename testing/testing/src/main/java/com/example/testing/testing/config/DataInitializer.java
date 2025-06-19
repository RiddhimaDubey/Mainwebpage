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
        System.out.println("   - riddhima226100 (Riddhima)");
        System.out.println("   - pawan226100 (Pawan)");
        System.out.println("   - aayushmaan226100 (Aayushmaan)");
        System.out.println("   - priya226100 (Priya)");
        System.out.println("   - rahul226100 (Rahul)");
        System.out.println("   - neha226100 (Neha)");
        System.out.println("   - vikram226100 (Vikram)");
    }
} 