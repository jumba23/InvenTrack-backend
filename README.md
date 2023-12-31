InvenTrack backend -SERVER

### Overview

This application is a web server for managing and retrieving information about various skincare and beauty products. It utilizes Express.js for server-side operations and interacts with a database via Supabase, a scalable and powerful database client.

### Getting Started

#### Prerequisites

- Node.js (version specified)
- A Supabase account with appropriate API keys

#### Environment Variables

- `SUPABASE_URL`: Your Supabase URL
- `SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `PORT`: The port on which the server will run (default: 5000)
- `MOXIE_WEBHOOK_SECRET_TOKEN`: This token will be passed by 3rd party app on POST request

#### Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Configure the `.env` file with the appropriate environment variables.
4. Run `npm start` to start the server.
   **The backend is running on an Express server, listening on port 5000.**

### API Routes

- `/api/user`: Planned for user authentication; sign-up,login,logout (authRoute).
- `/api/products`: For handling product-related operations (productsRoute).
- `/api/suppliers`: For handling suppliers-related operations (supplierRoute).
- `/api/suppliers`: For handling suppliers-related operations (supplierRoute).
- `/api/webhook`: For handling webhook - for now, only Moxie (webhookRoute).

#### Folder Structure

- root
  |- server.js
  |- utils/
  | |- index.js
  | |- generateSecureToken.js
  |- controllers/
  | |- authController.js
  | |- productsController.js
  | |- suppliersController.js
  | |- webhookController.js
  |- middleware/
  | |- verifyToken.js
  | |- checkMoxieToken.js
  |- routes/
  | |- authRoutes.js
  | |- productsRoutes.js
  | |- suppliersRoutes.js
  | |- webhookRoutes.js
  |- services/
  | |- productServices.js
  | |- suppliersServices.js
  |- package.json
  |- .env

## Main Files Explained

- middleware/: A folder with token validation functions
- server.js: The entry point to your Node.js server. This is where you define your middleware, routes, and start your server.

  - The reason we use bodyParser.json() is to be able to parse JSON bodies in the HTTP requests. This is essential for RESTful API development.
  - req.supabase = supabase; allows your routes to access the Supabase client directly, centralizing your database operations.

## Folders with Files

- routes: Defines your API endpoints and links them to the corresponding controller methods.
  - authRoutes.js: Holds routes related to authentication like sign-up and login.
  - productsRoutes.js: Holds routes related to CRUD operations on products.
  - suppliersRoutes.js: Holds routes related to CRUD operations on suppliers.
  - webhookRoutes.js: holds routes related to CRUD operations on webhooks
- controllers: Contains all the logic for handling routes.
  - authController.js: login, signup, logout
  - productsController.js: CRUD operations on products
  - suppliersController.js: CRUD operations on suppliers
  - webhookController.js : CRUD operations on webhooks
- services: Contains business logic and calls to the database.
  - productsServices.js: handles the logic for products database table actions
  - suppliersServices.js: handles the logic for products database table actions
- utils: A folder for utility functions, like the formatResponse function we have.

#### Authentication

- **Additional routes**: Authentication-related routes as implemented in `authRoute`.

### Database Schema

#### Users Table

- `user_id`: Unique identifier for the user.(PK)
- `username`: Username.
- `email`: Email address.
- `password`: Encrypted password.
- `full_name`: Full name.
- `first_name`: First name.
- `last_name`: Last name.
- `role`: Role of the user.
- `cell_number`: Cell number.
- `created_at`: Account creation date.
- `updated_at`: Account last updated date.

#### Products Table

- `product_id`: Unique identifier for the product.(PK)
- `supplier_id`: Unique identifier for the supplier.(FK)
- `user_id`: Unique identifier for the user.(FK)
- `name`: Name of the product.
- `long_description`: Description of the product.
- `short_description`: Short description of the product.
- `threshold_quantity`: Minimum threshold quantity.`
- `price`: Price of the product.
- `price_per_unit`: Price per unit.
- `quantity`: Quantity of the product.

#### Suppliers Table

- `supplier_id`: Unique identifier for the user.(PK)
- `user_id`: Unique identifier for the user.(FK)
- `email`: Email address.
- `name`: Full name.
- `cell_number`: Cell number.
- `created_at`: Account creation date.
- `updated_at`: Account last updated date.

#### Store Table

- `store_id`: Unique identifier for the user.(PK)
- `user_id`: Unique identifier for the user.(FK)
- `name`: Full name of the store.
- `address`: Address of the store.
- `created_at`: Account creation date.
- `updated_at`: Account last updated date.

### Security

- Current implementation allows public read access to the product information.
- Ensure appropriate access control for other operations, especially if authentication is implemented.

### Error Handling

- General error handling middleware is included to respond with error messages.

### Testing

- **Instructions**: Provide instructions for running any tests that you may have included in your application.

### Contributing

- **Instructions**: If you intend for others to contribute, provide guidelines for how they can do so.

### License

- **Details**: Include licensing information, if applicable.
