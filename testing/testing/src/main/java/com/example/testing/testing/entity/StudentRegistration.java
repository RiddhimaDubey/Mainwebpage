package com.example.testing.testing.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "student_registrations")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentRegistration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Full name is required")
    @Column(name = "full_name", nullable = false)
    private String fullName;

    @NotBlank(message = "Mobile number is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Mobile number must be 10 digits")
    @Column(name = "mobile_number", nullable = false, unique = true)
    private String mobileNumber;

    @NotBlank(message = "Email address is required")
    @Email(message = "Please provide a valid email address")
    @Column(name = "email_address", nullable = false, unique = true)
    private String emailAddress;

    @NotBlank(message = "College name is required")
    @Column(name = "college_name", nullable = false)
    private String collegeName;

    @NotBlank(message = "Current course and year is required")
    @Column(name = "current_course_year", nullable = false)
    private String currentCourseAndYear;

    @NotBlank(message = "City/Town is required")
    @Column(name = "city_town", nullable = false)
    private String cityTown;

    @Enumerated(EnumType.STRING)
    @Column(name = "preferred_course")
    private PreferredCourse preferredCourse;

    @Enumerated(EnumType.STRING)
    @Column(name = "hear_about_exam", nullable = false)
    private HearAboutExam hearAboutExam;

    @Column(name = "confirmation", nullable = false)
    private Boolean confirmation = false;

    @ManyToOne(fetch = jakarta.persistence.FetchType.LAZY)
    @JoinColumn(name = "referral_code_id")
    private ReferralCode referralCode;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
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
    
    public PreferredCourse getPreferredCourse() { return preferredCourse; }
    public void setPreferredCourse(PreferredCourse preferredCourse) { this.preferredCourse = preferredCourse; }
    
    public HearAboutExam getHearAboutExam() { return hearAboutExam; }
    public void setHearAboutExam(HearAboutExam hearAboutExam) { this.hearAboutExam = hearAboutExam; }
    
    public Boolean getConfirmation() { return confirmation; }
    public void setConfirmation(Boolean confirmation) { this.confirmation = confirmation; }
    
    public ReferralCode getReferralCode() { return referralCode; }
    public void setReferralCode(ReferralCode referralCode) { this.referralCode = referralCode; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public enum PreferredCourse {
        FULL_STACK("Full-stack web development (Java, Python, Node)"),
        GAME_DEVELOPMENT("2D/3D Game Development (Unity, Unreal Engine)"),
        CAD_DESIGN("CAD Designing and development (AutoCAD, SketchUP, Revit, STAD.pro, 3dx Max)"),
        CYBER_SECURITY("Cyber Security"),
        AI_ML("Artificial Intelligence and Machine learning"),
        DATA_SCIENCE("Data Science and analysis"),
        AR_VR("AR/VR Technologies"),
        NOT_SURE("Not Sure Yet");

        private final String displayName;

        PreferredCourse(String displayName) {
            this.displayName = displayName;
        }

        public String getDisplayName() {
            return displayName;
        }
    }

    public enum HearAboutExam {
        POSTER("Poster"),
        FRIEND("Friend"),
        WHATSAPP("WhatsApp"),
        INSTAGRAM("Instagram"),
        COLLEGE_ANNOUNCEMENT("College Announcement");

        private final String displayName;

        HearAboutExam(String displayName) {
            this.displayName = displayName;
        }

        public String getDisplayName() {
            return displayName;
        }
    }
} 