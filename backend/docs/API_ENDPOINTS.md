# 🍽️ Restaurant Reservation System — API Reference

> **Base URL:** `http://localhost:3000`  
> **Auth:** Bearer JWT (`Authorization: Bearer <token>`)  
> **Roles:** `ADMIN` · `MANAGER` · `WAITER` · `KITCHEN` · `CUSTOMER`

---

## 🔑 Auth — `/auth`

### POST `/auth/login/staff`

Login for all staff roles. **Public.**

**Request**

```json
{
  "email": "admin@savorhouse.com",
  "password": "admin123"
}
```

**Response `200`**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI...",
  "role": "ADMIN",
  "user": {
    "id": 1,
    "name": "Alice Admin",
    "email": "admin@savorhouse.com",
    "role": "ADMIN"
  }
}
```

---

### POST `/auth/login/customer`

Login for customers. **Public.**

**Request**

```json
{
  "email": "john@example.com",
  "password": "pass123"
}
```

**Response `200`**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI...",
  "role": "CUSTOMER",
  "user": {
    "id": 5,
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

---

### POST `/auth/register/customer`

Register a new customer account. **Public.**

**Request**

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "pass123",
  "mobileNumber": "+94771234567"
}
```

**Response `201`**

```json
{
  "user": {
    "id": 5,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "mobileNumber": "+94771234567",
    "loyaltyPoints": 0,
    "createdAt": "2026-02-19T18:00:00.000Z"
  },
  "role": "CUSTOMER"
}
```

---

### POST `/auth/staff`

Create a new staff member. 🔒 **ADMIN only.**

**Request**

```json
{
  "name": "Bob Waiter",
  "email": "bob@savorhouse.com",
  "password": "staff123",
  "role": "WAITER"
}
```

> `role` is optional — defaults to `WAITER`. Values: `ADMIN` | `MANAGER` | `WAITER` | `KITCHEN`

**Response `201`**

```json
{
  "id": 3,
  "name": "Bob Waiter",
  "email": "bob@savorhouse.com",
  "role": "WAITER",
  "isActive": true,
  "createdAt": "2026-02-19T18:05:00.000Z"
}
```

---

### GET `/auth/staff`

List all staff members. 🔒 **ADMIN only.**

**Response `200`**

```json
[
  {
    "id": 1,
    "name": "Alice Admin",
    "email": "admin@savorhouse.com",
    "role": "ADMIN",
    "isActive": true,
    "createdAt": "2026-02-01T10:00:00.000Z"
  },
  {
    "id": 2,
    "name": "Bob Waiter",
    "email": "bob@savorhouse.com",
    "role": "WAITER",
    "isActive": true,
    "createdAt": "2026-02-19T18:05:00.000Z"
  }
]
```

---

### GET `/auth/me`

Returns the currently authenticated user's JWT payload. 🔒 **Any authenticated role.**

**Response `200`**

```json
{
  "sub": 1,
  "email": "admin@savorhouse.com",
  "role": "ADMIN",
  "iat": 1708366800,
  "exp": 1708970800
}
```

---

## 🏠 Restaurants — `/restaurants`

### GET `/restaurants`

List all restaurants. **Public.**

**Response `200`**

```json
[
  {
    "id": 1,
    "name": "Savor House",
    "address": "42 Galle Rd, Colombo 03",
    "phone": "+94112345678",
    "email": "info@savorhouse.com",
    "isActive": true,
    "createdAt": "2026-01-15T08:00:00.000Z"
  }
]
```

---

### GET `/restaurants/:id`

Get a single restaurant. **Public.**

**Response `200`**

```json
{
  "id": 1,
  "name": "Savor House",
  "address": "42 Galle Rd, Colombo 03",
  "phone": "+94112345678",
  "email": "info@savorhouse.com",
  "isActive": true,
  "createdAt": "2026-01-15T08:00:00.000Z"
}
```

---

### POST `/restaurants`

Create a restaurant. 🔒 **ADMIN only.**

**Request**

```json
{
  "name": "Savor House",
  "address": "42 Galle Rd, Colombo 03",
  "phone": "+94112345678",
  "email": "info@savorhouse.com",
  "password": "rest_secret"
}
```

**Response `201`** — returns the created restaurant object.

---

### PATCH `/restaurants/:id`

Update a restaurant. 🔒 **ADMIN only.**

**Request** _(partial fields)_

```json
{
  "phone": "+94119876543",
  "address": "45 Galle Rd, Colombo 03"
}
```

**Response `200`** — returns the updated restaurant object.

---

### DELETE `/restaurants/:id`

Delete a restaurant. 🔒 **ADMIN only.**

**Response `200`** — returns the deleted restaurant object.

---

## 👥 Customers — `/customers`

### POST `/customers`

Create a customer (legacy). **Public.** _(Prefer `/auth/register/customer`)_

**Request**

```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@example.com",
  "password": "pass123",
  "mobileNumber": "+94779876543"
}
```

---

### GET `/customers`

List all customers. 🔒 **ADMIN, MANAGER.**

**Response `200`**

```json
[
  {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "mobileNumber": "+94771234567",
    "loyaltyPoints": 120,
    "createdAt": "2026-02-01T09:00:00.000Z"
  }
]
```

---

### GET `/customers/:id`

Get a single customer. 🔒 **ADMIN, MANAGER, CUSTOMER.**

**Response `200`** — returns a single customer object (same shape as above).

---

### PATCH `/customers/:id`

Update a customer's profile. 🔒 **CUSTOMER, ADMIN.**

**Request** _(partial fields)_

```json
{
  "mobileNumber": "+94770000001"
}
```

**Response `200`** — returns updated customer object.

---

### DELETE `/customers/:id`

Delete a customer. 🔒 **ADMIN only.**

**Response `200`** — returns deleted customer object.

---

## 🪑 Tables — `/tables`

### GET `/tables`

List all dining tables. **Public.**

**Response `200`**

```json
[
  {
    "id": 1,
    "restaurantId": 1,
    "tableNumber": 5,
    "capacity": 4,
    "location": "Window side",
    "isActive": true
  }
]
```

---

### GET `/tables/restaurant/:restaurantId`

List tables for a specific restaurant. **Public.**

**Example:** `GET /tables/restaurant/1`

---

### GET `/tables/:id`

Get a single table. **Public.**

---

### POST `/tables`

Create a table. 🔒 **ADMIN, MANAGER.**

**Request**

```json
{
  "restaurantId": 1,
  "tableNumber": 5,
  "capacity": 4,
  "location": "Window side",
  "isActive": true
}
```

**Response `201`** — returns created table object.

---

### PATCH `/tables/:id`

Update a table. 🔒 **ADMIN, MANAGER.**

**Request** _(partial fields)_

```json
{
  "capacity": 6,
  "location": "Garden"
}
```

---

### DELETE `/tables/:id`

Delete a table. 🔒 **ADMIN, MANAGER.**

---

## 📅 Reservations — `/reservations`

> All reservation routes require a valid JWT.

### POST `/reservations`

Create a reservation. 🔒 **CUSTOMER.**

**Request**

```json
{
  "restaurantId": 1,
  "customerId": 5,
  "tableId": 3,
  "reservationDate": "2026-03-10",
  "startTime": "2026-03-10T18:00:00.000Z",
  "endTime": "2026-03-10T20:00:00.000Z",
  "guestCount": 4,
  "specialRequest": "Window seat preferred, nut allergy"
}
```

> `tableId`, `endTime`, and `specialRequest` are optional.

**Response `201`**

```json
{
  "id": 12,
  "restaurantId": 1,
  "customerId": 5,
  "tableId": 3,
  "reservationDate": "2026-03-10T00:00:00.000Z",
  "startTime": "2026-03-10T18:00:00.000Z",
  "endTime": "2026-03-10T20:00:00.000Z",
  "guestCount": 4,
  "status": "PENDING",
  "specialRequest": "Window seat preferred, nut allergy",
  "createdAt": "2026-02-19T18:30:00.000Z"
}
```

---

### GET `/reservations`

List all reservations. 🔒 **ADMIN, MANAGER, WAITER.**

**Response `200`** — array of reservation objects.

---

### GET `/reservations/restaurant/:restaurantId`

All reservations for a restaurant. 🔒 **ADMIN, MANAGER, WAITER.**

**Example:** `GET /reservations/restaurant/1`

---

### GET `/reservations/customer/:customerId`

All reservations for a customer. 🔒 **CUSTOMER, ADMIN, MANAGER, WAITER.**

**Example:** `GET /reservations/customer/5`

---

### GET `/reservations/:id`

Get a single reservation. 🔒 **CUSTOMER, ADMIN, MANAGER, WAITER.**

---

### PATCH `/reservations/:id`

Update a reservation. 🔒 **ADMIN, MANAGER, WAITER, CUSTOMER.**

**Request** _(partial fields)_

```json
{
  "status": "CONFIRMED",
  "tableId": 7,
  "guestCount": 5
}
```

> `status` values: `PENDING` | `CONFIRMED` | `CANCELLED` | `COMPLETED`

---

### DELETE `/reservations/:id`

Cancel / delete a reservation. 🔒 **ADMIN, MANAGER, CUSTOMER.**

---

## 🍴 Menu — `/menu`

### POST `/menu/categories`

Create a menu category. 🔒 **ADMIN, MANAGER.**

**Request**

```json
{
  "restaurantId": 1,
  "name": "Starters"
}
```

**Response `201`**

```json
{
  "id": 2,
  "restaurantId": 1,
  "name": "Starters"
}
```

---

### GET `/menu/categories/restaurant/:restaurantId`

List all categories for a restaurant. **Public.**

**Example:** `GET /menu/categories/restaurant/1`

**Response `200`**

```json
[
  { "id": 1, "restaurantId": 1, "name": "Starters" },
  { "id": 2, "restaurantId": 1, "name": "Mains" },
  { "id": 3, "restaurantId": 1, "name": "Desserts" }
]
```

---

### DELETE `/menu/categories/:id`

Delete a category. 🔒 **ADMIN, MANAGER.**

---

### POST `/menu/items`

Create a menu item. 🔒 **ADMIN, MANAGER.**

**Request**

```json
{
  "restaurantId": 1,
  "categoryId": 2,
  "name": "Grilled Salmon",
  "description": "Atlantic salmon with lemon butter sauce",
  "price": 2850.0,
  "imageUrl": "https://cdn.savorhouse.com/images/salmon.jpg",
  "isAvailable": true
}
```

> `categoryId`, `description`, `imageUrl`, and `isAvailable` are optional.

**Response `201`**

```json
{
  "id": 8,
  "restaurantId": 1,
  "categoryId": 2,
  "name": "Grilled Salmon",
  "description": "Atlantic salmon with lemon butter sauce",
  "price": "2850.00",
  "imageUrl": "https://cdn.savorhouse.com/images/salmon.jpg",
  "isAvailable": true
}
```

---

### GET `/menu/items/restaurant/:restaurantId`

List all menu items for a restaurant. **Public.**

**Example:** `GET /menu/items/restaurant/1`

---

### GET `/menu/items/:id`

Get a single menu item. **Public.**

---

### PATCH `/menu/items/:id`

Update a menu item. 🔒 **ADMIN, MANAGER.**

**Request** _(partial fields)_

```json
{
  "price": 3100.0,
  "isAvailable": false
}
```

---

### DELETE `/menu/items/:id`

Delete a menu item. 🔒 **ADMIN, MANAGER.**

---

## 📋 Role Access Summary

| Endpoint Group           | Public | CUSTOMER | WAITER | KITCHEN | MANAGER | ADMIN |
| ------------------------ | :----: | :------: | :----: | :-----: | :-----: | :---: |
| Auth (login/register)    |   ✅   |    —     |   —    |    —    |    —    |   —   |
| Auth — create/list staff |   —    |    —     |   —    |    —    |    —    |  ✅   |
| Restaurants — read       |   ✅   |    —     |   —    |    —    |    —    |   —   |
| Restaurants — write      |   —    |    —     |   —    |    —    |    —    |  ✅   |
| Customers — read own     |   —    |    ✅    |   —    |    —    |   ✅    |  ✅   |
| Customers — read all     |   —    |    —     |   —    |    —    |   ✅    |  ✅   |
| Customers — delete       |   —    |    —     |   —    |    —    |    —    |  ✅   |
| Tables — read            |   ✅   |    —     |   —    |    —    |    —    |   —   |
| Tables — write           |   —    |    —     |   —    |    —    |   ✅    |  ✅   |
| Reservations — create    |   —    |    ✅    |   —    |    —    |    —    |   —   |
| Reservations — read all  |   —    |    —     |   ✅   |    —    |   ✅    |  ✅   |
| Reservations — update    |   —    |    ✅    |   ✅   |    —    |   ✅    |  ✅   |
| Reservations — delete    |   —    |    ✅    |   —    |    —    |   ✅    |  ✅   |
| Menu — read              |   ✅   |    —     |   —    |    —    |    —    |   —   |
| Menu — write             |   —    |    —     |   —    |    —    |   ✅    |  ✅   |

---

## ⚠️ Common Error Responses

| Status             | Meaning                                       |
| ------------------ | --------------------------------------------- |
| `400 Bad Request`  | Validation failed — check request body fields |
| `401 Unauthorized` | Missing or invalid JWT token                  |
| `403 Forbidden`    | Valid token but insufficient role             |
| `404 Not Found`    | Resource with given ID doesn't exist          |
| `409 Conflict`     | Email already in use (auth endpoints)         |
