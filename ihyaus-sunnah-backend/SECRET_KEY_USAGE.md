# Secret Key Authentication Documentation

## Overview
All CRUD operations (Create, Update, Delete) performed by admin or director users now require a secret key verification for enhanced security.

## Configuration

Add the following to your `.env` file:
```
ADMIN_SECRET_KEY=your-super-secret-key-here-change-in-production
```

**Important**: Use a strong, random secret key in production. Example:
```
ADMIN_SECRET_KEY=sk_admin_1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p
```

## How to Use

### 1. Reading Data (No Secret Key Required)
GET requests to read user or staff data do NOT require a secret key:

```bash
# Get all users
GET /api/users
Authorization: Bearer <token>

# Get specific user
GET /api/users/:id
Authorization: Bearer <token>

# Get all staff
GET /api/staff
Authorization: Bearer <token>

# Get specific staff
GET /api/staff/:id
Authorization: Bearer <token>
```

### 2. Creating Data (Secret Key Required)
```bash
POST /api/staff
Authorization: Bearer <token>
X-Secret-Key: your-secret-key

{
  "name": "John Doe",
  "category": "Senior Staff",
  ...
}
```

### 3. Updating Data (Secret Key Required)

**Update User Role:**
```bash
PATCH /api/users/:id/role
Authorization: Bearer <token>
X-Secret-Key: your-secret-key

{
  "role": "admin"
}
```

**Toggle User Active Status:**
```bash
PATCH /api/users/:id/active
Authorization: Bearer <token>
X-Secret-Key: your-secret-key
```

**Update Staff:**
```bash
PATCH /api/staff/:id
Authorization: Bearer <token>
X-Secret-Key: your-secret-key

{
  "name": "Updated Name",
  ...
}
```

### 4. Deleting Data (Secret Key Required)

**Delete Single User:**
```bash
DELETE /api/users/:id
Authorization: Bearer <token>
X-Secret-Key: your-secret-key
```

**Delete Single Staff:**
```bash
DELETE /api/staff/:id
Authorization: Bearer <token>
X-Secret-Key: your-secret-key
```

**Delete All Staff:**
```bash
DELETE /api/staff
Authorization: Bearer <token>
X-Secret-Key: your-secret-key
```

## Passing Secret Key

You can pass the secret key in two ways:

### Method 1: HTTP Header (Recommended)
```bash
X-Secret-Key: your-secret-key
```

### Method 2: Request Body
```json
{
  "secretKey": "your-secret-key",
  ...other data
}
```

## Error Responses

### Missing Secret Key
```json
{
  "success": false,
  "message": "Unauthorized - Secret key is required for this CRUD operation",
  "operation": "PATCH",
  "endpoint": "/api/users/:id/role"
}
```
Status: 401

### Invalid Secret Key
```json
{
  "success": false,
  "message": "Forbidden - Invalid secret key provided"
}
```
Status: 403

### Unauthorized User Role
```json
{
  "success": false,
  "message": "Forbidden - Only admin or director can perform this operation"
}
```
Status: 403

## Role Requirements

- **Admin/Director**: Can perform CRUD operations with valid secret key
- **Staff**: Cannot perform CRUD operations (read-only access)
- **Public**: Must be authenticated to access any endpoint

## Best Practices

1. **Store Secret Key Securely**: Never commit the secret key to version control
2. **Use Strong Keys**: Generate cryptographically random keys (32+ characters)
3. **Rotate Keys**: Change the secret key periodically in production
4. **Use HTTPS**: Always transmit secret keys over HTTPS
5. **Limit Access**: Only share secret key with authorized admin/director users
6. **Monitor Logs**: Log all CRUD operations for audit trails
7. **Environment-Specific**: Use different keys for development, staging, and production

## Testing with cURL

```bash
# Create staff with secret key in header
curl -X POST http://localhost:4000/api/staff \
  -H "Authorization: Bearer <jwt-token>" \
  -H "X-Secret-Key: your-secret-key" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "category": "Senior Staff",
    "email": "jane@example.com"
  }'

# Update user role with secret key
curl -X PATCH http://localhost:4000/api/users/:id/role \
  -H "Authorization: Bearer <jwt-token>" \
  -H "X-Secret-Key: your-secret-key" \
  -H "Content-Type: application/json" \
  -d '{"role": "admin"}'

# Delete staff with secret key
curl -X DELETE http://localhost:4000/api/staff/:id \
  -H "Authorization: Bearer <jwt-token>" \
  -H "X-Secret-Key: your-secret-key"
```

## Testing with Postman

1. Add a new request
2. Set method to POST/PATCH/DELETE
3. Add URL: `http://localhost:4000/api/staff`
4. Go to **Headers** tab
5. Add two headers:
   - Key: `Authorization` | Value: `Bearer <your-jwt-token>`
   - Key: `X-Secret-Key` | Value: `your-secret-key`
6. Go to **Body** tab (for POST/PATCH), select **raw** and **JSON**
7. Add your JSON data
8. Click **Send**
