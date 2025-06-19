package com.example.testing.testing.dto;

import com.example.testing.testing.entity.StudentRegistration;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class StudentRegistrationRequest {

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotBlank(message = "Mobile number is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Mobile number must be 10 digits")
    private String mobileNumber;

    @NotBlank(message = "Email address is required")
    @Email(message = "Please provide a valid email address")
    private String emailAddress;

    @NotBlank(message = "College name is required")
    private String collegeName;

    @NotBlank(message = "Current course and year is required")
    private String currentCourseAndYear;

    @NotBlank(message = "City/Town is required")
    private String cityTown;

    private StudentRegistration.PreferredCourse preferredCourse;

    @NotNull(message = "Please select how you heard about the exam")
    private StudentRegistration.HearAboutExam hearAboutExam;

    @NotNull(message = "Confirmation is required")
    private Boolean confirmation;

    private String referralCode;

    // Manual getters and setters in case Lombok fails
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
    
    public StudentRegistration.PreferredCourse getPreferredCourse() { return preferredCourse; }
    public void setPreferredCourse(StudentRegistration.PreferredCourse preferredCourse) { this.preferredCourse = preferredCourse; }
    
    public StudentRegistration.HearAboutExam getHearAboutExam() { return hearAboutExam; }
    public void setHearAboutExam(StudentRegistration.HearAboutExam hearAboutExam) { this.hearAboutExam = hearAboutExam; }
    
    public Boolean getConfirmation() { return confirmation; }
    public void setConfirmation(Boolean confirmation) { this.confirmation = confirmation; }
    
    public String getReferralCode() { return referralCode; }
    public void setReferralCode(String referralCode) { this.referralCode = referralCode; }
} 