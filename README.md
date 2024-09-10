# InvenTrack Backend Server

## Overview

InvenTrack Backend Server is a web server for managing and retrieving information about various skincare and beauty products. Built using Express.js, it interacts with a database via Supabase, a scalable and powerful database client. The server includes robust error handling, improved security measures, and a well-structured API to ensure smooth operations.

## Getting Started

### Prerequisites

- **Node.js**: Ensure you have the Node.js version specified in `package.json`.
- **Supabase Account**: Obtain your API keys from Supabase.

### Environment Variables

Create a `.env` file in the root directory with the following variables:

- `SUPABASE_URL`: Your Supabase URL
- `SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `PORT`: The port on which the server will run (default: 5000)
- `MOXIE_WEBHOOK_SECRET_TOKEN`: Token for webhook authentication
- `SESSION_SECRET`: Secret for session management
- `NODE_ENV`: Set to 'production' for production environment

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/inventrack-backend.git
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Ensure the `.env` file is correctly set up with the appropriate values.

4. **Start the server**:
   ```bash
   npm start
   ```
   The backend will run on an Express server, listening on the specified port (default: 5000).

## API Routes

- **`/api/user`**: User authentication (sign-up, login, logout)
- **`/api/products`**: Product-related operations
- **`/api/suppliers`**: Supplier-related operations
- **`/api/webhook`**: Webhook handling (currently for Moxie)

## Folder Structure

```plaintext
root
├── server.js                       # Entry point of the application
├── utils/                          # Utility functions and helpers
│   ├── index.js
│   ├── generateSecureToken.js
│   └── logger.js
├── controllers/                    # Request handlers
│   ├── authController.js
│   ├── productsController.js
│   ├── suppliersController.js
│   └── webhookController.js
├── middleware/                     # Custom middleware functions
│   ├── index.js
│   ├── errorHandler.js
│   ├── validateJWT.js
│   └── checkMoxieToken.js
<<<<<<< HEAD
├── models/
│   ├── userModel.js
│   ├── productModel.js
│   ├── supplierModel.js
│   ├── categoryModel.js
│   └── profileModel.js
=======
<<<<<<< Updated upstream
>>>>>>> 9e32155415466827315d0c7435c6dfa3a38904b9
├── routes/
=======
├── models/                         # Data models and validation schemas
│   ├── userModel.js
│   ├── productModel.js
│   ├── supplierModel.js
│   ├── categoryModel.js
│   └── profileModel.js
├── routes/                         # API route definitions
>>>>>>> Stashed changes
│   ├── authRoutes.js
│   ├── productsRoutes.js
│   ├── suppliersRoutes.js
│   └── webhookRoutes.js
├── services/                       # Business logic and data access
│   ├── productServices.js
│   └── suppliersServices.js
├── config/                         # Configuration files
│   └── supabaseClient.js
├── package.json                    # Project dependencies and scripts
└── .env                            # Environment variables (not in repo)
```

### Detailed Folder Descriptions

1. **`server.js`**

   - The main entry point of the application.
   - Sets up the Express server, applies middleware, and connects routes.
   - Initializes the database connection (Supabase in this case).

2. **`utils/`**

   - Contains utility functions that are used across the application.
   - Examples: `generateSecureToken.js` for creating secure tokens, `logger.js` for consistent logging.
   - These are general-purpose helpers that don't fit into other categories.

3. **`controllers/`**

   - Houses the logic for handling requests and sending responses.
   - Each file typically corresponds to a specific resource (e.g., `productsController.js`, `suppliersController.js`).
   - Controllers use services to perform business logic and data operations.

4. **`middleware/`**

   - Custom middleware functions that can be applied to routes.
   - Examples: `validateJWT.js` for authentication, `validateRequest.js` for input validation.
   - `errorHandler.js` provides centralized error handling for the application.

5. **`models/`**

   - Defines data structures and validation schemas for the application.
   - Uses Joi for defining schemas (e.g., `productModel.js`, `supplierModel.js`).
   - Each model file exports schemas for both creation and update operations.

6. **`routes/`**

   - Defines the API endpoints and maps them to controller functions.
   - Organizes routes by resource (e.g., `productsRoutes.js`, `suppliersRoutes.js`).
   - Applies relevant middleware (like authentication and validation) to routes.

7. **`services/`**

   - Contains the core business logic of the application.
   - Handles data processing, interactions with the database (Supabase), and any complex operations.
   - Keeps controllers lean by abstracting data manipulation and business rules.

8. **`config/`**
   - Holds configuration files for different parts of the application.
   - `supabaseClient.js` sets up the connection to the Supabase database.

### How It All Fits Together

1. A request comes in and is routed by Express based on the definitions in the `routes/` folder.
2. The appropriate middleware in `middleware/` is applied (e.g., JWT validation, request validation).
3. The route handler in `controllers/` processes the request.
4. If needed, the controller calls functions from `services/` to perform business logic or data operations.
5. Services interact with the database using the Supabase client configured in `config/`.
6. Data is validated against schemas defined in `models/`.
7. The response is sent back to the client.
8. Any errors are caught by the error handling middleware and appropriately responded to.

### Model Validations

We've implemented Joi for robust data validation in our models. Each model (e.g., `productModel.js`, `supplierModel.js`) now includes:

- A main schema for full object validation
- An update schema for partial updates
- Validation functions for both creation and update operations

Example (Product Model):

```javascript
const productSchema = Joi.object({
  name: Joi.string().required().max(255).trim(),
  retail_price_per_unit: Joi.number().min(0).required(),
  selling_price_per_unit: Joi.number().min(0).required(),
  quantity: Joi.number().integer().min(0).required(),
  reorder_point: Joi.number().integer().min(0).required(),
  // ... other fields
});

const productUpdateSchema = productSchema.fork(
  Object.keys(productSchema.describe().keys),
  (schema) => schema.optional()
);
```

### Improved Controllers

Controllers have been updated to provide more informative responses and better error handling:

- Consistent use of JSON responses
- Specific error codes (e.g., 404 for not found)
- More detailed success messages
- Improved error logging

Example:

```javascript
export const addProduct = async (req, res) => {
  try {
    const newProduct = req.body;
    const addedProduct = await addNewProduct(req.supabase, newProduct);
    res
      .status(201)
      .json({ message: "Product added successfully", product: addedProduct });
  } catch (error) {
    console.error("Error in addProduct:", error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the product" });
  }
};
```

### Validation Middleware

A new `validateRequest` middleware has been added to handle request validation using Joi schemas:

```javascript
export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).json({ errors });
    }
    next();
  };
};
```

This middleware is used in routes to validate incoming request bodies before they reach the controller.

## Best Practices Implemented

1. **Separation of Concerns**: Clear separation between models, controllers, services, and routes.
2. **Data Validation**: Robust input validation using Joi schemas.
3. **Error Handling**: Centralized error handling with informative responses.
4. **Code Organization**: Modular structure with clear file naming conventions.
5. **Security**: JWT authentication and role-based access control.
6. **Flexibility**: Support for both full and partial updates in models and controllers.
7. **Consistent API Responses**: Standardized JSON response format across all endpoints.

## Security Improvements

- **Helmet**: Implements various HTTP headers for security.
- **Rate Limiting**: Prevents abuse of the API.
- **Session Management**: Enhanced with secure cookies.
- **Error Handling**: Centralized error handling with detailed logging.

## Database Schema

### Users Table

- `id`: UUID, Primary Key (managed by Supabase auth)
- `email`: Email address
- `created_at`: Account creation date

### Profiles Table

- `id`: UUID, Primary Key (references auth.users.id)
- `user_id`: UUID, Foreign Key to users table
- `full_name`: Full name
- `role`: Role of the user (admin, manager, staff)
- `cell_number`: Cell number
- `created_at`: Profile creation date
- `updated_at`: Profile last updated date

### Products Table

- `id`: BIGINT, Primary Key
- `name`: Name of the product - REQUIRED
- `short_description`: Short description of the product
- `long_description`: Long description of the product
- `sku`: Stock Keeping Unit, unique
- `retail_price_price`: Retail price of the product - REQUIRED
- `selling_price_price`: Selling price of the product - REQUIRED
- `total_quantity`: Total current quantity of the product - REQUIRED
- `quantity_office_1`: Quantity in Office 1 - REQUIRED
- `quantity_office_8`: Quantity in Office 8 - REQUIRED
- `quantity_home`: Quantity at Home - REQUIRED
- `reorder_point`: Minimum threshold quantity - REQUIRED
- `category_id`: BIGINT, Foreign Key to categories table
- `supplier_id`: BIGINT, Foreign Key to suppliers table
- `note`: Additional notes
- `image_url`: URL of the product image
- `measurement_unit`: Unit of measurement
- `status`: Current status of the product (out, low, normal)
- `created_at`: Creation date
- `updated_at`: Last updated date

### Suppliers Table

- `id`: BIGINT, Primary Key
- `name`: Name of the supplier - REQUIRED
- `contact_person`: Contact person's name
- `email`: Email address
- `phone`: Phone number
- `address`: Address of the supplier
- `created_at`: Creation date
- `updated_at`: Last updated date

### Categories Table

- `id`: BIGINT, Primary Key
- `type`: Type of category (retail or service) - REQUIRED
- `name`: Name of the category
- `created_at`: Creation date
- `updated_at`: Last updated date

### Product History Table

- `id`: BIGINT, Primary Key
- `product_id`: BIGINT, Foreign Key to products table
- `action`: Type of action performed - REQUIRED
- `quantity_change`: Change in quantity
- `price_change`: Change in price
- `performed_by`: Foreign Key to Profiles
- `created_at`: Timestamp of the action

### Notifications Table

- `id`: BIGINT, Primary Key
- `user_id`: UUID, Foreign Key to auth.users table
- `product_id`: BIGINT, Foreign Key to products table
- `message`: TEXT, Notification message - REQUIRED
- `is_read`: BOOLEAN, Indicates if the notification has been read
- `created_at`: TIMESTAMPTZ, Timestamp of notification creation

## Authentication

- **JWT-based Authentication**: Provides secure authentication.
- **User Roles**: Roles like admin, manager, and staff are defined for access control.

## Error Handling

- **Centralized Error Handling**: Middleware with detailed logging.
- **Custom Error Types**: Includes scenarios like ValidationError, UnauthorizedError.
- **Environment-based Responses**: Detailed in development, generalized in production.

## Testing

To run tests (if implemented):

```bash
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
