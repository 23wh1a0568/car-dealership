import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.database import Base, get_db
from app.main import app


TEST_DATABASE_URL = "sqlite://"


engine = create_engine(
    TEST_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool
)

TestingSessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)


Base.metadata.create_all(bind=engine)


def override_get_db():
    db = TestingSessionLocal()

    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)


@pytest.fixture(autouse=True)
def reset_database():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)


def test_register_user():
    response = client.post(
        "/api/auth/register",
        json={
            "username": "testuser",
            "email": "test@example.com",
            "password": "password123"
        }
    )

    assert response.status_code == 201

    data = response.json()

    assert data["username"] == "testuser"
    assert data["email"] == "test@example.com"


def test_register_user_with_duplicate_email():
    client.post(
        "/api/auth/register",
        json={
            "username": "firstuser",
            "email": "duplicate@example.com",
            "password": "password123"
        }
    )

    response = client.post(
        "/api/auth/register",
        json={
            "username": "seconduser",
            "email": "duplicate@example.com",
            "password": "password456"
        }
    )

    assert response.status_code == 400
    assert response.json()["detail"] == "Email already registered"

def test_login_user():
    client.post(
        "/api/auth/register",
        json={
            "username": "loginuser",
            "email": "login@example.com",
            "password": "password123"
        }
    )

    response = client.post(
        "/api/auth/login",
        json={
            "email": "login@example.com",
            "password": "password123"
        }
    )

    assert response.status_code == 200

    data = response.json()

    assert "access_token" in data
    assert data["token_type"] == "bearer"