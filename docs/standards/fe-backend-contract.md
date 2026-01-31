# FE Backend Contract (SSOT — Contract First)

**Version:** 1.0.0  
**Status:** Required  
**Authority:** CTO  
**Scope:** ogry-panel + ogry-website

---

## Base Configuration

### Base URL
- **Pattern:** `/api/v1`
- **Versioning:** URL-based versioning (`/v1`, `/v2`, etc.)

### Headers

#### Required Headers
- `X-Correlation-Id` (string, required)
  - Client generates unique correlation ID for each request
  - Format: UUID v4 or similar unique identifier
  - Purpose: Request tracing and debugging

#### Conditional Headers
- `Authorization: Bearer <token>` (string, required for authenticated endpoints)
  - JWT token for authenticated requests
  - Format: `Bearer <jwt-token>`

---

## Response Patterns

### Success Response

**UI Layer:**
- UI components **DO NOT** receive `Result<T>` directly
- Adapter layer normalizes backend response to domain models
- UseCase layer handles `Result<T>` internally

**Adapter Layer:**
- Converts backend response → `Result<T>`
- Handles error normalization

### Error Response

#### Backend → Frontend Flow

1. **Backend Response:** RFC7807 `ProblemDetails` format
   ```json
   {
     "type": "https://example.com/probs/validation-error",
     "title": "Validation Error",
     "status": 400,
     "detail": "One or more validation errors occurred",
     "instance": "/api/v1/cabins",
     "errors": {
       "name": ["Name is required"],
       "maxCapacity": ["Must be greater than 0"]
     }
   }
   ```

2. **Adapter Normalization:** `ProblemDetails` → `AppError`
   - Maps HTTP status codes to error codes
   - Extracts validation errors
   - Preserves correlation ID

3. **UI Handling:**
   - `401 Unauthorized` → Triggers `SessionExpired` event
   - `403 Forbidden` → No silent redirect (UI decides)
   - Other errors → Display via toast/error boundary

#### Error Types

| HTTP Status | Error Code | UI Action |
|------------|------------|-----------|
| 400 | `VALIDATION_ERROR` | Show field errors |
| 401 | `UNAUTHORIZED` | Trigger `SessionExpired` event |
| 403 | `FORBIDDEN` | UI decides (no auto-redirect) |
| 404 | `NOT_FOUND` | Show not found message |
| 409 | `CONFLICT` | Show conflict message |
| 500 | `INTERNAL_ERROR` | Show generic error |

---

## Pagination (LIST Endpoints)

### Response Format

```typescript
type PagedResponse<T> = {
  items: T[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
};
```

### Query Parameters

- `pageIndex` (number, default: 0)
- `pageSize` (number, default: 10, max: 100)
- `sortBy` (string, optional)
- `sortDirection` (string: "asc" | "desc", default: "asc")

---

## Endpoint Matrix: Cabins

### GET /cabins

**Description:** Retrieve list of cabins

**Query Parameters:**
- `pageIndex` (number, optional)
- `pageSize` (number, optional)
- `sortBy` (string, optional)
- `sortDirection` (string, optional)

**Response:**
- `200 OK` → `PagedResponse<Cabin>`
- `401 Unauthorized` → `ProblemDetails`
- `500 Internal Server Error` → `ProblemDetails`

**Headers:**
- `X-Correlation-Id` (required)

---

### GET /cabins/{id}

**Description:** Retrieve single cabin by ID

**Path Parameters:**
- `id` (string, required) - Cabin identifier

**Response:**
- `200 OK` → `Cabin`
- `404 Not Found` → `ProblemDetails`
- `401 Unauthorized` → `ProblemDetails`
- `500 Internal Server Error` → `ProblemDetails`

**Headers:**
- `X-Correlation-Id` (required)
- `Authorization` (required)

---

### POST /cabins

**Description:** Create new cabin

**Request Body:**
```json
{
  "name": "string",
  "maxCapacity": "number",
  "regularPrice": "number",
  "discount": "number",
  "description": "string",
  "image": "File | string"
}
```

**Response:**
- `201 Created` → `Cabin`
- `400 Bad Request` → `ProblemDetails` (validation errors)
- `401 Unauthorized` → `ProblemDetails`
- `409 Conflict` → `ProblemDetails`
- `500 Internal Server Error` → `ProblemDetails`

**Headers:**
- `X-Correlation-Id` (required)
- `Authorization` (required)
- `Content-Type: multipart/form-data` (if image upload)

---

### PUT /cabins/{id}

**Description:** Update existing cabin

**Path Parameters:**
- `id` (string, required) - Cabin identifier

**Request Body:**
```json
{
  "name": "string",
  "maxCapacity": "number",
  "regularPrice": "number",
  "discount": "number",
  "description": "string",
  "image": "File | string"
}
```

**Response:**
- `200 OK` → `Cabin`
- `400 Bad Request` → `ProblemDetails` (validation errors)
- `401 Unauthorized` → `ProblemDetails`
- `404 Not Found` → `ProblemDetails`
- `409 Conflict` → `ProblemDetails`
- `500 Internal Server Error` → `ProblemDetails`

**Headers:**
- `X-Correlation-Id` (required)
- `Authorization` (required)
- `Content-Type: multipart/form-data` (if image upload)

---

### DELETE /cabins/{id}

**Description:** Delete cabin by ID

**Path Parameters:**
- `id` (string, required) - Cabin identifier

**Response:**
- `204 No Content` → (empty body)
- `401 Unauthorized` → `ProblemDetails`
- `404 Not Found` → `ProblemDetails`
- `409 Conflict` → `ProblemDetails` (e.g., cabin has active bookings)
- `500 Internal Server Error` → `ProblemDetails`

**Headers:**
- `X-Correlation-Id` (required)
- `Authorization` (required)

---

## Domain Models

### Cabin

```typescript
type Cabin = {
  id: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string; // URL
  createdAt?: string; // ISO 8601
  updatedAt?: string; // ISO 8601
};
```

---

## Implementation Notes

1. **Contract First:** This document is the SSOT (Single Source of Truth)
2. **Adapter Responsibility:** Adapter layer handles all HTTP concerns
3. **UseCase Isolation:** UseCase layer is HTTP-agnostic
4. **UI Simplicity:** UI layer only knows domain models, not HTTP details

---

**Last Updated:** 2025-01-30  
**Maintainer:** Frontend Team

