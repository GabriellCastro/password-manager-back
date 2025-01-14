# Password Manager Backend

A secure backend service for the Password Pals Manager application, built with NestJS. This service provides RESTful API endpoints for managing password cards.

## Project Overview

Password Pals Manager Backend is a server-side application that handles the storage and management of password cards. It provides a set of API endpoints for creating, reading, updating, and deleting password cards.

### Features:

- Create Password Card
- Retrieve All Password Cards
- Retrieve Password Card by ID
- Update Password Card
- Delete Password Card

## Architecture and Approach

### Service Structure:

- **PasswordCardService**: Handles the business logic for managing password cards
- **PasswordCardController**: Exposes the API endpoints for password card operations

### Design Decisions:

- Utilizes NestJS for a modular and scalable architecture
- Passwords are hashed using bcrypt for security
- UUIDs are used for unique identification of password cards

### Assumptions and Limitations:

- Data is stored in-memory for demonstration purposes
- No persistent storage (data is lost on server restart)
- Designed for demonstration purposes only

## API Endpoints

### Supported Endpoints:

- **GET** `/password-card`: Retrieve all stored password cards
- **POST** `/password-card`: Add a new password card
- **GET** `/password-card/:id`: Retrieve a password card by ID
- **PUT** `/password-card/:id`: Update an existing password card
- **DELETE** `/password-card/:id`: Delete a password card

## Technologies Used

- **NestJS**: Framework for building efficient and scalable server-side applications
- **TypeScript**: Static typing for better development experience
- **bcrypt**: Library for hashing passwords
- **uuid**: Library for generating unique identifiers
- **Jest**: Testing framework for unit and integration tests
- **Supertest**: Library for testing HTTP endpoints

## Running the Project

1. Clone the repository:

```bash
git clone password-manager-back.git
```

2. Install dependencies:

```bash
yarn
```

3. Start the development server:

```bash
yarn start:dev
```

4. The server will be running at http://localhost:3001

## Running the Project

The project includes unit and integration tests using Jest. Available commands:

- `yarn test`: Run all tests
- `yarn test:watch`: Run tests in watch mode
- `yarn test:cov`: Run tests with coverage report
- `yarn test:e2e`: Run end-to-end tests

## Development

The project uses NestJS CLI for development and building. Available commands:

- `yarn start`: Start the application
- `yarn start:dev`: Start the application in development mode
- `yarn build`: Build the application for production
- `yarn lint`: Lint the codebase

## Example Requests

### Create a Password Card

```bash
curl -X POST http://localhost:3001/password-card \
  -H "Content-Type: application/json" \
  -d '{
    "url": "http://example.com",
    "name": "Example",
    "username": "user",
    "password": "password123",
    "notes": "Some notes"
  }'
```

### Get All Password Cards

```bash
curl -X GET http://localhost:3001/password-card
```

### Get Password Card by ID

```bash
curl -X GET http://localhost:3001/password-card/<id>
```

### Update a Password Card

```bash
curl -X PUT http://localhost:3001/password-card/<id> \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Example",
    "password": "newpassword123"
  }'
```

### Delete a Password Card

```bash
curl -X DELETE http://localhost:3001/password-card/<id>
```

Replace <id> with the actual ID of the password card.
