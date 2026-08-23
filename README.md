# Car Dealership Management System

A full-stack Car Dealership Inventory Management System built using FastAPI, React, SQLite, SQLAlchemy, JWT authentication, and Tailwind CSS.

The application supports two types of users:

- Regular users can browse, search, filter, and purchase vehicles.
- Administrators can add, update, delete, and restock vehicles.

The project follows REST API design, JWT-based authentication, role-based authorization, automated backend testing, and Git-based development practices.

## Local Setup and Installation
Follow the steps below to run the Car Dealership Management System locally.

### Prerequisites

Make sure the following are installed on your computer:

- Python 3.x
- Node.js
- npm
- Git

---

### 1. Clone the Repository
Open a terminal and run:

```bash
git clone https://github.com/23wh1a0568/car-dealership
cd car-dealership
```
### 2. Backend Setup
cd backend

python -m venv .venv

.venv\Scripts\activate

pip install -r requirements.txt

Create a .env file inside the backend directory.
Example:
SECRET_KEY=your-secret-key

Start the Backend Server, run:

uvicorn app.main:app --reload

### 3. Create an Admin User

cd backend

Activate the virtual environment:

.venv\Scripts\activate

Run:

python make_admin.py

### 4. Frontend Setup

cd frontend

npm install

npm run dev

### 5. Run the Application

Terminal 1 — Backend

cd car-dealership\backend

.venv\Scripts\activate

uvicorn app.main:app --reload

Terminal 2 — Frontend

cd car-dealership\frontend

npm run dev

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT token |

### Vehicles

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/vehicles` | Admin | Add a vehicle |
| GET | `/api/vehicles` | Authenticated users | View vehicles |
| GET | `/api/vehicles/search` | Authenticated users | Search/filter vehicles |
| PUT | `/api/vehicles/{id}` | Admin | Update vehicle |
| DELETE | `/api/vehicles/{id}` | Admin | Delete vehicle |
| POST | `/api/vehicles/{id}/purchase` | Authenticated users | Purchase vehicle |
| POST | `/api/vehicles/{id}/restock` | Admin | Restock vehicle |



## Testing

The backend uses Pytest for automated testing.

Tests cover:

- User registration
- User login
- JWT authentication
- Protected endpoints
- Role-based authorization
- Vehicle creation
- Vehicle retrieval
- Vehicle search
- Vehicle update
- Vehicle deletion
- Vehicle purchase
- Vehicle restocking

### Running Tests

```bash
cd backend
.venv\Scripts\activate
pytest
```

### Test Report

The complete test suite was executed successfully.
====================== test session starts ======================
platform win32 -- Python 3.14.2, pytest-9.1.1, pluggy-1.6.0
rootdir: C:\Users\yasuj\OneDrive\Desktop\car-dealership\backend
configfile: pytest.ini
testpaths: tests
collected 27 items

tests\test_auth.py .....                                   [ 18%]
tests\test_vehicles.py ......................              [100%]

======================= warnings summary ========================

StarletteDeprecationWarning:
Using httpx with starlette.testclient is deprecated;
install httpx2 instead.

================ 27 passed, 1 warning in 10.19s =================
### Test Result

27 tests passed successfully.


## Screenshots

### Login

![Login](screenshots/login.png)

### Registration

![Registration](screenshots/register.png)

### User Dashboard

![User Dashboard](screenshots/user-dashboard.png)

### Admin Dashboard

![Admin Dashboard](screenshots/admin-dashboard.png)

### Vehicle Search

![Vehicle Search](screenshots/vehicle-search.png)

### Vehicle Purchase

![Vehicle Purchase](screenshots/vehicle-purchase.png)

### Admin Edit

![Admin Edit](screenshots/admin-edit.png)

### Admin Restock

![Admin Restock](screenshots/admin-restock.png)

### Admin Delete

![Admin Delete](screenshots/admin-delete.png)

## My AI Usage

AI tools were used extensively as development assistants throughout this project.

### AI Tools Used

- ChatGPT

### How AI Was Used

I used ChatGPT to:

- Design and implement REST API endpoints.
- Implement JWT-based authentication.
- Implement vehicle search by make, model, and category.
- Implement vehicle purchase and stock management.
- Implement admin functionality for adding, updating, deleting, and restocking vehicles.
- Develop and improve automated backend tests.
- Review the project structure and identify unnecessary or unused files.

AI-generated code and suggestions were used as a starting point where appropriate. The generated solutions were reviewed, integrated into the existing project, modified when necessary, and tested locally.

### Reflection

Using ChatGPT significantly supported my development workflow. It helped me understand unfamiliar concepts, break large requirements into smaller tasks, troubleshoot errors, and explore different implementation approaches.

The AI assistance also helped me work more efficiently when debugging the application and understanding why particular errors occurred.

However, I did not treat AI-generated output as automatically correct. I reviewed the suggestions, adapted them to my project's existing codebase, ran the application and automated tests, and made changes based on the actual results.

This project helped me understand how AI can be used as a development assistant while still requiring the developer to understand, verify, test, and take responsibility for the final implementation.

## Development Workflow

The project was developed using Git for version control.

Development work was divided into incremental changes such as:

- Backend authentication
- Vehicle API development
- Role-based authorization
- Frontend authentication
- User dashboard
- Admin dashboard
- Vehicle search
- Vehicle purchase
- Inventory management
- Automated testing
- Documentation

Changes were tested locally before being committed to the repository.

## Database

SQLite is used as the persistent database for local development.

SQLAlchemy is used as the ORM.

The database stores:

- Users
- Authentication-related user information
- Vehicle inventory

The local SQLite database file is excluded from Git using `.gitignore`.

When another developer clones the repository, they can create their own local database by running the backend application and following the project setup instructions.


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
├── screenshots/
│
├── .gitignore
├── README.md
└── PROMPTS.md

