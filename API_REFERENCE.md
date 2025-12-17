# API Reference - Civic-AI

Complete API documentation for all endpoints in the Civic-AI platform.

## Base URL
```
Development: http://localhost:3000/api
Production: https://your-domain.com/api
```

## Authentication

All protected endpoints require authentication via NextAuth session.

### Check Session Status
```javascript
import { useSession } from 'next-auth/react';

const { data: session, status } = useSession();
// status: 'loading' | 'authenticated' | 'unauthenticated'
```

---

## 🔐 Auth Endpoints

### POST /api/auth/signup
Register a new user.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user",
  "department": "Public Works", // Required if role is 'department'
  "phone": "+1234567890" // Optional
}
```

**Response (201):**
```json
{
  "message": "User created successfully",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Errors:**
- 400: Missing required fields or user exists
- 500: Server error

---

### GET/POST /api/auth/[...nextauth]
NextAuth.js endpoints for authentication.

**Sign In:**
```javascript
import { signIn } from 'next-auth/react';

// Credentials
await signIn('credentials', {
  email: 'john@example.com',
  password: 'password123',
  redirect: false
});

// Google OAuth
await signIn('google', {
  callbackUrl: '/dashboard'
});
```

**Sign Out:**
```javascript
import { signOut } from 'next-auth/react';

await signOut({ callbackUrl: '/' });
```

---

## 📝 Complaint Endpoints

### POST /api/complaints/create
Create a new complaint.

**Auth Required:** Yes  
**Roles:** Any authenticated user

**Request:**
```json
{
  "title": "Broken street light",
  "description": "The street light on Main St has been broken for a week",
  "location": "Main Street, near City Hall",
  "category": "Infrastructure",
  "department": "Public Works",
  "aiAnalysis": {
    "category": "Infrastructure",
    "department": "Public Works",
    "priority": "high",
    "confidence": 0.95,
    "keywords": ["street", "light", "broken"],
    "sentiment": "negative"
  }
}
```

**Response (201):**
```json
{
  "message": "Complaint created successfully",
  "complaint": {
    "_id": "complaint_id",
    "title": "Broken street light",
    "description": "...",
    "status": "pending",
    "userId": "user_id",
    "createdAt": "2025-12-16T...",
    ...
  }
}
```

**Errors:**
- 400: Missing required fields
- 401: Unauthorized
- 500: Server error

---

### GET /api/complaints/my-complaints
Get all complaints filed by the authenticated user.

**Auth Required:** Yes  
**Roles:** Any authenticated user

**Response (200):**
```json
[
  {
    "_id": "complaint_id",
    "title": "Broken street light",
    "description": "...",
    "status": "pending",
    "category": "Infrastructure",
    "department": "Public Works",
    "priority": "high",
    "userId": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "createdAt": "2025-12-16T...",
    "updatedAt": "2025-12-16T..."
  },
  ...
]
```

---

### GET /api/complaints/department
Get all complaints assigned to the user's department.

**Auth Required:** Yes  
**Roles:** Department only

**Response (200):**
```json
[
  {
    "_id": "complaint_id",
    "title": "Water leakage",
    "department": "Public Works",
    ...
  },
  ...
]
```

**Errors:**
- 401: Unauthorized (not department role)

---

### GET /api/complaints/all
Get all complaints (system-wide).

**Auth Required:** Yes  
**Roles:** Authority, Developer only

**Response (200):**
```json
[
  {
    "_id": "complaint_id",
    "title": "...",
    ...
  },
  ...
]
```

**Errors:**
- 401: Unauthorized (not authority/developer)

---

### GET /api/complaints/[id]
Get a specific complaint by ID.

**Auth Required:** Yes  
**Access:** Owner, Department (if assigned), Authority, Developer

**Response (200):**
```json
{
  "_id": "complaint_id",
  "title": "Broken street light",
  "description": "...",
  "status": "pending",
  "category": "Infrastructure",
  "department": "Public Works",
  "priority": "high",
  "location": "Main Street",
  "userId": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "aiAnalysis": {
    "category": "Infrastructure",
    "confidence": 0.95,
    ...
  },
  "updates": [
    {
      "message": "Complaint received",
      "status": "pending",
      "timestamp": "2025-12-16T...",
      "updatedBy": {...}
    }
  ],
  "comments": [
    {
      "text": "We'll look into this",
      "author": {...},
      "timestamp": "2025-12-16T..."
    }
  ],
  "createdAt": "2025-12-16T...",
  "updatedAt": "2025-12-16T..."
}
```

**Errors:**
- 401: Unauthorized
- 404: Complaint not found

---

### POST /api/complaints/[id]/comment
Add a comment to a complaint.

**Auth Required:** Yes

**Request:**
```json
{
  "text": "We are working on this issue"
}
```

**Response (200):**
```json
{
  "message": "Comment added",
  "complaint": {
    "_id": "complaint_id",
    "comments": [
      {
        "text": "We are working on this issue",
        "author": {
          "_id": "user_id",
          "name": "Jane Smith"
        },
        "timestamp": "2025-12-16T..."
      }
    ],
    ...
  }
}
```

**Errors:**
- 400: Missing comment text
- 401: Unauthorized
- 404: Complaint not found

---

## 🤖 AI Endpoints

### POST /api/ai/categorize
Categorize a complaint using AI.

**Auth Required:** No (can be used before signup for demo)

**Request:**
```json
{
  "title": "Broken street light on Main Street",
  "description": "The street light has been broken for a week causing safety issues"
}
```

**Response (200):**
```json
{
  "analysis": {
    "category": "Infrastructure",
    "department": "Public Works",
    "priority": "high",
    "keywords": ["street", "light", "broken", "safety"],
    "sentiment": "negative",
    "confidence": 0.95,
    "reasoning": "Infrastructure issue requiring immediate attention for public safety"
  }
}
```

**Errors:**
- 400: Missing title or description
- 500: AI service error

---

### POST /api/ai/suggestions
Get AI suggestions for complaint text.

**Auth Required:** No

**Request:**
```json
{
  "text": "The water pressure in my area is very low"
}
```

**Response (200):**
```json
{
  "suggestions": [
    "Specify the exact location and address",
    "Mention when the problem started",
    "Note if it affects multiple households",
    "Include the time of day when pressure is lowest"
  ]
}
```

**Errors:**
- 400: Missing text
- 500: AI service error

---

## 🏢 Department Endpoints

### GET /api/departments
Get all active departments.

**Auth Required:** Yes

**Response (200):**
```json
[
  {
    "_id": "dept_id",
    "name": "Public Works",
    "code": "PW",
    "description": "Handles infrastructure and maintenance"
  },
  ...
]
```

---

## 📊 Statistics Endpoints

### GET /api/stats/system
Get system statistics (developer only).

**Auth Required:** Yes  
**Roles:** Developer only

**Response (200):**
```json
{
  "apiCalls": 5234,
  "dbQueries": 2891,
  "aiRequests": 1456,
  "activeUsers": 342
}
```

**Errors:**
- 401: Unauthorized (not developer)

---

## 📡 Real-Time Updates

### Using SWR for Auto-Refresh

```javascript
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

function MyComponent() {
  const { data, error, mutate } = useSWR(
    '/api/complaints/my-complaints',
    fetcher,
    {
      refreshInterval: 5000, // Refresh every 5 seconds
      revalidateOnFocus: true,
      revalidateOnReconnect: true
    }
  );

  // Manually refresh
  const refresh = () => mutate();

  return <div>...</div>;
}
```

---

## 🔄 Response Codes

- **200 OK**: Request successful
- **201 Created**: Resource created successfully
- **400 Bad Request**: Invalid input or missing fields
- **401 Unauthorized**: Authentication required or failed
- **403 Forbidden**: Authenticated but not authorized
- **404 Not Found**: Resource doesn't exist
- **500 Internal Server Error**: Server error

---

## 🛡️ Rate Limiting

Currently no rate limiting is implemented. For production:

**Recommended Limits:**
- Auth endpoints: 5 requests/minute
- AI endpoints: 10 requests/minute
- Read endpoints: 100 requests/minute
- Write endpoints: 30 requests/minute

---

## 🧪 Testing APIs

### Using cURL

```bash
# Sign up
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "role": "user"
  }'

# Categorize (no auth required)
curl -X POST http://localhost:3000/api/ai/categorize \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Broken street light",
    "description": "The light is not working"
  }'
```

### Using JavaScript/Fetch

```javascript
// Create complaint
async function createComplaint(complaintData) {
  const response = await fetch('/api/complaints/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(complaintData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  return await response.json();
}

// Get complaints
async function getMyComplaints() {
  const response = await fetch('/api/complaints/my-complaints');
  return await response.json();
}
```

---

## 📝 Notes

1. **Session Management**: Sessions are managed by NextAuth.js using JWT
2. **CORS**: Not configured for external domains (same-origin only)
3. **File Uploads**: Not yet implemented (planned feature)
4. **Pagination**: Not yet implemented for list endpoints
5. **Filtering**: Not yet implemented (planned feature)
6. **Sorting**: Default sort is by `createdAt` descending

---

## 🔮 Future API Endpoints

Planned for future releases:

- `PATCH /api/complaints/[id]/status` - Update complaint status
- `POST /api/complaints/[id]/assign` - Assign to department member
- `GET /api/analytics/dashboard` - Get dashboard analytics
- `POST /api/complaints/[id]/attachments` - Upload files
- `GET /api/search` - Search complaints
- `GET /api/notifications` - Get user notifications
- `PATCH /api/user/profile` - Update user profile

---

For more details, see the source code in `app/api/` directory.
