package com.example.testing.testing.dto;

import java.time.LocalDateTime;

import com.example.testing.testing.entity.StudentRegistration;

import lombok.Data;

@Data
public class StudentRegistrationResponse {

    private Long id;
    private String fullName;
    private String mobileNumber;
    private String emailAddress;
    private String collegeName;
    private String currentCourseAndYear;
    private String cityTown;
    private String preferredCourse;
    private String hearAboutExam;
    private Boolean confirmation;
    private String referralCode;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static StudentRegistrationResponse fromEntity(StudentRegistration entity) {
        StudentRegistrationResponse response = new StudentRegistrationResponse();
        response.setId(entity.getId());
        response.setFullName(entity.getFullName());
        response.setMobileNumber(entity.getMobileNumber());
        response.setEmailAddress(entity.getEmailAddress());
        response.setCollegeName(entity.getCollegeName());
        response.setCurrentCourseAndYear(entity.getCurrentCourseAndYear());
        response.setCityTown(entity.getCityTown());
        response.setPreferredCourse(entity.getPreferredCourse() != null ? 
            entity.getPreferredCourse().getDisplayName() : null);
        response.setHearAboutExam(entity.getHearAboutExam().getDisplayName());
        response.setConfirmation(entity.getConfirmation());
        response.setReferralCode(entity.getReferralCode() != null ? entity.getReferralCode().getCode() : null);
        response.setCreatedAt(entity.getCreatedAt());
        response.setUpdatedAt(entity.getUpdatedAt());
        return response;
    }

    // Manual getters and setters in case Lombok fails
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    
    public String getMobileNumber() { return mobileNumber; }
    public void setMobileNumber(String mobileNumber) { this.mobileNumber = mobileNumber; }
    
    public String getEmailAddress() { return emailAddress; }
    public void setEmailAddress(String emailAddress) { this.emailAddress = emailAddress; }
    
    public String getCollegeName() { return collegeName; }
    public void setCollegeName(String collegeName) { this.collegeName = collegeName; }
    
    public String getCurrentCourseAndYear() { return currentCourseAndYear; }
    public void setCurrentCourseAndYear(String currentCourseAndYear) { this.currentCourseAndYear = currentCourseAndYear; }
    
    public String getCityTown() { return cityTown; }
    public void setCityTown(String cityTown) { this.cityTown = cityTown; }
    
    public String getPreferredCourse() { return preferredCourse; }
    public void setPreferredCourse(String preferredCourse) { this.preferredCourse = preferredCourse; }
    
    public String getHearAboutExam() { return hearAboutExam; }
    public void setHearAboutExam(String hearAboutExam) { this.hearAboutExam = hearAboutExam; }
    
    public Boolean getConfirmation() { return confirmation; }
    public void setConfirmation(Boolean confirmation) { this.confirmation = confirmation; }
    
    public String getReferralCode() { return referralCode; }
    public void setReferralCode(String referralCode) { this.referralCode = referralCode; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
} 