# Car Dealership Management System

A full-stack car dealership management application with a FastAPI backend and React frontend.

## Features

* User registration and login
* JWT-based authentication
* Role-based authorization
* Admin vehicle management
* Vehicle inventory management
* Vehicle search by make
* Vehicle search by model
* Vehicle filtering by category
* Vehicle purchase
* Stock management
* Vehicle restocking
* Protected frontend routes
* Admin dashboard
* User dashboard
* Automatic role-based login redirection
* Automated backend tests

## Tech Stack

### Backend

* Python
* FastAPI
* SQLAlchemy
* SQLite
* JWT
* bcrypt
* Pytest

### Frontend

* React
* Vite
* JavaScript
* Tailwind CSS
* React Router

## Project Structure

```text
car-dealership/
│
├── backend/
│   ├── app/
│   │   ├── auth/
│   │   ├── models/
│   │   ├── routes/
│   │   └── schemas/
│   ├── tests/
│   ├── make_admin.py
│   ├── requirements.txt
│   └── pytest.ini
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── services/
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

## Running the Backend

Open a terminal and navigate to the backend:

```bash
cd backend
```

Activate the virtual environment:

```bash
.venv\Scripts\activate
```

Start the FastAPI server:

```bash
uvicorn app.main:app --reload
```

The backend will run at:

```text
http://127.0.0.1:8000
```

### API Documentation

Interactive FastAPI Swagger documentation is available at:

```text
http://127.0.0.1:8000/docs
```

## Running the Frontend

Open another terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will run at:

```text
http://localhost:5173
```

## Running Tests

Navigate to the backend directory:

```bash
cd backend
```

Activate the virtual environment:

```bash
.venv\Scripts\activate
```

Run the tests:

```bash
pytest
```

The test suite verifies the functionality of the backend APIs and application logic.

## Authentication

The application uses JWT-based authentication and role-based authorization.

### Regular User

Regular users can:

* Register an account
* Log in
* View available vehicles
* Search vehicles by make
* Search vehicles by model
* Filter vehicles by category
* Purchase vehicles
* Access protected resources
* Log out

After successful login, regular users are automatically redirected to:

```text
http://localhost:5173/dashboard
```

### Admin

Administrators can:

* Log in
* Add vehicles
* Update vehicle details
* Delete vehicles
* View vehicle inventory
* Restock vehicles
* Manage dealership inventory
* Log out

After successful login, administrators are automatically redirected to:

```text
http://localhost:5173/admin
```

Protected routes require authentication, while administrative operations require admin authorization.

## Creating an Admin User

Newly registered users are created with the `user` role by default.

To promote an existing user to an administrator, use the `make_admin.py` script.

The script is located inside the `backend` directory:

```text
backend/make_admin.py
```

### Run the Make Admin Script

Open a terminal and navigate to the backend:

```bash
cd backend
```

Activate the virtual environment:

```bash
.venv\Scripts\activate
```

Run:

```bash
python make_admin.py
```

The script will update the selected user's role from:

```text
user
```

to:

```text
admin
```

After running the script, log in using that user's email and password.

The application will recognize the account as an administrator and redirect the user to:

```text
http://localhost:5173/admin
```

### Important

The admin role is stored in the SQLite database.

New registrations continue to receive the regular `user` role. The `make_admin.py` script is used to promote an existing account to `admin`.

## Vehicle Search

Users can search and filter the vehicle inventory using:

* Make
* Model
* Category

Multiple filters can be combined to narrow down search results.

For example:

```text
Make: Toyota
Model: RAV4
Category: SUV
```

The backend processes these filters through the vehicle search API.

## Vehicle Management

The admin dashboard provides vehicle inventory management functionality.

Administrators can:

* Add new vehicles
* Update vehicle information
* Delete vehicles
* View available stock
* Restock vehicles

## Database

SQLite is used as the database for local development.

SQLAlchemy is used as the ORM for interacting with the database.

The local database file is excluded from Git using `.gitignore`.

## API

The backend provides REST API endpoints for:

* User registration
* User login
* User authentication
* Vehicle management
* Vehicle search
* Vehicle inventory
* Vehicle purchases
* Vehicle restocking

Interactive API documentation is available through FastAPI Swagger UI:

```text
http://127.0.0.1:8000/docs
```

## Environment Variables

Sensitive configuration values should be stored in environment variables rather than committed to Git.

Create a `.env` file inside the `backend` directory when required.

Example:

```text
SECRET_KEY=your-secret-key
```

Do not commit `.env` files or other files containing secrets to the repository.

## Development

### Backend

The backend follows a modular structure separating:

* Authentication
* Database configuration
* Database models
* API routes
* Request and response schemas
* Automated tests

### Frontend

The frontend uses React with Vite and React Router.

The application separates:

* Pages
* API services
* Application routing
* Styling

This keeps the frontend organized and maintainable.

## Security

The application includes:

* Password hashing
* JWT authentication
* Protected API endpoints
* Role-based authorization
* Environment-based secret configuration
* Protected frontend routes

## Future Improvements

Possible future improvements include:

* Online payment integration
* Customer order history
* Vehicle recommendations
* Cloud deployment
* Production database integration
