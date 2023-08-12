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

#### Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Configure the `.env` file with the appropriate environment variables.
4. Run `npm start` to start the server.

### API Endpoints

#### Products

- **GET** `/api/products`: Retrieve all products.
- **Additional routes**: Depending on your implementation in `productsRoute`.

#### Authentication

- **Additional routes**: Authentication-related routes as implemented in `authRoute`.

### Database Schema

#### Product Table

- `product_id`: Unique identifier for the product.
- `name`: Name of the product.
- `description`: Description of the product.
- `quantity`: Available quantity.
- `threshold_quantity`: Minimum threshold quantity.
- `price`: Price of the product.
- `price_per_unit`: Price per unit.

#### User Table

- `user_id`: Unique identifier for the user.
- `username`: Username.
- `email`: Email address.
- `password`: Encrypted password.
- `first_name`: First name.
- `last_name`: Last name.
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

Feel free to modify and expand this documentation according to the specifics of your application and any additional features or details you'd like to include! If you need further assistance or specific details, don't hesitate to ask.
