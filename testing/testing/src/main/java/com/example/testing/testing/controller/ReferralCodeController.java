package com.example.testing.testing.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.testing.testing.dto.ReferralCodeRequest;
import com.example.testing.testing.dto.ReferralCodeResponse;
import com.example.testing.testing.service.ReferralCodeService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/referral-codes")
@CrossOrigin(origins = "*")
public class ReferralCodeController {

    @Autowired
    private ReferralCodeService service;

    // Create new referral code
    @PostMapping
    public ResponseEntity<ReferralCodeResponse> createReferralCode(
            @Valid @RequestBody ReferralCodeRequest request) {
        try {
            ReferralCodeResponse response = service.createReferralCode(request);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // Get all referral codes
    @GetMapping
    public ResponseEntity<List<ReferralCodeResponse>> getAllReferralCodes() {
        List<ReferralCodeResponse> referralCodes = service.getAllReferralCodes();
        return new ResponseEntity<>(referralCodes, HttpStatus.OK);
    }

    // Get all active referral codes
    @GetMapping("/active")
    public ResponseEntity<List<ReferralCodeResponse>> getActiveReferralCodes() {
        List<ReferralCodeResponse> referralCodes = service.getActiveReferralCodes();
        return new ResponseEntity<>(referralCodes, HttpStatus.OK);
    }

    // Get referral code by ID
    @GetMapping("/{id}")
    public ResponseEntity<ReferralCodeResponse> getReferralCodeById(@PathVariable Long id) {
        try {
            ReferralCodeResponse referralCode = service.getReferralCodeById(id);
            return new ResponseEntity<>(referralCode, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Get referral code by code
    @GetMapping("/code/{code}")
    public ResponseEntity<ReferralCodeResponse> getReferralCodeByCode(@PathVariable String code) {
        try {
            ReferralCodeResponse referralCode = service.getReferralCodeByCode(code);
            return new ResponseEntity<>(referralCode, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Update referral code
    @PutMapping("/{id}")
    public ResponseEntity<ReferralCodeResponse> updateReferralCode(
            @PathVariable Long id,
            @Valid @RequestBody ReferralCodeRequest request) {
        try {
            ReferralCodeResponse response = service.updateReferralCode(id, request);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete referral code
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReferralCode(@PathVariable Long id) {
        try {
            service.deleteReferralCode(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Activate referral code
    @PutMapping("/{id}/activate")
    public ResponseEntity<ReferralCodeResponse> activateReferralCode(@PathVariable Long id) {
        try {
            ReferralCodeResponse response = service.activateReferralCode(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Deactivate referral code
    @PutMapping("/{id}/deactivate")
    public ResponseEntity<ReferralCodeResponse> deactivateReferralCode(@PathVariable Long id) {
        try {
            ReferralCodeResponse response = service.deactivateReferralCode(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Get top referral codes by usage
    @GetMapping("/top")
    public ResponseEntity<List<ReferralCodeResponse>> getTopReferralCodes() {
        List<ReferralCodeResponse> referralCodes = service.getTopReferralCodes();
        return new ResponseEntity<>(referralCodes, HttpStatus.OK);
    }

    // Get referral codes with minimum usage
    @GetMapping("/usage/{minUsage}")
    public ResponseEntity<List<ReferralCodeResponse>> getReferralCodesWithMinUsage(
            @PathVariable Integer minUsage) {
        List<ReferralCodeResponse> referralCodes = service.getReferralCodesWithMinUsage(minUsage);
        return new ResponseEntity<>(referralCodes, HttpStatus.OK);
    }

    // Get referral code statistics
    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Object>> getStatistics() {
        Map<String, Object> statistics = new HashMap<>();
        statistics.put("totalUsageCount", service.getTotalUsageCount());
        statistics.put("topReferralCodes", service.getTopReferralCodes());
        return new ResponseEntity<>(statistics, HttpStatus.OK);
    }

    // Validate referral code
    @GetMapping("/validate/{code}")
    public ResponseEntity<Map<String, Boolean>> validateReferralCode(@PathVariable String code) {
        Map<String, Boolean> response = new HashMap<>();
        response.put("valid", service.isValidReferralCode(code));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Initialize default referral codes
    @PostMapping("/initialize")
    public ResponseEntity<Map<String, String>> initializeDefaultReferralCodes() {
        try {
            service.initializeDefaultReferralCodes();
            Map<String, String> response = new HashMap<>();
            response.put("message", "Default referral codes initialized successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Failed to initialize default referral codes");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
} 