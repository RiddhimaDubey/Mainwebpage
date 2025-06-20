package com.example.testing.testing.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.testing.testing.entity.StudentRegistration;

@Repository
public interface StudentRegistrationRepository extends JpaRepository<StudentRegistration, Long> {

    // Find by email address
    Optional<StudentRegistration> findByEmailAddress(String emailAddress);

    // Find by mobile number
    Optional<StudentRegistration> findByMobileNumber(String mobileNumber);

    // Check if email exists
    boolean existsByEmailAddress(String emailAddress);

    // Check if mobile number exists
    boolean existsByMobileNumber(String mobileNumber);

    // Find by college name
    List<StudentRegistration> findByCollegeNameContainingIgnoreCase(String collegeName);

    // Find by city/town
    List<StudentRegistration> findByCityTownContainingIgnoreCase(String cityTown);

    // Find by preferred course
    List<StudentRegistration> findByPreferredCourse(StudentRegistration.PreferredCourse preferredCourse);

    // Find by how they heard about exam
    List<StudentRegistration> findByHearAboutExam(StudentRegistration.HearAboutExam hearAboutExam);

    // Search by full name (case insensitive)
    List<StudentRegistration> findByFullNameContainingIgnoreCase(String fullName);

    // Find by referral code
    List<StudentRegistration> findByReferralCodeCode(String referralCode);

    // Count registrations by referral code
    @Query("SELECT s.referralCode.code, COUNT(s) FROM StudentRegistration s WHERE s.referralCode IS NOT NULL GROUP BY s.referralCode.code")
    List<Object[]> countByReferralCode();

    // Custom query to find registrations by multiple criteria
    @Query("SELECT s FROM StudentRegistration s WHERE " +
           "(:fullName IS NULL OR LOWER(s.fullName) LIKE LOWER(CONCAT('%', :fullName, '%'))) AND " +
           "(:collegeName IS NULL OR LOWER(s.collegeName) LIKE LOWER(CONCAT('%', :collegeName, '%'))) AND " +
           "(:cityTown IS NULL OR LOWER(s.cityTown) LIKE LOWER(CONCAT('%', :cityTown, '%'))) AND " +
           "(:preferredCourse IS NULL OR s.preferredCourse = :preferredCourse) AND " +
           "(:hearAboutExam IS NULL OR s.hearAboutExam = :hearAboutExam) AND " +
           "(:referralCode IS NULL OR s.referralCode.code = :referralCode)")
    List<StudentRegistration> findByMultipleCriteria(
            @Param("fullName") String fullName,
            @Param("collegeName") String collegeName,
            @Param("cityTown") String cityTown,
            @Param("preferredCourse") StudentRegistration.PreferredCourse preferredCourse,
            @Param("hearAboutExam") StudentRegistration.HearAboutExam hearAboutExam,
            @Param("referralCode") String referralCode
    );

    // Count registrations by preferred course
    @Query("SELECT s.preferredCourse, COUNT(s) FROM StudentRegistration s GROUP BY s.preferredCourse")
    List<Object[]> countByPreferredCourse();

    // Count registrations by how they heard about exam
    @Query("SELECT s.hearAboutExam, COUNT(s) FROM StudentRegistration s GROUP BY s.hearAboutExam")
    List<Object[]> countByHearAboutExam();

    // Get total registrations with referral codes
    @Query("SELECT COUNT(s) FROM StudentRegistration s WHERE s.referralCode IS NOT NULL")
    Long countRegistrationsWithReferralCode();

    // Get total registrations without referral codes
    @Query("SELECT COUNT(s) FROM StudentRegistration s WHERE s.referralCode IS NULL")
    Long countRegistrationsWithoutReferralCode();
} 