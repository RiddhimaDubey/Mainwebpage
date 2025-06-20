package com.example.testing.testing.dto;

import java.time.LocalDateTime;

import com.example.testing.testing.entity.ReferralCode;

import lombok.Data;

@Data
public class ReferralCodeResponse {

    private Long id;
    private String code;
    private Boolean isActive;
    private Integer usageCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static ReferralCodeResponse fromEntity(ReferralCode entity) {
        ReferralCodeResponse response = new ReferralCodeResponse();
        response.setId(entity.getId());
        response.setCode(entity.getCode());
        response.setIsActive(entity.getIsActive());
        response.setUsageCount(entity.getUsageCount());
        response.setCreatedAt(entity.getCreatedAt());
        response.setUpdatedAt(entity.getUpdatedAt());
        return response;
    }

    // Manual getters and setters in case Lombok fails
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    
    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
    
    public Integer getUsageCount() { return usageCount; }
    public void setUsageCount(Integer usageCount) { this.usageCount = usageCount; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
} 