\# Car Dealership Management System



A full-stack car dealership management application with a FastAPI backend and React frontend.



\## Features



\* User registration and login

\* JWT-based authentication

\* Role-based authorization

\* Admin vehicle management

\* Vehicle inventory management

\* Vehicle search

\* Vehicle purchase

\* Stock management

\* Vehicle restocking

\* Protected frontend routes

\* Automated backend tests



\## Tech Stack



\### Backend



\* Python

\* FastAPI

\* SQLAlchemy

\* SQLite

\* JWT

\* bcrypt

\* Pytest



\### Frontend



\* React

\* Vite

\* JavaScript

\* Tailwind CSS

\* React Router



\## Project Structure



```text

car-dealership/

├── backend/

│   ├── app/

│   │   ├── auth/

│   │   ├── models/

│   │   ├── routes/

│   │   └── schemas/

│   ├── tests/

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

└── README.md

```



\## Running the Backend



Open a terminal and navigate to the backend:



```bash

cd backend

```



Activate the virtual environment:



```bash

.venv\\Scripts\\activate

```



Start the FastAPI server:



```bash

uvicorn app.main:app --reload

```



The backend will run at:



```text

http://127.0.0.1:8000

```



FastAPI API documentation is available at:



```text

http://127.0.0.1:8000/docs

```



\## Running the Frontend



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



\## Running Tests



Navigate to the backend directory:



```bash

cd backend

```



Activate the virtual environment:



```bash

.venv\\Scripts\\activate

```



Run the tests:



```bash

pytest

```



The test suite verifies the functionality of the backend APIs and application logic.



\## Authentication



The application uses JWT-based authentication.



\### User



Regular users can:



\* Register an account

\* Log in

\* View available vehicles

\* Search for vehicles

\* Purchase vehicles

\* View protected resources



\### Admin



Administrators can:



\* Add vehicles

\* Update vehicle details

\* Delete vehicles

\* View vehicle inventory

\* Restock vehicles

\* Manage dealership inventory



Protected routes require authentication, while administrative operations require admin authorization.



\## Database



SQLite is used as the database for local development.



SQLAlchemy is used as the ORM for interacting with the database.



The local database file is excluded from Git using `.gitignore`.



\## API



The backend is built using FastAPI and provides REST API endpoints for:



\* Authentication

\* User management

\* Vehicle management

\* Vehicle inventory

\* Vehicle purchases

\* Vehicle restocking



Interactive API documentation is available through FastAPI Swagger UI:



```text

http://127.0.0.1:8000/docs

```



\## Environment Variables



Sensitive configuration values should be stored in environment variables rather than committed to Git.



Create a `.env` file in the backend directory when required.



Example:



```text

SECRET\_KEY=your-secret-key

```



Do not commit `.env` files or other files containing secrets to the repository.



\## Development



\### Backend



The backend follows a modular structure separating:



\* Authentication

\* Database models

\* API routes

\* Request and response schemas

\* Tests



\### Frontend



The frontend uses React with Vite and React Router.



The application separates pages and API service logic to keep the frontend organized and maintainable.



\## Security



The application includes:



\* Password hashing

\* JWT authentication

\* Protected API endpoints

\* Role-based authorization

\* Environment-based secret configuration



\## Future Improvements



Possible future improvements include:



\* Online payment integration

\* Vehicle image uploads

\* Advanced vehicle filtering

\* Customer order history

\* Admin dashboard

\* Email notifications

\* Deployment to a cloud platform

\* Production database integration

