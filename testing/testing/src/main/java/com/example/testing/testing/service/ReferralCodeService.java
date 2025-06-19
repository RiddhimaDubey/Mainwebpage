package com.example.testing.testing.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.testing.testing.dto.ReferralCodeRequest;
import com.example.testing.testing.dto.ReferralCodeResponse;
import com.example.testing.testing.entity.ReferralCode;
import com.example.testing.testing.repository.ReferralCodeRepository;

@Service
public class ReferralCodeService {

    @Autowired
    private ReferralCodeRepository repository;

    // Create new referral code
    public ReferralCodeResponse createReferralCode(ReferralCodeRequest request) {
        if (repository.existsByCode(request.getCode())) {
            throw new RuntimeException("Referral code already exists: " + request.getCode());
        }

        ReferralCode referralCode = new ReferralCode();
        referralCode.setCode(request.getCode());
        referralCode.setOwnerName(request.getOwnerName());
        referralCode.setIsActive(true);
        referralCode.setUsageCount(0);

        ReferralCode savedReferralCode = repository.save(referralCode);
        return ReferralCodeResponse.fromEntity(savedReferralCode);
    }

    // Get all referral codes
    public List<ReferralCodeResponse> getAllReferralCodes() {
        return repository.findAll().stream()
                .map(ReferralCodeResponse::fromEntity)
                .collect(Collectors.toList());
    }

    // Get all active referral codes
    public List<ReferralCodeResponse> getActiveReferralCodes() {
        return repository.findByIsActiveTrue().stream()
                .map(ReferralCodeResponse::fromEntity)
                .collect(Collectors.toList());
    }

    // Get referral code by ID
    public ReferralCodeResponse getReferralCodeById(Long id) {
        Optional<ReferralCode> referralCode = repository.findById(id);
        if (referralCode.isPresent()) {
            return ReferralCodeResponse.fromEntity(referralCode.get());
        } else {
            throw new RuntimeException("Referral code not found with ID: " + id);
        }
    }

    // Get referral code by code
    public ReferralCodeResponse getReferralCodeByCode(String code) {
        Optional<ReferralCode> referralCode = repository.findByCode(code);
        if (referralCode.isPresent()) {
            return ReferralCodeResponse.fromEntity(referralCode.get());
        } else {
            throw new RuntimeException("Referral code not found: " + code);
        }
    }

    // Validate referral code
    public boolean isValidReferralCode(String code) {
        return repository.findByCodeAndIsActiveTrue(code).isPresent();
    }

    // Get referral code entity by code (for internal use)
    public Optional<ReferralCode> getReferralCodeEntityByCode(String code) {
        return repository.findByCodeAndIsActiveTrue(code);
    }

    // Update referral code
    public ReferralCodeResponse updateReferralCode(Long id, ReferralCodeRequest request) {
        Optional<ReferralCode> existingReferralCode = repository.findById(id);
        if (existingReferralCode.isEmpty()) {
            throw new RuntimeException("Referral code not found with ID: " + id);
        }

        ReferralCode referralCode = existingReferralCode.get();

        // Check if code is being changed and if it already exists
        if (!referralCode.getCode().equals(request.getCode()) &&
                repository.existsByCode(request.getCode())) {
            throw new RuntimeException("Referral code already exists: " + request.getCode());
        }

        referralCode.setCode(request.getCode());
        referralCode.setOwnerName(request.getOwnerName());

        ReferralCode updatedReferralCode = repository.save(referralCode);
        return ReferralCodeResponse.fromEntity(updatedReferralCode);
    }

    // Delete referral code
    public void deleteReferralCode(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Referral code not found with ID: " + id);
        }
        repository.deleteById(id);
    }

    // Deactivate referral code
    public ReferralCodeResponse deactivateReferralCode(Long id) {
        Optional<ReferralCode> referralCode = repository.findById(id);
        if (referralCode.isEmpty()) {
            throw new RuntimeException("Referral code not found with ID: " + id);
        }

        ReferralCode code = referralCode.get();
        code.setIsActive(false);
        ReferralCode updatedReferralCode = repository.save(code);
        return ReferralCodeResponse.fromEntity(updatedReferralCode);
    }

    // Activate referral code
    public ReferralCodeResponse activateReferralCode(Long id) {
        Optional<ReferralCode> referralCode = repository.findById(id);
        if (referralCode.isEmpty()) {
            throw new RuntimeException("Referral code not found with ID: " + id);
        }

        ReferralCode code = referralCode.get();
        code.setIsActive(true);
        ReferralCode updatedReferralCode = repository.save(code);
        return ReferralCodeResponse.fromEntity(updatedReferralCode);
    }

    // Search referral codes by owner name
    public List<ReferralCodeResponse> searchByOwnerName(String ownerName) {
        return repository.findByOwnerNameContainingIgnoreCase(ownerName).stream()
                .map(ReferralCodeResponse::fromEntity)
                .collect(Collectors.toList());
    }

    // Get top referral codes by usage
    public List<ReferralCodeResponse> getTopReferralCodes() {
        return repository.findTopReferralCodes().stream()
                .map(ReferralCodeResponse::fromEntity)
                .collect(Collectors.toList());
    }

    // Get referral codes with minimum usage
    public List<ReferralCodeResponse> getReferralCodesWithMinUsage(Integer minUsage) {
        return repository.findByUsageCountGreaterThanEqual(minUsage).stream()
                .map(ReferralCodeResponse::fromEntity)
                .collect(Collectors.toList());
    }

    // Get total usage count
    public Integer getTotalUsageCount() {
        return repository.getTotalUsageCount() != null ? repository.getTotalUsageCount() : 0;
    }

    // Increment usage count for a referral code
    public void incrementUsageCount(String code) {
        Optional<ReferralCode> referralCode = repository.findByCode(code);
        if (referralCode.isPresent()) {
            ReferralCode codeEntity = referralCode.get();
            codeEntity.incrementUsageCount();
            repository.save(codeEntity);
        }
    }

    // Initialize default referral codes
    public void initializeDefaultReferralCodes() {
        String[] codes = {
            "riddhima226100",
            "pawan226100", 
            "aayushmaan226100",
            "priya226100",
            "rahul226100",
            "neha226100",
            "vikram226100"
        };

        String[] owners = {
            "Riddhima",
            "Pawan",
            "Aayushmaan", 
            "Priya",
            "Rahul",
            "Neha",
            "Vikram"
        };

        for (int i = 0; i < codes.length; i++) {
            if (!repository.existsByCode(codes[i])) {
                ReferralCodeRequest request = new ReferralCodeRequest();
                request.setCode(codes[i]);
                request.setOwnerName(owners[i]);
                createReferralCode(request);
            }
        }
    }
} 