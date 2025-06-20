package com.example.testing.testing.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.testing.testing.entity.ReferralCode;

@Repository
public interface ReferralCodeRepository extends JpaRepository<ReferralCode, Long> {

    // Find by code
    Optional<ReferralCode> findByCode(String code);

    // Find by code and active status
    Optional<ReferralCode> findByCodeAndIsActiveTrue(String code);

    // Check if code exists
    boolean existsByCode(String code);

    // Find all active codes
    List<ReferralCode> findByIsActiveTrue();

    // Get top referral codes by usage count
    @Query("SELECT r FROM ReferralCode r ORDER BY r.usageCount DESC")
    List<ReferralCode> findTopReferralCodes();

    // Get referral codes with usage count greater than specified
    @Query("SELECT r FROM ReferralCode r WHERE r.usageCount >= :minUsage ORDER BY r.usageCount DESC")
    List<ReferralCode> findByUsageCountGreaterThanEqual(@Param("minUsage") Integer minUsage);

    // Get total usage count for all codes
    @Query("SELECT SUM(r.usageCount) FROM ReferralCode r")
    Integer getTotalUsageCount();

    // Get referral codes created in last N days
    @Query("SELECT r FROM ReferralCode r WHERE r.createdAt >= :startDate")
    List<ReferralCode> findByCreatedAtAfter(@Param("startDate") java.time.LocalDateTime startDate);
} 