# Student Registration API Documentation

## Overview
This API provides CRUD operations for student registration forms with PostgreSQL database integration and referral code tracking system.

## Base URLs
```
Student Registrations: http://localhost:8080/api/registrations
Referral Codes: http://localhost:8080/api/referral-codes
```

## Default Referral Codes
The system automatically initializes these referral codes on startup:
- **riddhima226100** (Riddhima)
- **pawan226100** (Pawan)
- **aayushmaan226100** (Aayushmaan)
- **priya226100** (Priya)
- **rahul226100** (Rahul)
- **neha226100** (Neha)
- **vikram226100** (Vikram)

## Student Registration API Endpoints

### 1. Create Registration
**POST** `/api/registrations`

Creates a new student registration with optional referral code.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "mobileNumber": "9876543210",
  "emailAddress": "john.doe@example.com",
  "collegeName": "ABC College",
  "currentCourseAndYear": "B.Tech 3rd Year",
  "cityTown": "Mumbai",
  "preferredCourse": "FULL_STACK",
  "hearAboutExam": "WHATSAPP",
  "confirmation": true,
  "referralCode": "riddhima226100"
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "fullName": "John Doe",
  "mobileNumber": "9876543210",
  "emailAddress": "john.doe@example.com",
  "collegeName": "ABC College",
  "currentCourseAndYear": "B.Tech 3rd Year",
  "cityTown": "Mumbai",
  "preferredCourse": "Full Stack",
  "hearAboutExam": "WhatsApp",
  "confirmation": true,
  "referralCode": "riddhima226100",
  "referralCodeOwner": "Riddhima",
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T10:30:00"
}
```

### 2. Get All Registrations
**GET** `/api/registrations`

Retrieves all student registrations.

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "fullName": "John Doe",
    "mobileNumber": "9876543210",
    "emailAddress": "john.doe@example.com",
    "collegeName": "ABC College",
    "currentCourseAndYear": "B.Tech 3rd Year",
    "cityTown": "Mumbai",
    "preferredCourse": "Full Stack",
    "hearAboutExam": "WhatsApp",
    "confirmation": true,
    "referralCode": "riddhima226100",
    "referralCodeOwner": "Riddhima",
    "createdAt": "2024-01-15T10:30:00",
    "updatedAt": "2024-01-15T10:30:00"
  }
]
```

### 3. Get Registration by ID
**GET** `/api/registrations/{id}`

Retrieves a specific registration by ID.

**Response:** `200 OK`
```json
{
  "id": 1,
  "fullName": "John Doe",
  "mobileNumber": "9876543210",
  "emailAddress": "john.doe@example.com",
  "collegeName": "ABC College",
  "currentCourseAndYear": "B.Tech 3rd Year",
  "cityTown": "Mumbai",
  "preferredCourse": "Full Stack",
  "hearAboutExam": "WhatsApp",
  "confirmation": true,
  "referralCode": "riddhima226100",
  "referralCodeOwner": "Riddhima",
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T10:30:00"
}
```

### 4. Update Registration
**PUT** `/api/registrations/{id}`

Updates an existing registration.

**Request Body:** Same as create registration

**Response:** `200 OK`
```json
{
  "id": 1,
  "fullName": "John Doe Updated",
  "mobileNumber": "9876543210",
  "emailAddress": "john.doe@example.com",
  "collegeName": "ABC College",
  "currentCourseAndYear": "B.Tech 4th Year",
  "cityTown": "Mumbai",
  "preferredCourse": "Data Science",
  "hearAboutExam": "Instagram",
  "confirmation": true,
  "referralCode": "riddhima226100",
  "referralCodeOwner": "Riddhima",
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T11:30:00"
}
```

### 5. Delete Registration
**DELETE** `/api/registrations/{id}`

Deletes a registration.

**Response:** `204 No Content`

### 6. Search by Name
**GET** `/api/registrations/search/name?name=John`

Searches registrations by name (case-insensitive).

### 7. Search by College
**GET** `/api/registrations/search/college?collegeName=ABC`

Searches registrations by college name (case-insensitive).

### 8. Search by City
**GET** `/api/registrations/search/city?cityTown=Mumbai`

Searches registrations by city/town (case-insensitive).

### 9. Get by Preferred Course
**GET** `/api/registrations/course/{preferredCourse}`

Gets registrations by preferred course.

**Available values:**
- `FULL_STACK`
- `DATA_SCIENCE`
- `DIGITAL_MARKETING`
- `NOT_SURE`

### 10. Get by Source
**GET** `/api/registrations/source/{hearAboutExam}`

Gets registrations by how they heard about the exam.

**Available values:**
- `POSTER`
- `FRIEND`
- `WHATSAPP`
- `INSTAGRAM`
- `COLLEGE_ANNOUNCEMENT`

### 11. Get by Referral Code
**GET** `/api/registrations/referral/{referralCode}`

Gets all registrations made using a specific referral code.

**Example:** `GET /api/registrations/referral/riddhima226100`

### 12. Get by Referral Code Owner
**GET** `/api/registrations/referral-owner/{ownerName}`

Gets all registrations made using referral codes owned by a specific person.

**Example:** `GET /api/registrations/referral-owner/Riddhima`

### 13. Advanced Search
**GET** `/api/registrations/search/advanced?fullName=John&collegeName=ABC&cityTown=Mumbai&preferredCourse=FULL_STACK&hearAboutExam=WHATSAPP&referralCode=riddhima226100`

Advanced search with multiple criteria including referral code.

### 14. Get Registration Statistics
**GET** `/api/registrations/statistics`

Gets registration statistics.

**Response:**
```json
{
  "totalRegistrations": 100,
  "preferredCourseStats": [
    ["FULL_STACK", 40],
    ["DATA_SCIENCE", 30],
    ["DIGITAL_MARKETING", 20],
    ["NOT_SURE", 10]
  ],
  "hearAboutExamStats": [
    ["WHATSAPP", 50],
    ["INSTAGRAM", 25],
    ["FRIEND", 15],
    ["POSTER", 5],
    ["COLLEGE_ANNOUNCEMENT", 5]
  ],
  "referralCodeStats": [
    ["riddhima226100", 25],
    ["pawan226100", 20],
    ["aayushmaan226100", 15],
    ["priya226100", 10],
    ["rahul226100", 8],
    ["neha226100", 5],
    ["vikram226100", 3]
  ],
  "registrationsWithReferralCode": 86,
  "registrationsWithoutReferralCode": 14
}
```

### 15. Get Available Courses
**GET** `/api/registrations/courses`

Gets all available preferred courses.

### 16. Get Available Sources
**GET** `/api/registrations/sources`

Gets all available sources for how students heard about the exam.

### 17. Check Email Exists
**GET** `/api/registrations/check-email?email=john.doe@example.com`

Checks if an email address is already registered.

**Response:**
```json
{
  "exists": true
}
```

### 18. Check Mobile Exists
**GET** `/api/registrations/check-mobile?mobile=9876543210`

Checks if a mobile number is already registered.

**Response:**
```json
{
  "exists": true
}
```

## Referral Code API Endpoints

### 1. Create Referral Code
**POST** `/api/referral-codes`

**Request Body:**
```json
{
  "code": "newcode123",
  "ownerName": "New Owner"
}
```

### 2. Get All Referral Codes
**GET** `/api/referral-codes`

### 3. Get Active Referral Codes
**GET** `/api/referral-codes/active`

### 4. Get Referral Code by ID
**GET** `/api/referral-codes/{id}`

### 5. Get Referral Code by Code
**GET** `/api/referral-codes/code/{code}`

**Example:** `GET /api/referral-codes/code/riddhima226100`

### 6. Update Referral Code
**PUT** `/api/referral-codes/{id}`

### 7. Delete Referral Code
**DELETE** `/api/referral-codes/{id}`

### 8. Activate Referral Code
**PUT** `/api/referral-codes/{id}/activate`

### 9. Deactivate Referral Code
**PUT** `/api/referral-codes/{id}/deactivate`

### 10. Search by Owner Name
**GET** `/api/referral-codes/search/owner?ownerName=Riddhima`

### 11. Get Top Referral Codes
**GET** `/api/referral-codes/top`

Gets referral codes ordered by usage count (highest first).

### 12. Get Referral Codes with Minimum Usage
**GET** `/api/referral-codes/usage/{minUsage}`

**Example:** `GET /api/referral-codes/usage/5` (gets codes used 5 or more times)

### 13. Get Referral Code Statistics
**GET** `/api/referral-codes/statistics`

**Response:**
```json
{
  "totalUsageCount": 86,
  "topReferralCodes": [
    {
      "id": 1,
      "code": "riddhima226100",
      "ownerName": "Riddhima",
      "isActive": true,
      "usageCount": 25,
      "createdAt": "2024-01-15T10:00:00",
      "updatedAt": "2024-01-15T10:00:00"
    }
  ]
}
```

### 14. Validate Referral Code
**GET** `/api/referral-codes/validate/{code}`

**Example:** `GET /api/referral-codes/validate/riddhima226100`

**Response:**
```json
{
  "valid": true
}
```

### 15. Initialize Default Referral Codes
**POST** `/api/referral-codes/initialize`

Creates the default 7 referral codes if they don't exist.

## Data Models

### StudentRegistrationRequest
```json
{
  "fullName": "string (required)",
  "mobileNumber": "string (required, 10 digits)",
  "emailAddress": "string (required, valid email)",
  "collegeName": "string (required)",
  "currentCourseAndYear": "string (required)",
  "cityTown": "string (required)",
  "preferredCourse": "enum (optional)",
  "hearAboutExam": "enum (required)",
  "confirmation": "boolean (required)",
  "referralCode": "string (optional)"
}
```

### StudentRegistrationResponse
```json
{
  "id": "long",
  "fullName": "string",
  "mobileNumber": "string",
  "emailAddress": "string",
  "collegeName": "string",
  "currentCourseAndYear": "string",
  "cityTown": "string",
  "preferredCourse": "string",
  "hearAboutExam": "string",
  "confirmation": "boolean",
  "referralCode": "string",
  "referralCodeOwner": "string",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### ReferralCodeRequest
```json
{
  "code": "string (required)",
  "ownerName": "string (required)"
}
```

### ReferralCodeResponse
```json
{
  "id": "long",
  "code": "string",
  "ownerName": "string",
  "isActive": "boolean",
  "usageCount": "integer",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

## Validation Rules

### Student Registration
- **fullName**: Required, cannot be blank
- **mobileNumber**: Required, must be exactly 10 digits
- **emailAddress**: Required, must be a valid email format, unique
- **collegeName**: Required, cannot be blank
- **currentCourseAndYear**: Required, cannot be blank
- **cityTown**: Required, cannot be blank
- **preferredCourse**: Optional, must be one of the enum values
- **hearAboutExam**: Required, must be one of the enum values
- **confirmation**: Required, must be true to proceed
- **referralCode**: Optional, must be a valid active referral code if provided

### Referral Code
- **code**: Required, cannot be blank
- **ownerName**: Required, cannot be blank

## Database Schema

### student_registrations table
```sql
CREATE TABLE student_registrations (
    id BIGSERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    mobile_number VARCHAR(10) NOT NULL UNIQUE,
    email_address VARCHAR(255) NOT NULL UNIQUE,
    college_name VARCHAR(255) NOT NULL,
    current_course_year VARCHAR(255) NOT NULL,
    city_town VARCHAR(255) NOT NULL,
    preferred_course VARCHAR(50),
    hear_about_exam VARCHAR(50) NOT NULL,
    confirmation BOOLEAN NOT NULL DEFAULT FALSE,
    referral_code_id BIGINT REFERENCES referral_codes(id),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

### referral_codes table
```sql
CREATE TABLE referral_codes (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR(255) NOT NULL UNIQUE,
    owner_name VARCHAR(255) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    usage_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

## How Referral Code System Works

1. **Code Creation**: Referral codes are created with an owner name
2. **Code Sharing**: Owners share their referral codes with potential students
3. **Registration**: When a student registers, they can optionally provide a referral code
4. **Validation**: The system validates the referral code is active and exists
5. **Tracking**: The registration is linked to the referral code and usage count is incremented
6. **Analytics**: You can track which referral codes are most effective

## Example Workflow

1. **Riddhima** gets referral code `riddhima226100`
2. **Riddhima** shares this code with friends
3. **John** registers using `riddhima226100`
4. **Database** records:
   - John's registration with `referral_code_id` pointing to Riddhima's code
   - Riddhima's code usage count increases by 1
5. **Analytics** show Riddhima has referred 1 student

## Setup Instructions

1. **Database Setup:**
   - Install PostgreSQL
   - Create a database named `testing`
   - Update `application.properties` with your database credentials

2. **Run the Application:**
   ```bash
   mvn spring-boot:run
   ```

3. **Default Referral Codes:**
   - The system automatically creates the 7 default referral codes on startup
   - You can see them in the console output

4. **Test the API:**
   - Use Postman or any REST client
   - Test registration with referral codes
   - Check referral code statistics

## Error Responses

### Invalid Referral Code (400 Bad Request)
```json
{
  "status": "error",
  "message": "Invalid referral code: invalidcode123"
}
```

### Referral Code Already Exists (400 Bad Request)
```json
{
  "status": "error",
  "message": "Referral code already exists: riddhima226100"
}
```

### Validation Error (400 Bad Request)
```json
{
  "status": "error",
  "message": "Validation failed",
  "errors": {
    "emailAddress": "Please provide a valid email address",
    "mobileNumber": "Mobile number must be 10 digits"
  }
}
```

### Not Found Error (404 Not Found)
```json
{
  "status": "error",
  "message": "Registration not found with ID: 999"
}
```

### Duplicate Error (400 Bad Request)
```json
{
  "status": "error",
  "message": "Email address already registered: john.doe@example.com"
}
``` 