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
├── server.js
├── utils/
│   ├── index.js
│   ├── generateSecureToken.js
│   └── logger.js
├── controllers/
│   ├── authController.js
│   ├── productsController.js
│   ├── suppliersController.js
│   └── webhookController.js
├── middleware/
│   ├── index.js
│   ├── errorHandler.js
│   ├── validateJWT.js
│   └── checkMoxieToken.js
├── models/
│   ├── userModel.js
│   ├── productModel.js
│   ├── supplierModel.js
│   ├── categoryModel.js
│   └── profileModel.js
├── routes/
│   ├── authRoutes.js
│   ├── productsRoutes.js
│   ├── suppliersRoutes.js
│   └── webhookRoutes.js
├── services/
│   ├── productServices.js
│   └── suppliersServices.js
├── config/
│   └── supabaseClient.js
├── package.json
└── .env
```

### Main Files Explained

- **`server.js`**: Entry point to the Node.js server. Defines middleware, routes, and starts the server.
- **`middleware/index.js`**: Centralized middleware setup including CORS, body parsing, and session management.
- **`middleware/errorHandler.js`**: Centralized error handling middleware.
- **`config/supabaseClient.js`**: Supabase client configuration.

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
- `full_name`: Full name
- `role`: Role of the user (admin, manager, staff)
- `cell_number`: Cell number
- `created_at`: Profile creation date
- `updated_at`: Profile last updated date

### Products Table

- `id`: BIGINT, Primary Key
- `supplier_id`: BIGINT, Foreign Key to suppliers table
- `name`: Name of the product
- `short_description`: Short description of the product
- `long_description`: Long description of the product
- `sku`: Stock Keeping Unit, unique
- `retail_price_p`: Retail price of the product
- `selling_price_`: Selling price of the product
- `quantity`: Current quantity of the product
- `reorder_point`: Minimum threshold quantity
- `category_id`: BIGINT, Foreign Key to categories table
- `note`: Additional notes
- `image_url`: URL of the product image
- `measurement_`: Unit of measurement
- `storage_location`: Storage location
- `created_at`: Creation date
- `updated_at`: Last updated date

### Suppliers Table

- `id`: BIGINT, Primary Key
- `name`: Name of the supplier
- `contact_person`: Contact person's name
- `email`: Email address
- `phone`: Phone number
- `address`: Address of the supplier
- `created_at`: Creation date
- `updated_at`: Last updated date

### Categories Table

- `id`: BIGINT, Primary Key
- `type`: Type of category (retail or service)
- `name`: Name of the category
- `created_at`: Creation date
- `updated_at`: Last updated date

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
