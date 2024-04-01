# User Authentication Backend API Documentation

## Overview

This backend application serves as the server-side component for a user authentication system. It provides endpoints for user registration, login, logout, password change, and retrieval of current user information.

## Technologies Used

- Node.js: The runtime environment for running JavaScript code.
- Express.js: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- MongoDB: A NoSQL database used for storing user data.
- Mongoose: A MongoDB object modeling tool designed to work in an asynchronous environment.
- JSON Web Tokens (JWT): Tokens used for authentication and authorization.
- bcrypt: A library for hashing passwords.

## Installation and Setup

1. Clone the repository from GitHub.
2. Navigate to the project directory.
3. Navigate to the project directory:

```bash
npm install
```

or

```bash
npm install
```

4. Create a `.env` file in the root directory and add necessary environment variables:

```bash
PORT=4000
MONGODB_URI=mongodb://localhost:27017/my_database
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=3600
```

5. Start the server:

```bash
npm start
```

or

```bash
yarn start
```

## Endpoints

### 1. User Registration

- URL: /api/v1/users/register
- Method: POST
- Request Body:
  - email: User's email address (string)
  - username: User's username (string)
  - password: User's password (string)
- Response:
  - Status Code: 201
  - Body:
    - user: User object (object)

### 2. User Login

- URL: /api/v1/users/login
- Method: POST
- Request Body:
  - username or email: User's username or email address (string)
  - password: User's password (string)
- Response:
- Status Code: 200
  - Body:
    - user: User object (object)
    - accessToken: JWT access token (string)

### 3. User Logout

- URL: /api/v1/users/logout
- Method: POST
- Request Header:
  - Authorization: Bearer token (string)
- Response:
  - Status Code: 200
  - Body: {}

### 4. Change Password

- URL: /api/v1/users/change-password
- Method: POST
- Request Body:
  - oldPassword: User's old password (string)
  - newPassword: User's new password (string)
- Request Header:
  - Authorization: Bearer token (string)
- Response:
  - Status Code: 200
  - Body: {}

### 5. Get Current User

- URL: /api/v1/users/current-user
- Method: GET
- Request Header:
  - Authorization: Bearer token (string)
- Response:
  - Status Code: 200
  - Body: User object

## Error Handling

Errors are handled centrally using a custom error handling middleware. Errors are returned with appropriate status codes and error messages.

## Validation

Request data is validated using express-validator middleware. Errors are returned with appropriate status codes and error messages.

<hr>

This documentation provides a brief overview of the backend application, including installation instructions, endpoints, error handling, and validation. For more detailed information, refer to the source code and documentation comments.
