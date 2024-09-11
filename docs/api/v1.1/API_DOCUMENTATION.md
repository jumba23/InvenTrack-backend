# InvenTrack API Documentation 1.1

## Overview

This document provides information about the InvenTrack API endpoints, their usage, and examples.

Base URL: `https://api.inventrack.com/v1` (replace with your actual base URL)

## Authentication

All API requests require authentication using a JSON Web Token (JWT).

Include the JWT in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## Endpoints

### Products

#### Get All Products

Retrieves a list of all products.

- **URL:** `/products`
- **Method:** `GET`
- **URL Params:** None
- **Data Params:** None
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "products": [
        {
          "id": 1,
          "name": "Product Name",
          "short_description": "Brief product description",
          "long_description": "Detailed product description",
          "sku": "PRD001",
          "retail_price_per_unit": 19.99,
          "selling_price_per_unit": 24.99,
          "total_quantity": 100,
          "quantity_office_1": 50,
          "quantity_office_8": 30,
          "quantity_home": 20,
          "reorder_point": 20,
          "category_id": 1,
          "supplier_id": 1,
          "note": "Additional product notes",
          "image_url": "https://example.com/product-image.jpg",
          "measurement_": "units",
          "status": "normal",
          "stock_retail_value": 1999.0,
          "stock_selling_value": 2499.0,
          "created_at": "2023-01-01T00:00:00Z",
          "updated_at": "2023-01-01T00:00:00Z"
        }
        // ... more products
      ]
    }
    ```
- **Error Response:**
  - **Code:** 500
  - **Content:** `{ "error": "An error occurred while fetching products" }`

#### Get Product by ID

Retrieves a specific product by its ID.

- **URL:** `/products/:id`
- **Method:** `GET`
- **URL Params:**
  - `id=[integer]` (Required)
- **Data Params:** None
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "id": 1,
      "name": "Product Name",
      "short_description": "Brief product description",
      "long_description": "Detailed product description",
      "sku": "PRD001",
      "retail_price_per_unit": 19.99,
      "selling_price_per_unit": 24.99,
      "total_quantity": 100,
      "quantity_office_1": 50,
      "quantity_office_8": 30,
      "quantity_home": 20,
      "reorder_point": 20,
      "category_id": 1,
      "supplier_id": 1,
      "note": "Additional product notes",
      "image_url": "https://example.com/product-image.jpg",
      "measurement_": "units",
      "storage_location": "Warehouse A, Shelf 3",
      "notes": "Handle with care",
      "stock_retail_value": 1999.0,
      "stock_selling_value": 2499.0,
      "created_at": "2023-01-01T00:00:00Z",
      "updated_at": "2023-01-01T00:00:00Z"
    }
    ```
- **Error Response:**
  - **Code:** 404
  - **Content:** `{ "error": "Product not found" }`
  - **Code:** 500
  - **Content:** `{ "error": "An error occurred while fetching the product" }`

#### Add New Product

Adds a new product to the inventory.

- **URL:** `/products`
- **Method:** `POST`
- **URL Params:** None
- **Data Params:**
  ```json
  {
    "name": "New Product", // REQUIRED
    "short_description": "Brief description of new product", // REQUIRED
    "long_description": "Detailed description of new product",
    "sku": "PRD002",
    "retail_price_per_unit": 29.99, // REQUIRED
    "selling_price_per_unit": 34.99, // REQUIRED
    "quantity_office_1": 25, // REQUIRED
    "quantity_office_8": 15, // REQUIRED
    "quantity_home": 10, // REQUIRED
    "reorder_point": 10, // REQUIRED
    "category_id": 2, // REQUIRED
    "supplier_id": 2, // REQUIRED
    "note": "New product notes",
    "image_url": "https://example.com/new-product-image.jpg",
    "measurement_": "kg" // REQUIRED
  }
  ```
- **Success Response:**
  - **Code:** 201
  - **Content:**
    ```json
    {
      "message": "Product added successfully",
      "product": {
        "id": 2,
        "name": "New Product",
        "short_description": "Brief description of new product",
        "long_description": "Detailed description of new product",
        "sku": "PRD002",
        "retail_price_per_unit": 29.99,
        "selling_price_per_unit": 34.99,
        "total_quantity": 50,
        "quantity_office_1": 25,
        "quantity_office_8": 15,
        "quantity_home": 10,
        "reorder_point": 10,
        "category_id": 2,
        "supplier_id": 2,
        "note": "New product notes",
        "image_url": "https://example.com/new-product-image.jpg",
        "measurement_": "kg",
        "status": "normal",
        "stock_retail_value": 1499.5,
        "stock_selling_value": 1749.5,
        "created_at": "2023-01-02T00:00:00Z",
        "updated_at": "2023-01-02T00:00:00Z"
      }
    }
    ```
- **Error Response:**
  - **Code:** 400
  - **Content:** `{ "errors": ["name is required", "retail_price_price must be a positive number"] }`
  - **Code:** 500
  - **Content:** `{ "error": "An error occurred while adding the product" }`

#### Update Product

Updates an existing product.

- **URL:** `/products/:id`
- **Method:** `PUT`
- **URL Params:**
  - `id=[integer]` (Required)
- **Data Params:**
  ```json
  {
    "name": "Updated Product Name",
    "short_description": "Updated brief description",
    "long_description": "Updated detailed description",
    "sku": "PRD001-UPD",
    "retail_price_per_unit": 21.99,
    "selling_price_per_unit": 26.99,
    "quantity_office_1": 60,
    "quantity_office_8": 40,
    "quantity_home": 30,
    "reorder_point": 25,
    "category_id": 1,
    "supplier_id": 1,
    "note": "Updated product notes",
    "image_url": "https://example.com/updated-product-image.jpg",
    "measurement_": "units"
  }
  ```
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "message": "Product updated successfully",
      "product": {
        "id": 1,
        "name": "Updated Product Name",
        "short_description": "Updated brief description",
        "long_description": "Updated detailed description",
        "sku": "PRD001-UPD",
        "retail_price_per_unit": 21.99,
        "selling_price_per_unit": 26.99,
        "total_quantity": 130,
        "quantity_office_1": 60,
        "quantity_office_8": 40,
        "quantity_home": 30,
        "reorder_point": 25,
        "category_id": 1,
        "supplier_id": 1,
        "note": "Updated product notes",
        "image_url": "https://example.com/updated-product-image.jpg",
        "measurement_": "units",
        "status": "normal",
        "stock_retail_value": 1499.5,
        "stock_selling_value": 1749.5,
        "created_at": "2023-01-01T00:00:00Z",
        "updated_at": "2023-01-03T00:00:00Z"
      }
    }
    ```
- **Error Response:**
  - **Code:** 404
  - **Content:** `{ "error": "Product not found" }`
  - **Code:** 400
  - **Content:** `{ "errors": ["retail_price_price must be a positive number"] }`
  - **Code:** 500
  - **Content:** `{ "error": "An error occurred while updating the product" }`

#### Delete Product

Deletes a product from the inventory.

- **URL:** `/products/:id`
- **Method:** `DELETE`
- **URL Params:**
  - `id=[integer]` (Required)
- **Data Params:** None
- **Success Response:**
  - **Code:** 200
  - **Content:** `{ "message": "Product deleted successfully" }`
- **Error Response:**
  - **Code:** 404
  - **Content:** `{ "error": "Product not found" }`
  - **Code:** 500
  - **Content:** `{ "error": "An error occurred while deleting the product" }`

## Suppliers

### Get All Suppliers

Retrieves a list of all suppliers.

- **URL:** `/suppliers`
- **Method:** `GET`
- **URL Params:** None
- **Data Params:** None
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "suppliers": [
        {
          "id": 1,
          "name": "Supplier Name", // REQUIRE
          "contact_person": "John Doe",
          "email": "john@supplier.com",
          "phone": "+1234567890",
          "address": "123 Supplier St, City, Country",
          "created_at": "2023-01-01T00:00:00Z",
          "updated_at": "2023-01-01T00:00:00Z"
        }
        // ... more suppliers
      ]
    }
    ```
- **Error Response:**
  - **Code:** 500
  - **Content:** `{ "error": "An error occurred while fetching suppliers" }`

### Get Supplier by ID

Retrieves a specific supplier by its ID.

- **URL:** `/suppliers/:id`
- **Method:** `GET`
- **URL Params:**
  - `id=[integer]` (Required)
- **Data Params:** None
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "id": 1,
      "name": "Supplier Name",
      "contact_person": "John Doe",
      "email": "john@supplier.com",
      "phone": "+1234567890",
      "address": "123 Supplier St, City, Country",
      "created_at": "2023-01-01T00:00:00Z",
      "updated_at": "2023-01-01T00:00:00Z"
    }
    ```
- **Error Response:**
  - **Code:** 404
  - **Content:** `{ "error": "Supplier not found" }`
  - **Code:** 500
  - **Content:** `{ "error": "An error occurred while fetching the supplier" }`

### Add New Supplier

Adds a new supplier to the database.

- **URL:** `/suppliers`
- **Method:** `POST`
- **URL Params:** None
- **Data Params:**
  ```json
  {
    "name": "New Supplier", // REQUIRED
    "contact_person": "Jane Smith",
    "email": "jane@newsupplier.com",
    "phone": "+1987654321",
    "address": "456 New Supplier Ave, Town, Country"
  }
  ```
- **Success Response:**
  - **Code:** 201
  - **Content:**
    ```json
    {
      "message": "Supplier added successfully",
      "supplier": {
        "id": 2,
        "name": "New Supplier",
        "contact_person": "Jane Smith",
        "email": "jane@newsupplier.com",
        "phone": "+1987654321",
        "address": "456 New Supplier Ave, Town, Country",
        "created_at": "2023-01-02T00:00:00Z",
        "updated_at": "2023-01-02T00:00:00Z"
      }
    }
    ```
- **Error Response:**
  - **Code:** 400
  - **Content:** `{ "errors": ["name is required", "email must be a valid email address"] }`
  - **Code:** 500
  - **Content:** `{ "error": "An error occurred while adding the supplier" }`

### Update Supplier

Updates an existing supplier.

- **URL:** `/suppliers/:id`
- **Method:** `PUT`
- **URL Params:**
  - `id=[integer]` (Required)
- **Data Params:**
  ```json
  {
    "name": "Updated Supplier Name",
    "contact_person": "John Updated",
    "email": "john.updated@supplier.com",
    "phone": "+1111222333",
    "address": "789 Updated St, New City, Country"
  }
  ```
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "message": "Supplier updated successfully",
      "supplier": {
        "id": 1,
        "name": "Updated Supplier Name",
        "contact_person": "John Updated",
        "email": "john.updated@supplier.com",
        "phone": "+1111222333",
        "address": "789 Updated St, New City, Country",
        "created_at": "2023-01-01T00:00:00Z",
        "updated_at": "2023-01-03T00:00:00Z"
      }
    }
    ```
- **Error Response:**
  - **Code:** 404
  - **Content:** `{ "error": "Supplier not found" }`
  - **Code:** 400
  - **Content:** `{ "errors": ["email must be a valid email address"] }`
  - **Code:** 500
  - **Content:** `{ "error": "An error occurred while updating the supplier" }`

### Delete Supplier

Deletes a supplier from the database.

- **URL:** `/suppliers/:id`
- **Method:** `DELETE`
- **URL Params:**
  - `id=[integer]` (Required)
- **Data Params:** None
- **Success Response:**
  - **Code:** 200
  - **Content:** `{ "message": "Supplier deleted successfully" }`
- **Error Response:**
  - **Code:** 404
  - **Content:** `{ "error": "Supplier not found" }`
  - **Code:** 500
  - **Content:** `{ "error": "An error occurred while deleting the supplier" }`

## Profiles

### Get All Profiles

Retrieves a list of all user profiles.

- **URL:** `/profiles`
- **Method:** `GET`
- **URL Params:** None
- **Data Params:** None
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "profiles": [
        {
          "id": "uuid-1",
          "user_id": "auth-uuid-1",
          "full_name": "John Doe",
          "role": "admin",
          "cell_number": "+1234567890",
          "created_at": "2023-01-01T00:00:00Z",
          "updated_at": "2023-01-01T00:00:00Z"
        }
        // ... more profiles
      ]
    }
    ```
- **Error Response:**
  - **Code:** 500
  - **Content:** `{ "error": "An error occurred while fetching profiles" }`

### Get Profile by ID

Retrieves a specific profile by its ID.

- **URL:** `/profiles/:id`
- **Method:** `GET`
- **URL Params:**
  - `id=[uuid]` (Required)
- **Data Params:** None
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "id": "uuid-1",
      "user_id": "auth-uuid-1",
      "full_name": "John Doe",
      "role": "admin",
      "cell_number": "+1234567890",
      "created_at": "2023-01-01T00:00:00Z",
      "updated_at": "2023-01-01T00:00:00Z"
    }
    ```
- **Error Response:**
  - **Code:** 404
  - **Content:** `{ "error": "Profile not found" }`
  - **Code:** 500
  - **Content:** `{ "error": "An error occurred while fetching the profile" }`

### Create Profile

Creates a new user profile.

- **URL:** `/profiles`
- **Method:** `POST`
- **URL Params:** None
- **Data Params:**
  ```json
  {
    "user_id": "auth-uuid-2",
    "full_name": "Jane Smith",
    "role": "manager",
    "cell_number": "+1987654321"
  }
  ```
- **Success Response:**
  - **Code:** 201
  - **Content:**
    ```json
    {
      "message": "Profile created successfully",
      "profile": {
        "id": "uuid-2",
        "user_id": "auth-uuid-2",
        "full_name": "Jane Smith",
        "role": "manager",
        "cell_number": "+1987654321",
        "created_at": "2023-01-02T00:00:00Z",
        "updated_at": "2023-01-02T00:00:00Z"
      }
    }
    ```
- **Error Response:**
  - **Code:** 400
  - **Content:** `{ "errors": ["user_id is required", "role must be one of [admin, manager, staff]"] }`
  - **Code:** 500
  - **Content:** `{ "error": "An error occurred while creating the profile" }`

### Update Profile

Updates an existing user profile.

- **URL:** `/profiles/:id`
- **Method:** `PUT`
- **URL Params:**
  - `id=[uuid]` (Required)
- **Data Params:**
  ```json
  {
    "full_name": "John Doe Updated",
    "role": "staff",
    "cell_number": "+1111222333"
  }
  ```
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "message": "Profile updated successfully",
      "profile": {
        "id": "uuid-1",
        "user_id": "auth-uuid-1",
        "full_name": "John Doe Updated",
        "role": "staff",
        "cell_number": "+1111222333",
        "created_at": "2023-01-01T00:00:00Z",
        "updated_at": "2023-01-03T00:00:00Z"
      }
    }
    ```
- **Error Response:**
  - **Code:** 404
  - **Content:** `{ "error": "Profile not found" }`
  - **Code:** 400
  - **Content:** `{ "errors": ["role must be one of [admin, manager, staff]"] }`
  - **Code:** 500
  - **Content:** `{ "error": "An error occurred while updating the profile" }`

### Delete Profile

Deletes a user profile.

- **URL:** `/profiles/:id`
- **Method:** `DELETE`
- **URL Params:**
  - `id=[uuid]` (Required)
- **Data Params:** None
- **Success Response:**
  - **Code:** 200
  - **Content:** `{ "message": "Profile deleted successfully" }`
- **Error Response:**
  - **Code:** 404
  - **Content:** `{ "error": "Profile not found" }`
  - **Code:** 500
  - **Content:** `{ "error": "An error occurred while deleting the profile" }`

## Categories

### Get All Categories

Retrieves a list of all categories.

- **URL:** `/categories`
- **Method:** `GET`
- **URL Params:** None
- **Data Params:** None
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "categories": [
        {
          "id": 1,
          "type": "retail", // REQUIRED
          "name": "Electronics",
          "created_at": "2023-01-01T00:00:00Z",
          "updated_at": "2023-01-01T00:00:00Z"
        }
        // ... more categories
      ]
    }
    ```
- **Error Response:**
  - **Code:** 500
  - **Content:** `{ "error": "An error occurred while fetching categories" }`

### Get Category by ID

Retrieves a specific category by its ID.

- **URL:** `/categories/:id`
- **Method:** `GET`
- **URL Params:**
  - `id=[integer]` (Required)
- **Data Params:** None
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "id": 1,
      "type": "retail",
      "name": "Electronics",
      "created_at": "2023-01-01T00:00:00Z",
      "updated_at": "2023-01-01T00:00:00Z"
    }
    ```
- **Error Response:**
  - **Code:** 404
  - **Content:** `{ "error": "Category not found" }`
  - **Code:** 500
  - **Content:** `{ "error": "An error occurred while fetching the category" }`

### Create Category

Creates a new category.

- **URL:** `/categories`
- **Method:** `POST`
- **URL Params:** None
- **Data Params:**
  ```json
  {
    "type": "retail", // REQUIRED
    "name": "Consulting"
  }
  ```
- **Success Response:**
  - **Code:** 201
  - **Content:**
    ```json
    {
      "message": "Category created successfully",
      "category": {
        "id": 2,
        "type": "service",
        "name": "Consulting",
        "created_at": "2023-01-02T00:00:00Z",
        "updated_at": "2023-01-02T00:00:00Z"
      }
    }
    ```
- **Error Response:**
  - **Code:** 400
  - **Content:** `{ "errors": ["type must be either 'retail' or 'service'", "name is required"] }`
  - **Code:** 500
  - **Content:** `{ "error": "An error occurred while creating the category" }`

### Update Category

Updates an existing category.

- **URL:** `/categories/:id`
- **Method:** `PUT`
- **URL Params:**
  - `id=[integer]` (Required)
- **Data Params:**
  ```json
  {
    "name": "Updated Electronics"
  }
  ```
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "message": "Category updated successfully",
      "category": {
        "id": 1,
        "type": "retail",
        "name": "Updated Electronics",
        "created_at": "2023-01-01T00:00:00Z",
        "updated_at": "2023-01-03T00:00:00Z"
      }
    }
    ```
- **Error Response:**
  - **Code:** 404
  - **Content:** `{ "error": "Category not found" }`
  - **Code:** 400
  - **Content:** `{ "errors": ["name cannot be empty"] }`
  - **Code:** 500
  - **Content:** `{ "error": "An error occurred while updating the category" }`

### Delete Category

Deletes a category.

- **URL:** `/categories/:id`
- **Method:** `DELETE`
- **URL Params:**
  - `id=[integer]` (Required)
- **Data Params:** None
- **Success Response:**
  - **Code:** 200
  - **Content:** `{ "message": "Category deleted successfully" }`
- **Error Response:**
  - **Code:** 404
  - **Content:** `{ "error": "Category not found" }`
  - **Code:** 500
  - **Content:** `{ "error": "An error occurred while deleting the category" }`

## Users

### Get All Users

Retrieves a list of all users.

- **URL:** `/users`
- **Method:** `GET`
- **URL Params:** None
- **Data Params:** None
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "users": [
        {
          "id": "auth-uuid-1",
          "email": "user1@example.com",
          "created_at": "2023-01-01T00:00:00Z"
        },
        {
          "id": "auth-uuid-2",
          "email": "user2@example.com",
          "created_at": "2023-01-02T00:00:00Z"
        }
        // ... more users
      ]
    }
    ```
- **Error Response:**
  - **Code:** 500
  - **Content:** `{ "error": "An error occurred while fetching users" }`
- **Notes:**
  - This endpoint should only be accessible to administrators.
  - It retrieves basic user information from Supabase Auth.

### Get User by ID

Retrieves a specific user by their UUID.

- **URL:** `/users/:id`
- **Method:** `GET`
- **URL Params:**
  - `id=[uuid]` (Required)
- **Data Params:** None
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "id": "auth-uuid-1",
      "email": "user1@example.com",
      "created_at": "2023-01-01T00:00:00Z"
    }
    ```
- **Error Response:**
  - **Code:** 404
  - **Content:** `{ "error": "User not found" }`
  - **Code:** 500
  - **Content:** `{ "error": "An error occurred while fetching the user" }`
- **Notes:**
  - This endpoint should be accessible to the user themselves or administrators.

### Create User

Creates a new user account.

- **URL:** `/users`
- **Method:** `POST`
- **URL Params:** None
- **Data Params:**
  ```json
  {
    "email": "newuser@example.com",
    "password": "securepassword123"
  }
  ```
- **Success Response:**
  - **Code:** 201
  - **Content:**
    ```json
    {
      "message": "User created successfully",
      "user": {
        "id": "auth-uuid-3",
        "email": "newuser@example.com",
        "created_at": "2023-01-03T00:00:00Z"
      }
    }
    ```
- **Error Response:**
  - **Code:** 400
  - **Content:** `{ "errors": ["Email is already in use", "Password must be at least 8 characters long"] }`
  - **Code:** 500
  - **Content:** `{ "error": "An error occurred while creating the user" }`
- **Notes:**
  - This endpoint interacts with Supabase Auth to create a new user.
  - Email verification might be required depending on your Supabase settings.

### Update User

Updates an existing user's information.

- **URL:** `/users/:id`
- **Method:** `PUT`
- **URL Params:**
  - `id=[uuid]` (Required)
- **Data Params:**
  ```json
  {
    "email": "updated.email@example.com"
  }
  ```
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "message": "User updated successfully",
      "user": {
        "id": "auth-uuid-1",
        "email": "updated.email@example.com",
        "created_at": "2023-01-01T00:00:00Z"
      }
    }
    ```
- **Error Response:**
  - **Code:** 404
  - **Content:** `{ "error": "User not found" }`
  - **Code:** 400
  - **Content:** `{ "errors": ["Email is already in use"] }`
  - **Code:** 500
  - **Content:** `{ "error": "An error occurred while updating the user" }`
- **Notes:**
  - This endpoint should only allow updating certain fields (e.g., email).
  - Password changes should be handled through a separate, secure process.
  - Email changes might require re-verification depending on your Supabase settings.

### Delete User

Deletes a user account.

- **URL:** `/users/:id`
- **Method:** `DELETE`
- **URL Params:**
  - `id=[uuid]` (Required)
- **Data Params:** None
- **Success Response:**
  - **Code:** 200
  - **Content:** `{ "message": "User deleted successfully" }`
- **Error Response:**
  - **Code:** 404
  - **Content:** `{ "error": "User not found" }`
  - **Code:** 500
  - **Content:** `{ "error": "An error occurred while deleting the user" }`
- **Notes:**
  - This endpoint should only be accessible to administrators or the user themselves.
  - Deleting a user should also handle related data (e.g., associated profile, permissions).
  - Consider implementing a soft delete instead of a hard delete for data integrity.

### Notifications

#### Get All Notifications

Retrieves a list of all notifications for the authenticated user.

- **URL:** `/notifications`
- **Method:** `GET`
- **URL Params:** None
- **Data Params:** None
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "notifications": [
        {
          "id": 1,
          "user_id": "auth-uuid-1",
          "product_id": 1,
          "message": "Product 'Electronics' is running low on stock", // REQUIRED
          "is_read": false,
          "created_at": "2023-01-01T00:00:00Z"
        }
        // ... more notifications
      ]
    }
    ```
- **Error Response:**
  - **Code:** 500
  - **Content:** `{ "error": "An error occurred while fetching notifications" }`

#### Get Notification by ID

Retrieves a specific notification by its ID.

- **URL:** `/notifications/:id`
- **Method:** `GET`
- **URL Params:**
  - `id=[integer]` (Required)
- **Data Params:** None
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "id": 1,
      "user_id": "auth-uuid-1",
      "product_id": 1,
      "message": "Product 'Electronics' is running low on stock",
      "is_read": false,
      "created_at": "2023-01-01T00:00:00Z"
    }
    ```
- **Error Response:**
  - **Code:** 404
  - **Content:** `{ "error": "Notification not found" }`
  - **Code:** 500
  - **Content:** `{ "error": "An error occurred while fetching the notification" }`

#### Mark Notification as Read

Updates a notification to mark it as read.

- **URL:** `/notifications/:id/read`
- **Method:** `PUT`
- **URL Params:**
  - `id=[integer]` (Required)
- **Data Params:** None
- **Success Response:**
  - **Code:** 200
  - **Content:** `{ "message": "Notification marked as read" }`
- **Error Response:**
  - **Code:** 404
  - **Content:** `{ "error": "Notification not found" }`
  - **Code:** 500
  - **Content:** `{ "error": "An error occurred while updating the notification" }`

## Storage

### Upload Profile Image

Uploads a new profile image for a user.

- **URL:** `/storage/:userId/profile-image`
- **Method:** `POST`
- **URL Params:**
  - `userId=[uuid]` (Required)
- **Data Params:**
  - Form-data with a file field named 'file'
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "message": "Profile image uploaded successfully",
      "imageUrl": "https://your-supabase-url.supabase.co/storage/v1/object/public/profile-images/filename.jpg"
    }
    ```
- **Error Response:**
  - **Code:** 400
  - **Content:** `{ "error": "No file uploaded" }`
  - **Code:** 500
  - **Content:** `{ "error": "Failed to upload profile image" }`
- **Notes:**
  - This endpoint requires authentication.
  - The file should be an image (e.g., JPEG, PNG).
  - The old image (if exists) will be deleted from storage.

### Get Profile Image URL

Retrieves the URL of a user's profile image.

- **URL:** `/storage/:userId/profile-image`
- **Method:** `GET`
- **URL Params:**
  - `userId=[uuid]` (Required)
- **Data Params:** None
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "imageUrl": "https://your-supabase-url.supabase.co/storage/v1/object/public/profile-images/filename.jpg"
    }
    ```
- **Error Response:**
  - **Code:** 404
  - **Content:** `{ "error": "Profile image not found" }`
  - **Code:** 500
  - **Content:** `{ "error": "Failed to fetch profile data" }`
- **Notes:**
  - This endpoint requires authentication.
  - If no profile image is set, it will return a 404 error.

### Update Profile Image

Updates an existing profile image for a user.

- **URL:** `/storage/:userId/profile-image`
- **Method:** `PUT`
- **URL Params:**
  - `userId=[uuid]` (Required)
- **Data Params:**
  - Form-data with a file field named 'file'
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "message": "Profile image updated successfully",
      "imageUrl": "https://your-supabase-url.supabase.co/storage/v1/object/public/profile-images/new-filename.jpg"
    }
    ```
- **Error Response:**
  - **Code:** 400
  - **Content:** `{ "error": "No file uploaded" }`
  - **Code:** 500
  - **Content:** `{ "error": "Failed to update profile image" }`
- **Notes:**
  - This endpoint requires authentication.
  - The old image will be deleted from storage.
  - The file should be an image (e.g., JPEG, PNG).

### Delete Profile Image

Deletes the profile image of a user.

- **URL:** `/storage/:userId/profile-image`
- **Method:** `DELETE`
- **URL Params:**
  - `userId=[uuid]` (Required)
- **Data Params:** None
- **Success Response:**
  - **Code:** 200
  - **Content:** `{ "message": "Profile image deleted successfully" }`
- **Error Response:**
  - **Code:** 404
  - **Content:** `{ "error": "Profile image not found" }`
  - **Code:** 500
  - **Content:** `{ "error": "An error occurred while deleting the profile image" }`
- **Notes:**
  - This endpoint requires authentication.
  - This will remove the image from Supabase storage and update the user's profile.

## Error Codes

- 400: Bad Request - The request was invalid or cannot be served. The exact error should be explained in the error payload.
- 401: Unauthorized - The request requires user authentication.
- 403: Forbidden - The server understood the request but refuses to authorize it.
- 404: Not Found - The requested resource could not be found.
- 500: Internal Server Error - The server encountered an unexpected condition which prevented it from fulfilling the request.

## Rate Limiting

API calls are limited to 100 requests per hour per API key. If you exceed this limit, you'll receive a 429 Too Many Requests response.

## Versioning

This documentation is for API version 1. The API version is included in the URL path.

## Support

For additional support or questions, please contact our API team at g.cvetic23@gmail.com.
