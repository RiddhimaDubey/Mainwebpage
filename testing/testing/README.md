# Form Registration API with Referral System

This Spring Boot application provides a backend for a form registration system with referral functionality.

## API Endpoints

### Registration

**POST /api/register**

Register a new user with optional referral code.

Request Body:
```json
{
  "name": "John Doe",
  "phoneNumber": "1234567890",
  "email": "john@example.com",
  "password": "password123",
  "referralCode": "optional-referral-code"
}
```

Response:
```json
{
  "success": true,
  "message": "Registration successful",
  "person": {
    "name": "John Doe",
    "phoneNumber": "1234567890",
    "email": "john@example.com",
    "referralCode": "JohnDoe226140",
    "referredBy": "optional-referral-code"
  }
}
```

### Get All Users

**GET /api/persons**

Get a list of all registered users.

### Get User by ID

**GET /api/persons/{id}**

Get a user by their ID.

### Get User by Email

**GET /api/persons/email/{email}**

Get a user by their email address.

### Delete User

**DELETE /api/persons/{id}**

Delete a user by their ID.

### Get Referred Users

**GET /api/referrals/{referralCode}**

Get all users who were referred by a specific referral code.

### Validate Referral Code

**GET /api/validate-referral/{referralCode}**

Validate if a referral code is valid and get the referrer's name.

## Referral Code Generation

Referral codes are automatically generated when a user registers. The format is:
- User's name (cleaned of special characters, max 10 characters) + "226140"

Example: For user "John Doe", the referral code would be "JohnDoe226140"

## Integration with Frontend

The frontend can use these APIs to:
1. Register new users
2. Validate referral codes before registration
3. Show a user their own referral code after registration
4. Display a list of users who registered using their referral code

## CORS Configuration

The API allows requests from any origin for development purposes. In production, you should restrict this to specific origins.