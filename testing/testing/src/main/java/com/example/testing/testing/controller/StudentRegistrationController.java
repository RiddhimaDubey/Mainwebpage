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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.testing.testing.dto.StudentRegistrationRequest;
import com.example.testing.testing.dto.StudentRegistrationResponse;
import com.example.testing.testing.entity.StudentRegistration;
import com.example.testing.testing.service.StudentRegistrationService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/registrations")
@CrossOrigin(origins = "*")
public class StudentRegistrationController {

    @Autowired
    private StudentRegistrationService service;

    // Create new registration
    @PostMapping
    public ResponseEntity<StudentRegistrationResponse> createRegistration(
            @Valid @RequestBody StudentRegistrationRequest request) {
        try {
            StudentRegistrationResponse response = service.createRegistration(request);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // Get all registrations
    @GetMapping
    public ResponseEntity<List<StudentRegistrationResponse>> getAllRegistrations() {
        List<StudentRegistrationResponse> registrations = service.getAllRegistrations();
        return new ResponseEntity<>(registrations, HttpStatus.OK);
    }

    // Get registration by ID
    @GetMapping("/{id}")
    public ResponseEntity<StudentRegistrationResponse> getRegistrationById(@PathVariable Long id) {
        try {
            StudentRegistrationResponse registration = service.getRegistrationById(id);
            return new ResponseEntity<>(registration, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Update registration
    @PutMapping("/{id}")
    public ResponseEntity<StudentRegistrationResponse> updateRegistration(
            @PathVariable Long id,
            @Valid @RequestBody StudentRegistrationRequest request) {
        try {
            StudentRegistrationResponse response = service.updateRegistration(id, request);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete registration
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRegistration(@PathVariable Long id) {
        try {
            service.deleteRegistration(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Search registrations by name
    @GetMapping("/search/name")
    public ResponseEntity<List<StudentRegistrationResponse>> searchByName(
            @RequestParam String name) {
        List<StudentRegistrationResponse> registrations = service.searchByName(name);
        return new ResponseEntity<>(registrations, HttpStatus.OK);
    }

    // Search registrations by college
    @GetMapping("/search/college")
    public ResponseEntity<List<StudentRegistrationResponse>> searchByCollege(
            @RequestParam String collegeName) {
        List<StudentRegistrationResponse> registrations = service.searchByCollege(collegeName);
        return new ResponseEntity<>(registrations, HttpStatus.OK);
    }

    // Search registrations by city/town
    @GetMapping("/search/city")
    public ResponseEntity<List<StudentRegistrationResponse>> searchByCity(
            @RequestParam String cityTown) {
        List<StudentRegistrationResponse> registrations = service.searchByCity(cityTown);
        return new ResponseEntity<>(registrations, HttpStatus.OK);
    }

    // Get registrations by preferred course
    @GetMapping("/course/{preferredCourse}")
    public ResponseEntity<List<StudentRegistrationResponse>> getByPreferredCourse(
            @PathVariable StudentRegistration.PreferredCourse preferredCourse) {
        List<StudentRegistrationResponse> registrations = service.getByPreferredCourse(preferredCourse);
        return new ResponseEntity<>(registrations, HttpStatus.OK);
    }

    // Get registrations by how they heard about exam
    @GetMapping("/source/{hearAboutExam}")
    public ResponseEntity<List<StudentRegistrationResponse>> getByHearAboutExam(
            @PathVariable StudentRegistration.HearAboutExam hearAboutExam) {
        List<StudentRegistrationResponse> registrations = service.getByHearAboutExam(hearAboutExam);
        return new ResponseEntity<>(registrations, HttpStatus.OK);
    }

    // Advanced search with multiple criteria
    @GetMapping("/search/advanced")
    public ResponseEntity<List<StudentRegistrationResponse>> searchByMultipleCriteria(
            @RequestParam(required = false) String fullName,
            @RequestParam(required = false) String collegeName,
            @RequestParam(required = false) String cityTown,
            @RequestParam(required = false) StudentRegistration.PreferredCourse preferredCourse,
            @RequestParam(required = false) StudentRegistration.HearAboutExam hearAboutExam,
            @RequestParam(required = false) String referralCode) {
        List<StudentRegistrationResponse> registrations = service.searchByMultipleCriteria(
                fullName, collegeName, cityTown, preferredCourse, hearAboutExam, referralCode);
        return new ResponseEntity<>(registrations, HttpStatus.OK);
    }

    // Get registrations by referral code
    @GetMapping("/referral/{referralCode}")
    public ResponseEntity<List<StudentRegistrationResponse>> getByReferralCode(
            @PathVariable String referralCode) {
        List<StudentRegistrationResponse> registrations = service.getByReferralCode(referralCode);
        return new ResponseEntity<>(registrations, HttpStatus.OK);
    }

    // Get registration statistics
    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Object>> getStatistics() {
        Map<String, Object> statistics = new HashMap<>();
        statistics.put("totalRegistrations", service.getTotalRegistrations());
        statistics.put("preferredCourseStats", service.getPreferredCourseStatistics());
        statistics.put("hearAboutExamStats", service.getHearAboutExamStatistics());
        statistics.put("referralCodeStats", service.getReferralCodeStatistics());
        statistics.put("registrationsWithReferralCode", service.getRegistrationsWithReferralCode());
        statistics.put("registrationsWithoutReferralCode", service.getRegistrationsWithoutReferralCode());
        return new ResponseEntity<>(statistics, HttpStatus.OK);
    }

    // Get available preferred courses
    @GetMapping("/courses")
    public ResponseEntity<StudentRegistration.PreferredCourse[]> getAvailableCourses() {
        return new ResponseEntity<>(StudentRegistration.PreferredCourse.values(), HttpStatus.OK);
    }

    // Get available hear about exam sources
    @GetMapping("/sources")
    public ResponseEntity<StudentRegistration.HearAboutExam[]> getAvailableSources() {
        return new ResponseEntity<>(StudentRegistration.HearAboutExam.values(), HttpStatus.OK);
    }

    // Check if email exists
    @GetMapping("/check-email")
    public ResponseEntity<Map<String, Boolean>> checkEmailExists(@RequestParam String email) {
        Map<String, Boolean> response = new HashMap<>();
        response.put("exists", service.getRegistrationRepository().existsByEmailAddress(email));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Check if mobile number exists
    @GetMapping("/check-mobile")
    public ResponseEntity<Map<String, Boolean>> checkMobileExists(@RequestParam String mobile) {
        Map<String, Boolean> response = new HashMap<>();
        response.put("exists", service.getRegistrationRepository().existsByMobileNumber(mobile));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
} 