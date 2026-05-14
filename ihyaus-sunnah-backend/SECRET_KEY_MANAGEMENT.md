# Secret Key Management System

## Overview

Admin and Director users now have personal 4-digit secret keys for performing CRUD operations. Each admin/director can:

- **Generate** a random 4-digit secret key (0000-9999)
- **Set** their own custom 4-digit secret key
- **Reset** their secret key (generates new random one, invalidates old one)
- **Change** their secret key (generates new random one, requires verification of current key)
- **Check status** of their secret key

Secret keys are:
- 4-digit numeric format (0000-9999) for easy memorization
- Hashed using SHA-256 for secure storage
- Unique to each user
- User-generated and managed
- Required for all CRUD operations (Create, Update, Delete)

## Database Schema Changes

### User Model Updates

```javascript
{
  // ... existing fields
  
  secretKey: String,                    // Hashed secret key (hidden by default)
  secretKeyExpiresAt: Date,             // Optional: expiration timestamp
  secretKeyLastGeneratedAt: Date,       // Timestamp of last key generation
}
```

## API Endpoints

All secret key endpoints require authentication (JWT token).

### 1. Generate Secret Key

**Endpoint:** `POST /api/auth/generate-secret-key`

**Requirements:**
- User must be authenticated
- User must be admin or director
- Valid password required

**Request Headers:**
```
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "password": "user-password"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Secret key generated successfully",
  "secretKey": "7392",
  "warning": "⚠️  Save this secret key. It will not be shown again!",
  "expiresAt": null,
  "generatedAt": "2026-05-05T10:30:00.000Z"
}
```

**Response (Error - 403):**
```json
{
  "success": false,
  "message": "Only admin and director users can generate secret keys"
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "message": "Invalid password"
}
```

### 2. Reset Secret Key

**Endpoint:** `POST /api/auth/reset-secret-key`

**Requirements:**
- User must be authenticated
- User must be admin or director
- Valid password required
- Invalidates the current secret key

**Request Headers:**
```
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "password": "user-password"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Secret key has been reset",
  "secretKey": "5678",
  "warning": "⚠️  Save this secret key. It will not be shown again!",
  "generatedAt": "2026-05-05T10:35:00.000Z"
}
```

### 3. Change Secret Key

**Endpoint:** `POST /api/auth/change-secret-key`

**Requirements:**
- User must be authenticated
- User must be admin or director
- Valid password required
- Current secret key required
- Must have an existing secret key

**Request Headers:**
```
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "currentSecretKey": "7392",
  "password": "user-password"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Secret key changed successfully",
  "secretKey": "9214",
  "warning": "⚠️  Save this secret key. It will not be shown again!",
  "changedAt": "2026-05-05T10:40:00.000Z"
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "message": "Invalid current secret key"
}
```

### 4. Set Custom Secret Key

**Endpoint:** `POST /api/auth/set-secret-key`

**Requirements:**
- User must be authenticated
- User must be admin or director
- Valid password required
- Secret key must be exactly 4 digits (0000-9999)

**Request Headers:**
```
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "secretKey": "1234",
  "password": "user-password"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Custom secret key set successfully",
  "secretKey": "1234",
  "setAt": "2026-05-05T10:45:00.000Z"
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "message": "Invalid input",
  "errors": [
    {
      "code": "too_small",
      "minimum": 4,
      "type": "string",
      "message": "Secret key must be exactly 4 digits",
      "path": ["secretKey"]
    }
  ]
}
```

### 5. Get Secret Key Status

**Endpoint:** `GET /api/auth/secret-key-status`

**Requirements:**
- User must be authenticated
- User must be admin or director

**Request Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "hasSecretKey": true,
    "lastGeneratedAt": "2026-05-05T10:30:00.000Z",
    "role": "admin"
  }
}
```

## Usage with CRUD Operations

### Using Secret Key in Requests

Once you have a secret key, include it in CRUD operation requests:

**Method 1: HTTP Header (Recommended)**
```bash
curl -X POST http://localhost:4000/api/staff \
  -H "Authorization: Bearer <jwt-token>" \
  -H "X-Secret-Key: 7392" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "category": "Senior Staff"
  }'
```

**Method 2: Request Body**
```bash
curl -X POST http://localhost:4000/api/staff \
  -H "Authorization: Bearer <jwt-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "secretKey": "7392",
    "name": "John Doe",
    "category": "Senior Staff"
  }'
```

## Complete Workflow Example

### 1. Login
```bash
POST /api/auth/login
{
  "email": "admin@example.com",
  "password": "admin-password"
}

Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "123abc",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

### 2. Generate Secret Key (Random 4-Digit)
```bash
POST /api/auth/generate-secret-key
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json

{
  "password": "admin-password"
}

Response:
{
  "success": true,
  "secretKey": "7392",
  "message": "Secret key generated successfully"
}
```

### 2b. OR Set Custom 4-Digit Secret Key
```bash
POST /api/auth/set-secret-key
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json

{
  "secretKey": "1234",
  "password": "admin-password"
}

Response:
{
  "success": true,
  "secretKey": "1234",
  "message": "Custom secret key set successfully"
}
```

### 3. Create Staff (Using Secret Key)
```bash
POST /api/staff
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
X-Secret-Key: 7392
Content-Type: application/json

{
  "name": "Jane Doe",
  "category": "Senior Staff",
  "email": "jane@example.com"
}

Response:
{
  "success": true,
  "message": "Staff created successfully",
  "data": { ... }
}
```

### 4. Change Secret Key (If Needed)
```bash
POST /api/auth/change-secret-key
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json

{
  "currentSecretKey": "7392",
  "password": "admin-password"
}

Response:
{
  "success": true,
  "secretKey": "9214"
}
```

### 4b. OR Reset Secret Key (When Forgotten)
```bash
POST /api/auth/reset-secret-key
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json

{
  "password": "admin-password"
}

Response:
{
  "success": true,
  "secretKey": "5678"
}
```

## Security Best Practices

1. **Save the Secret Key Immediately**
   - Secret keys are only shown once after generation
   - Store them in a secure location
   - Use a password manager if available

2. **Keep Secret Keys Confidential**
   - Never commit to version control
   - Never share via email or unencrypted channels
   - Only use HTTPS in production

3. **Regular Key Rotation**
   - Change your secret key periodically
   - Use the reset endpoint if key is compromised
   - Document key changes in your system

4. **Use Strong Passwords**
   - Secret key generation requires password verification
   - Ensures only the actual user can generate keys
   - Prevents unauthorized key generation

5. **Monitor Key Usage**
   - Check the status endpoint periodically
   - Monitor when keys were last generated
   - Log all CRUD operations for audit trails

## Error Handling

### Common Errors

**Missing Secret Key**
- Status: 401
- Message: "Unauthorized - Secret key is required for this CRUD operation"
- Solution: Include X-Secret-Key header or secretKey in body

**Invalid Secret Key**
- Status: 403
- Message: "Forbidden - Invalid secret key provided"
- Solution: Verify the secret key is correct

**No Secret Key Configured**
- Status: 401
- Message: "User does not have a secret key configured"
- Solution: Generate a secret key first using /generate-secret-key

**Invalid Password**
- Status: 400
- Message: "Invalid password"
- Solution: Verify your password is correct

**Insufficient Permissions**
- Status: 403
- Message: "Only admin and director users can generate secret keys"
- Solution: Only admin/director roles can manage secret keys

## Postman Setup

### Import Environment Variables

Create a Postman environment with:

```json
{
  "name": "MERN App",
  "values": [
    {
      "key": "base_url",
      "value": "http://localhost:4000",
      "enabled": true
    },
    {
      "key": "jwt_token",
      "value": "",
      "enabled": true
    },
    {
      "key": "secret_key",
      "value": "",
      "enabled": true
    }
  ]
}
```

### Request Setup

**1. Login Request**
- Method: POST
- URL: `{{base_url}}/api/auth/login`
- Body: JSON with email and password
- Tests: 
  ```javascript
  var jsonData = pm.response.json();
  pm.environment.set("jwt_token", jsonData.token);
  ```

**2. Generate Secret Key Request**
- Method: POST
- URL: `{{base_url}}/api/auth/generate-secret-key`
- Headers: `Authorization: Bearer {{jwt_token}}`
- Body: JSON with password
- Tests:
  ```javascript
  var jsonData = pm.response.json();
  pm.environment.set("secret_key", jsonData.secretKey);
  ```

**3. Create Staff Request**
- Method: POST
- URL: `{{base_url}}/api/staff`
- Headers: 
  - `Authorization: Bearer {{jwt_token}}`
  - `X-Secret-Key: {{secret_key}}`
- Body: JSON staff data

## Migration from Global Secret Key

If you previously used the global `ADMIN_SECRET_KEY` from environment variables:

1. Each admin/director must generate their own secret key
2. Update all client applications to use the new secret keys
3. Old global key is no longer used for user-specific operations
4. You can keep global key for other purposes if needed

## Troubleshooting

### "Secret key is required for this operation"

**Cause:** Secret key not provided in request

**Solution:**
- Add `X-Secret-Key` header to request
- Or include `secretKey` in request body
- Ensure header name matches exactly (case-sensitive)

### "User does not have a secret key configured"

**Cause:** User hasn't generated a secret key yet

**Solution:**
- Call `/api/auth/generate-secret-key` endpoint
- Provide valid password
- Save the returned secret key

### "Invalid secret key"

**Cause:** Provided secret key doesn't match user's stored key

**Solution:**
- Verify you're using the correct secret key
- Check for typos or extra spaces
- Generate a new key if current one is lost

### "Only admin and director users can..."

**Cause:** Logged-in user is not admin or director

**Solution:**
- Secret key management is admin/director only
- Staff users cannot generate or manage secret keys
- Have an admin/director manage keys for operations
