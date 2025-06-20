package com.example.testing.testing.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.testing.testing.dto.StudentRegistrationRequest;
import com.example.testing.testing.dto.StudentRegistrationResponse;
import com.example.testing.testing.entity.ReferralCode;
import com.example.testing.testing.entity.StudentRegistration;
import com.example.testing.testing.repository.StudentRegistrationRepository;

@Service
public class StudentRegistrationService {

    @Autowired
    private StudentRegistrationRepository repository;

    @Autowired
    private ReferralCodeService referralCodeService;

    // Create new registration
    public StudentRegistrationResponse createRegistration(StudentRegistrationRequest request) {
        // Check if email already exists
        if (repository.existsByEmailAddress(request.getEmailAddress())) {
            throw new RuntimeException("Email address already registered: " + request.getEmailAddress());
        }

        // Check if mobile number already exists
        if (repository.existsByMobileNumber(request.getMobileNumber())) {
            throw new RuntimeException("Mobile number already registered: " + request.getMobileNumber());
        }

        // Validate confirmation
        if (!request.getConfirmation()) {
            throw new RuntimeException("Confirmation is required to proceed with registration");
        }

        // Validate referral code if provided
        ReferralCode referralCode = null;
        if (request.getReferralCode() != null && !request.getReferralCode().trim().isEmpty()) {
            Optional<ReferralCode> codeEntity = referralCodeService.getReferralCodeEntityByCode(request.getReferralCode());
            if (codeEntity.isEmpty()) {
                throw new RuntimeException("Invalid referral code: " + request.getReferralCode());
            }
            referralCode = codeEntity.get();
        }

        StudentRegistration registration = new StudentRegistration();
        registration.setFullName(request.getFullName());
        registration.setMobileNumber(request.getMobileNumber());
        registration.setEmailAddress(request.getEmailAddress());
        registration.setCollegeName(request.getCollegeName());
        registration.setCurrentCourseAndYear(request.getCurrentCourseAndYear());
        registration.setCityTown(request.getCityTown());
        registration.setPreferredCourse(request.getPreferredCourse());
        registration.setHearAboutExam(request.getHearAboutExam());
        registration.setConfirmation(request.getConfirmation());
        registration.setReferralCode(referralCode);

        StudentRegistration savedRegistration = repository.save(registration);

        // Increment referral code usage count if referral code was used
        if (referralCode != null) {
            referralCodeService.incrementUsageCount(referralCode.getCode());
        }

        return StudentRegistrationResponse.fromEntity(savedRegistration);
    }

    // Get all registrations
    public List<StudentRegistrationResponse> getAllRegistrations() {
        return repository.findAll().stream()
                .map(StudentRegistrationResponse::fromEntity)
                .collect(Collectors.toList());
    }

    // Get registration by ID
    public StudentRegistrationResponse getRegistrationById(Long id) {
        Optional<StudentRegistration> registration = repository.findById(id);
        if (registration.isPresent()) {
            return StudentRegistrationResponse.fromEntity(registration.get());
        } else {
            throw new RuntimeException("Registration not found with ID: " + id);
        }
    }

    // Update registration
    public StudentRegistrationResponse updateRegistration(Long id, StudentRegistrationRequest request) {
        Optional<StudentRegistration> existingRegistration = repository.findById(id);
        if (existingRegistration.isEmpty()) {
            throw new RuntimeException("Registration not found with ID: " + id);
        }

        StudentRegistration registration = existingRegistration.get();

        // Check if email is being changed and if it already exists
        if (!registration.getEmailAddress().equals(request.getEmailAddress()) &&
                repository.existsByEmailAddress(request.getEmailAddress())) {
            throw new RuntimeException("Email address already registered: " + request.getEmailAddress());
        }

        // Check if mobile number is being changed and if it already exists
        if (!registration.getMobileNumber().equals(request.getMobileNumber()) &&
                repository.existsByMobileNumber(request.getMobileNumber())) {
            throw new RuntimeException("Mobile number already registered: " + request.getMobileNumber());
        }

        // Validate confirmation
        if (!request.getConfirmation()) {
            throw new RuntimeException("Confirmation is required to proceed with registration");
        }

        // Handle referral code update
        ReferralCode referralCode = null;
        if (request.getReferralCode() != null && !request.getReferralCode().trim().isEmpty()) {
            Optional<ReferralCode> codeEntity = referralCodeService.getReferralCodeEntityByCode(request.getReferralCode());
            if (codeEntity.isEmpty()) {
                throw new RuntimeException("Invalid referral code: " + request.getReferralCode());
            }
            referralCode = codeEntity.get();
        }

        registration.setFullName(request.getFullName());
        registration.setMobileNumber(request.getMobileNumber());
        registration.setEmailAddress(request.getEmailAddress());
        registration.setCollegeName(request.getCollegeName());
        registration.setCurrentCourseAndYear(request.getCurrentCourseAndYear());
        registration.setCityTown(request.getCityTown());
        registration.setPreferredCourse(request.getPreferredCourse());
        registration.setHearAboutExam(request.getHearAboutExam());
        registration.setConfirmation(request.getConfirmation());
        registration.setReferralCode(referralCode);

        StudentRegistration updatedRegistration = repository.save(registration);
        return StudentRegistrationResponse.fromEntity(updatedRegistration);
    }

    // Delete registration
    public void deleteRegistration(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Registration not found with ID: " + id);
        }
        repository.deleteById(id);
    }

    // Search registrations by name
    public List<StudentRegistrationResponse> searchByName(String name) {
        return repository.findByFullNameContainingIgnoreCase(name).stream()
                .map(StudentRegistrationResponse::fromEntity)
                .collect(Collectors.toList());
    }

    // Search registrations by college
    public List<StudentRegistrationResponse> searchByCollege(String collegeName) {
        return repository.findByCollegeNameContainingIgnoreCase(collegeName).stream()
                .map(StudentRegistrationResponse::fromEntity)
                .collect(Collectors.toList());
    }

    // Search registrations by city/town
    public List<StudentRegistrationResponse> searchByCity(String cityTown) {
        return repository.findByCityTownContainingIgnoreCase(cityTown).stream()
                .map(StudentRegistrationResponse::fromEntity)
                .collect(Collectors.toList());
    }

    // Get registrations by preferred course
    public List<StudentRegistrationResponse> getByPreferredCourse(StudentRegistration.PreferredCourse preferredCourse) {
        return repository.findByPreferredCourse(preferredCourse).stream()
                .map(StudentRegistrationResponse::fromEntity)
                .collect(Collectors.toList());
    }

    // Get registrations by how they heard about exam
    public List<StudentRegistrationResponse> getByHearAboutExam(StudentRegistration.HearAboutExam hearAboutExam) {
        return repository.findByHearAboutExam(hearAboutExam).stream()
                .map(StudentRegistrationResponse::fromEntity)
                .collect(Collectors.toList());
    }

    // Get registrations by referral code
    public List<StudentRegistrationResponse> getByReferralCode(String referralCode) {
        return repository.findByReferralCodeCode(referralCode).stream()
                .map(StudentRegistrationResponse::fromEntity)
                .collect(Collectors.toList());
    }

    // Advanced search with multiple criteria
    public List<StudentRegistrationResponse> searchByMultipleCriteria(
            String fullName, String collegeName, String cityTown,
            StudentRegistration.PreferredCourse preferredCourse,
            StudentRegistration.HearAboutExam hearAboutExam,
            String referralCode) {
        return repository.findByMultipleCriteria(fullName, collegeName, cityTown, preferredCourse, hearAboutExam, referralCode)
                .stream()
                .map(StudentRegistrationResponse::fromEntity)
                .collect(Collectors.toList());
    }

    // Get registration statistics
    public long getTotalRegistrations() {
        return repository.count();
    }

    // Get registrations by preferred course count
    public List<Object[]> getPreferredCourseStatistics() {
        return repository.countByPreferredCourse();
    }

    // Get registrations by hear about exam count
    public List<Object[]> getHearAboutExamStatistics() {
        return repository.countByHearAboutExam();
    }

    // Get registrations by referral code count
    public List<Object[]> getReferralCodeStatistics() {
        return repository.countByReferralCode();
    }

    // Get total registrations with referral codes
    public long getRegistrationsWithReferralCode() {
        return repository.countRegistrationsWithReferralCode();
    }

    // Get total registrations without referral codes
    public long getRegistrationsWithoutReferralCode() {
        return repository.countRegistrationsWithoutReferralCode();
    }

    // Getter for repository (for controller use)
    public StudentRegistrationRepository getRegistrationRepository() {
        return repository;
    }
} 